import torch
import numpy as np
import cv2
import os
import math
import rclpy
import time
import base64

from sub2.ex_calib import *
from rclpy.node import Node

from sensor_msgs.msg import CompressedImage, LaserScan, Imu
from geometry_msgs.msg import Twist
from ssafy_msgs.msg import TurtlebotStatus
# from std_msgs.msg import Int16,Int8

from squaternion import Quaternion

import socketio
sio = socketio.Client()

@sio.event
def connect():
    print('connection established')

@sio.event
def disconnect():
    print('disconnected from server')

params_lidar = {
    "Range" : 90, #min & max range of lidar azimuths
    "CHANNEL" : int(1), #verticla channel of a lidar
    "localIP": "127.0.0.1",
    "localPort": 9094,
    "Block_SIZE": int(1206),
    "X": 0, # meter
    "Y": 0,
    "Z": 0.19,
    "YAW": 0, # deg
    "PITCH": 0,
    "ROLL": 0
}

params_cam = {
    "WIDTH": 640, # image width
    "HEIGHT": 480, # image height
    "FOV": 60, # Field of view
    "localIP": "127.0.0.1",
    "localPort": 1232,
    "Block_SIZE": int(65000),
    "X": 0, # meter
    "Y": 0,
    "Z": 0.15,
    "YAW": 0, # deg
    "PITCH": 0.0,
    "ROLL": 0
}

params_bot = {
    "X": 0.0, # meter
    "Y": 0.0,
    "Z":  0.0,
    "YAW": 0.0, # deg
    "PITCH": 0.0,
    "ROLL": 0.0
}

class detection_net_class():
    def __init__(self):
        # yolo v5
        full_path = os.path.abspath(__file__)
        full_path = full_path.replace('install\\sub3\\Lib\\site-packages\\sub3\\yolov5_distance.py', 
                                        'ros2_smart_home\\sub3\\sub3\\model_weights\\gaggum_weight.pt')
        remote_yolov5_path = "ultralytics/yolov5"
        self.model = torch.hub.load(remote_yolov5_path, 'custom', path=full_path)

    def inference(self, image_np):
        results = self.model(image_np)

        info = results.pandas().xyxy[0]
        print(f"info : {info}")

        idx_detect = info.index.to_numpy()
        # print(f"idx_detect : {idx_detect}")

        boxes_detect = info[['xmin', 'ymin', 'xmax', 'ymax']].to_numpy()
        # print(f"boxes_detect : {boxes_detect}")

        classes_pick = info[['class']].T.to_numpy()
        # print(f"classes_pick : {classes_pick}")

        return np.squeeze(results.render()), boxes_detect, classes_pick

def visualize_images(image_out):

    winname = 'Vehicle Detection'
    cv2.imshow(winname, image_out)
    cv2.waitKey(1)

def img_callback(msg):

    global img_bgr
    global origin_img
    global is_img_bgr

    origin_img = msg.data
    is_img_bgr = True
    np_arr = np.frombuffer(msg.data, np.uint8)
    img_bgr = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

def scan_callback(msg):
    global xyz
    global is_scan
    is_scan = True
    R = np.array(msg.ranges)

    x = R*np.cos(np.linspace(0, 2*np.pi, 360))
    y = R*np.sin(np.linspace(0, 2*np.pi, 360))
    z = np.zeros_like(x)

    xyz = np.concatenate([
        x.reshape([-1, 1]),
        y.reshape([-1, 1]),
        z.reshape([-1, 1])
    ], axis=1)
    is_scan = True

def imu_callback(msg):
    global is_imu
    is_imu =True
    '''
    로직 3. IMU 에서 받은 quaternion을 euler angle로 변환해서 사용(라디안 단위)
    각도(도) = 라디안 * 180/π
    '''
    global robot_yaw
    imu_q= Quaternion(msg.orientation.w,msg.orientation.x,msg.orientation.y,msg.orientation.z)
    _,_,robot_yaw = imu_q.to_euler()

def status_callback(msg):
    global turtlebot_status_msg
    global loc_x,loc_y,loc_z
    global is_status
    is_status = True
    loc_x = msg.twist.angular.x
    loc_y = msg.twist.angular.y
    loc_z = 0.0

    turtlebot_status_msg = msg

# lidar 좌표계를 bot에서의 좌표계로 변환하는 matrix
def transformMTX_lidar2bot(params_lidar, params_bot):
    global loc_x
    global loc_y
    global loc_z

    lidar_yaw, lidar_pitch, lidar_roll = np.deg2rad(params_lidar["YAW"]), np.deg2rad(params_lidar["PITCH"]), np.deg2rad(params_lidar["ROLL"])
    bot_yaw, bot_pitch, bot_roll = np.deg2rad(params_bot["YAW"]), np.deg2rad(params_bot["PITCH"]), np.deg2rad(params_bot["ROLL"])
    
    lidar_pos = [params_lidar["X"], params_lidar["Y"], params_lidar["Z"]]
    bot_pos = [params_bot["X"], params_bot["Y"], params_bot["Z"]]
 
    Tmtx = translationMtx(lidar_pos[0] - bot_pos[0], lidar_pos[1] - bot_pos[1], lidar_pos[2] - bot_pos[2])
    Rmtx = rotationMtx(0, 0, 0)

    RT = np.matmul(Rmtx, Tmtx)

    return RT

# bot 좌표계를 global(map)에서의 좌표계로 변환하는 matrix
def transformMTX_bot2map():
    global robot_yaw
    global loc_x
    global loc_y
    global loc_z

    bot_yaw, bot_pitch, bot_roll = np.deg2rad(robot_yaw), np.deg2rad(0.0), np.deg2rad(0.0)
    map_yaw, map_pitch, map_roll = np.deg2rad(0.0), np.deg2rad(0.0), np.deg2rad(0.0)
    
    bot_pos = [loc_x, loc_y, loc_z]
    map_pos = [0.0, 0.0, 0.0]

    Tmtx = translationMtx(bot_pos[0] - map_pos[0], bot_pos[1] - map_pos[1], bot_pos[2] - map_pos[2])
    Rmtx = rotationMtx(bot_yaw, bot_pitch, bot_roll)

    RT = np.matmul(Rmtx, Tmtx)

    return RT

# lidar 좌표계를 bot에서의 좌표계로 변환함수
def transform_lidar2bot(xyz_p):
    """
    로직. RT_Lidar2Bot로 라이다 포인트들을 터틀봇 좌표계로 변환시킨다.
    """
    global RT_Lidar2Bot

    xyz_p = np.matmul(xyz_p, RT_Lidar2Bot.T)
    
    return xyz_p

# bot 좌표계를 map(global)에서의 좌표계로 변환함수
def transform_bot2map(xyz_p):
    """
    로직. RT_Bot2Map로 터틀봇에서의 좌표들을 글로벌 좌표계로 변환시킨다.
    """
    global RT_Bot2Map

    xyz_p = np.matmul(xyz_p, RT_Bot2Map.T)
    
    return xyz_p

def main(args=None):
    
    yolov5 = detection_net_class()

    global g_node
    global turtlebot_status_msg
    global origin_img
    global is_img_bgr
    global is_scan
    global is_imu
    global is_status

    is_img_bgr = False
    is_scan = False
    is_imu = False
    is_status = False

    # 터틀봇의 위치
    global loc_x
    global loc_y
    global loc_z

    rclpy.init(args=args)

    g_node = rclpy.create_node('tf_detector')

    # 로봇 절대위치 좌표
    subscription_turtle = g_node.create_subscription(TurtlebotStatus, '/turtlebot_status',status_callback, 10)

    subscription_img = g_node.create_subscription(CompressedImage, '/image_jpeg/compressed', img_callback, 3)

    subscription_scan = g_node.create_subscription(LaserScan, '/scan', scan_callback, 3)

    subscription_imu = g_node.create_subscription(Imu,'/imu',imu_callback,10)
    
    oflag = [False] * 5
    olist = ['plant1', 'plant2', 'plant3', 'plant4', 'plant5']

    turtlebot_status_msg = TurtlebotStatus()
    
    # 로직 8. lidar2img 좌표 변환 클래스 정의
    # sub2의 좌표 변환 클래스를 가져와서 정의.
    l2c_trans = LIDAR2CAMTransform(params_cam, params_lidar)

    iter_step = 0

    global RT_Lidar2Bot
    global RT_Bot2Map

    while rclpy.ok():

        time.sleep(0.05)
        
        # 로직 9. ros 통신을 통한 이미지 수신
        for _ in range(2):

            rclpy.spin_once(g_node)

        if is_img_bgr and is_scan:
            # 로직 10. object detection model inference
            image_process, boxes_detect, classes_pick = yolov5.inference(img_bgr)

            loc_z = 0
            loc_z = 0.0

            # 로직 11. 라이다-카메라 좌표 변환 및 정사영
            # sub2 에서 ex_calib 에 했던 대로 라이다 포인트들을
            # 이미지 프레임 안에 정사영시킵니다.
            xyz_p = xyz[np.where(xyz[:, 0]>=0)]

            xyz_c = l2c_trans.transform_lidar2cam(xyz_p)

            xy_i = l2c_trans.project_pts2img(xyz_c, False)

            xyii = np.concatenate([xy_i, xyz_p], axis=1)
            # print(f"xyii : {xyii}")

            RT_Lidar2Bot = transformMTX_lidar2bot(params_lidar, params_bot)
            RT_Bot2Map = transformMTX_bot2map()

            # 로직 12. bounding box 결과 좌표 뽑기
            ## boxes_detect 안에 들어가 있는 bounding box 결과들을
            ## 좌상단 x,y와 너비 높이인 w,h 구하고, 
            ## 본래 이미지 비율에 맞춰서 integer로 만들어
            ## numpy array로 변환

            if len(boxes_detect) != 0:

                ih = img_bgr.shape[0]
                iw = img_bgr.shape[1]

                boxes_np = np.array(boxes_detect[0])

                x = boxes_np.T[0]
                y = boxes_np.T[1]
                w = (boxes_np.T[2] - boxes_np.T[0])
                h = (boxes_np.T[3] - boxes_np.T[1])

                bbox = np.vstack([
                    x.astype(np.int32).tolist(),
                    y.astype(np.int32).tolist(),
                    w.astype(np.int32).tolist(),
                    h.astype(np.int32).tolist()
                ]).T

                print(f"bbox : {bbox}")

                # 로직 13. 인식된 물체의 위치 추정
                ## bbox가 구해졌으면, bbox 안에 들어가는 라이다 포인트 들을 구하고
                ## 그걸로 물체의 거리를 추정할 수 있습니다.
                
                ostate_list = []

                for i in range(bbox.shape[0]):
                    x = int(bbox[i, 0])
                    y = int(bbox[i, 1])
                    w = int(bbox[i, 2])
                    h = int(bbox[i, 3])

                    cx = int(x + (w / 2))
                    cy = int(y + (h / 2))
                    
                    # xyv = xyii[np.logical_and(xyii[:, 0]>=cx-0.4*w, xyii[:, 0]<cx+0.4*w), :]
                    # xyv = xyv[np.logical_and(xyv[:, 1]>=cy-0.4*h, xyv[:, 1]<cy+0.4*h), :]

                    # xyv = xyii[np.logical_and(xyii[:, 0]>=x, xyii[:, 0]<=x+w), :]
                    # xyv = xyv[np.logical_and(xyv[:, 1]>=y, xyv[:, 1]<=y+h), :]

                    xyv = xyii[np.logical_and(xyii[:, 0]>=cx-(w/2 * 0.7), xyii[:, 0]<=cx+(w/2 * 0.7)), :]
                    xyv = xyv[np.logical_and(xyv[:, 1]>=y, xyv[:, 1]<=y+h), :]
                    
                    # print(f"xyv : {xyv}")
                    ## bbox 안에 들어가는 라이다 포인트들의 대표값(예:평균)을 뽑는다
                    # ostate = np.median(xyv[:, 2:], axis=0)
                    ostate = np.median(xyv, axis=0)
                    print(f"ostate : {ostate}")

                    relative_x = ostate[2]
                    relative_y = ostate[3]
                    relative_z = ostate[4]

                    relative = np.array([relative_x, relative_y, relative_z, 1])
                    object_global_pose = transform_bot2map(transform_lidar2bot(relative))
                    print(f"객체 위치 좌표 : {object_global_pose}")
                    print(f"로봇 위치 좌표 : {loc_x, loc_y}")
                    if relative_x < 0.2:
                        b64data = base64.b64encode(origin_img)
                        # print(f"base64_decode : {b64data.decode('utf-8')}")
                    data = {
                        "plant_detected_name" : "plant2",
                        "plant_img": b64data.decode('utf-8'),
                        "plant_position_x": loc_x,
                        "plant_position_y": loc_y
                    }
                    try:
                        print("데이터 보냄")
                        # print("decode: ", b64data.decode('utf-8'))
                        # sio.emit("streaming", data)
                    except:
                        print("오류")

                    ## 대표값이 존재하면 
                    if not np.isnan(ostate[0]):
                        ostate_list.append(ostate)

                image_process = draw_pts_img(image_process, xy_i[:, 0].astype(np.int32),
                                            xy_i[:, 1].astype(np.int32))

                print(ostate_list)
            visualize_images(image_process)

    g_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':

    main()