import numpy as np
import cv2
import os
import math
import rclpy
import time

from rclpy.node import Node
from sensor_msgs.msg import CompressedImage, LaserScan
from sub2.ex_calib import *

import torch

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

def main(args=None):

    # 로직 6. object detection 클래스 생성
    yolov5 = detection_net_class()

    # 로직 7. node 및 image/scan subscriber 생성
    # 이번 sub3의 스켈레톤 코드는 rclpy.Node 클래스를 쓰지 않고,
    # rclpy.create_node()로 node를 생성한 것이 큰 특징입니다. 
    # Tensorflow object detection model 이 종종 rclpy.Node 내의 timer callback 안에서 
    # 잘 돌지 않는 경우가 있어서, timer 대신 외부 반복문에 Tensorflow object detection model의 
    # inference를 하기 위함입니다    

    global g_node
    global origin_img
    global is_img_bgr
    global is_scan

    rclpy.init(args=args)

    g_node = rclpy.create_node('tf_detector')

    subscription_img = g_node.create_subscription(CompressedImage, '/image_jpeg/compressed', img_callback, 3)

    subscription_scan = g_node.create_subscription(LaserScan, '/scan', scan_callback, 3)

    oflag = [False] * 5
    olist = ['plant1', 'plant2', 'plant3', 'plant4', 'plant5']
    
    # 로직 8. lidar2img 좌표 변환 클래스 정의
    # sub2의 좌표 변환 클래스를 가져와서 정의.

    l2c_trans = LIDAR2CAMTransform(params_cam, params_lidar)

    iter_step = 0

    while rclpy.ok():

        time.sleep(0.05)
        
        # 로직 9. ros 통신을 통한 이미지 수신
        for _ in range(2):

            rclpy.spin_once(g_node)

        if is_img_bgr and is_scan:
            # 로직 10. object detection model inference
            image_process, boxes_detect, classes_pick = yolov5.inference(img_bgr)

            # 로직 11. 라이다-카메라 좌표 변환 및 정사영
            # sub2 에서 ex_calib 에 했던 대로 라이다 포인트들을
            # 이미지 프레임 안에 정사영시킵니다.

            xyz_p = xyz[np.where(xyz[:, 0]>=0)]

            xyz_c = l2c_trans.transform_lidar2cam(xyz_p)

            xy_i = l2c_trans.project_pts2img(xyz_c, False)

            xyii = np.concatenate([xy_i, xyz_p], axis=1)
            print(f"xyii : {xyii}")

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

                    cx = x + int(w/2)
                    cy = y - int(h/2)
                    
                    xyv = xyii[np.logical_and(xyii[:, 0]>=cx-0.4*w, xyii[:, 0]<cx+0.4*w), :]
                    xyv = xyv[np.logical_and(xyv[:, 1]>=cy-0.4*h, xyv[:, 1]<cy+0.4*h), :]
                    print(f"xyv : {xyv}")
                    ## bbox 안에 들어가는 라이다 포인트들의 대표값(예:평균)을 뽑는다
                    ostate = np.median(xyv[:, 2:], axis=0)
                    print(f"ostate : {ostate}")

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