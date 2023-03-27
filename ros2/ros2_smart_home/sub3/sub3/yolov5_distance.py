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
    "Z": 0.4 + 0.19,
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
    "X": 0.07, # meter
    "Y": 0,
    "Z":  0.8 + 0.15,
    "YAW": 0, # deg
    "PITCH": 0.0,
    "ROLL": 0
}

class detection_net_class():
    def __init__(self):
        print()

    def inference(self, model, image_np):
        results = model(image_np)

        info = results.pandas().xyxy[0]

        idx_detect = np.arange(info.shape[0]).reshape(info.shape)[np.where(info['confidence'] > 0.5)]

        boxes_detect = info.iloc[idx_detect, :4].values

        classes_pick = info.iloc[idx_detect, 5].values
        

        return image_np, boxes_detect, classes_pick

def visualize_images(image_out):

    winname = 'Vehicle Detection'
    cv2.imshow(winname, cv2.resize(image_out, (2*image_out.shape[1], 2*image_out.shape[0])))
    cv2.waitKey(1)

def img_callback(msg):

    global img_bgr

    np_arr = np.frombuffer(msg.data, np.uint8)
    img_bgr = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

def scan_callback(msg):
    global xyz
    # 로직 4. 라이다 2d scan data(거리와 각도)를 가지고 x,y 좌표계로 변환
    R = msg.ranges
    x = np.array([R[theta] * math.cos(math.radians(theta))  for theta in range(360)])
    y = np.array([R[theta] * math.sin(math.radians(theta))  for theta in range(360)])
    z = np.array([0.4] * 360)
    
    xyz = np.concatenate([
        x.reshape([-1, 1]),
        y.reshape([-1, 1]),
        z.reshape([-1, 1])
    ], axis=1)

def main(args=None):

    # yolo v5
    full_path = os.path.abspath(__file__)
    full_path = full_path.replace('install\\sub3\\Lib\\site-packages\\sub3\\yolov5_distance.py', 
                                    'ros2_smart_home\\sub3\\sub3\\model_weights\\gaggum_weight.pt')
    remote_yolov5_path = "ultralytics/yolov5"
    model = torch.hub.load(remote_yolov5_path, 'custom', path=full_path)

    # 로직 6. object detection 클래스 생성
    # detector model parameter를 load 하고 이를 세션으로 실행시켜 inference 하는 클래스를 생성합니다
    yolov5 = detection_net_class()

    # 로직 7. node 및 image/scan subscriber 생성
    # 이번 sub3의 스켈레톤 코드는 rclpy.Node 클래스를 쓰지 않고,
    # rclpy.create_node()로 node를 생성한 것이 큰 특징입니다. 
    # Tensorflow object detection model 이 종종 rclpy.Node 내의 timer callback 안에서 
    # 잘 돌지 않는 경우가 있어서, timer 대신 외부 반복문에 Tensorflow object detection model의 
    # inference를 하기 위함입니다    

    global g_node

    rclpy.init(args=args)

    g_node = rclpy.create_node('tf_detector')

    subscription_img = g_node.create_subscription(CompressedImage, '/image_jpeg/compressed', img_callback, 3)

    subscription_scan = g_node.create_subscription(LaserScan, '/scan', scan_callback, 3)

    # subscription_scan

    # subscription_img
    
    # 로직 8. lidar2img 좌표 변환 클래스 정의
    # sub2의 좌표 변환 클래스를 가져와서 정의.

    l2c_trans = LIDAR2CAMTransform(params_cam, params_lidar)

    iter_step = 0

    while rclpy.ok():

        time.sleep(0.05)
        
        # 로직 9. ros 통신을 통한 이미지 수신
        for _ in range(2):

            rclpy.spin_once(g_node)

        # 로직 10. object detection model inference
        image_process, boxes_detect, classes_pick = yolov5.inference(model, img_bgr)

        # 로직 11. 라이다-카메라 좌표 변환 및 정사영
        # sub2 에서 ex_calib 에 했던 대로 라이다 포인트들을
        # 이미지 프레임 안에 정사영시킵니다.

        xyz_p = xyz[np.where(xyz[:, 0]>=0)]

        xyz_c = l2c_trans.transform_lidar2cam(xyz_p)

        xy_i = l2c_trans.project_pts2img(xyz_c, False)

        xyii = np.concatenate([xy_i, xyz_p], axis=1)


        # 로직 12. bounding box 결과 좌표 뽑기
        ## boxes_detect 안에 들어가 있는 bounding box 결과들을
        ## 좌상단 x,y와 너비 높이인 w,h 구하고, 
        ## 본래 이미지 비율에 맞춰서 integer로 만들어
        ## numpy array로 변환

        if len(boxes_detect) != 0:

            ih = img_bgr.shape[0]
            iw = img_bgr.shape[1]

            boxes_np = np.array(boxes_detect[0])

            x = boxes_np.T[1] * iw
            y = boxes_np.T[0] * ih
            w = (boxes_np.T[3] - boxes_np.T[1]) * iw
            h = (boxes_np.T[2] - boxes_np.T[0]) * ih

            bbox = np.vstack([
                x.astype(np.int32).tolist(),
                y.astype(np.int32).tolist(),
                w.astype(np.int32).tolist(),
                h.astype(np.int32).tolist()
            ]).T

            # 로직 13. 인식된 물체의 위치 추정
            ## bbox가 구해졌으면, bbox 안에 들어가는 라이다 포인트 들을 구하고
            ## 그걸로 물체의 거리를 추정할 수 있습니다.
            
            ostate_list = []

            for i in range(bbox.shape[0]):
                x = int(bbox[i, 0])
                y = int(bbox[i, 1])
                w = int(bbox[i, 2])
                h = int(bbox[i, 3])

                cx = int((x + w) / 2)
                cy = int((y + h) / 2)
                
                xyv = xyii[np.logical_and(xyii[:, 0]>=x, xyii[:, 0]<=x+w), :]
                xyv = xyv[np.logical_and(xyv[:, 1]>=y, xyv[:, 1]<=y+h), :]

                ## bbox 안에 들어가는 라이다 포인트들의 대표값(예:평균)을 뽑는다
                ostate = np.median(xyv, axis=0)

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