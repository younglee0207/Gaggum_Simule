import numpy as np
import cv2
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import CompressedImage, LaserScan

import torch


class IMGParser(Node):

    def __init__(self):
        super().__init__(node_name='pytorch_detector')
        self.subscription_img = self.create_subscription(CompressedImage, '/image_jpeg/compressed', self.img_callback, 10)
        # self.subscription_scan = self.create_subscription(LaserScan, '/scan', self.scan_callback, 3)

        # yolo v5
        remote_yolov5_path = "ultralytics/yolov5"
        local_weight_path = "C:\\Users\\SSAFY\\Desktop\\ros2_sangwon\\sub3\\sub3\\model_weights\\gaggum_weight.pt"
        self.model = torch.hub.load(remote_yolov5_path, 'custom', path=local_weight_path)
        self.img_bgr = None
        self.timer_period = 0.05
        self.timer = self.create_timer(self.timer_period, self.timer_callback)

    def img_callback(self, msg):
        np_arr = np.frombuffer(msg.data, np.uint8)
        self.img_bgr = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    def yolov5_detect(self, img_bgr):
        # inference
        results = self.model(img_bgr)
        cv2.imshow("yolo detection", np.squeeze(results.render()))
        cv2.waitKey(1)

    def timer_callback(self):
        if self.img_bgr is not None:
            self.yolov5_detect(self.img_bgr)
        else:
            pass

def main(args=None):

    rclpy.init(args=args)

    image_parser = IMGParser()

    rclpy.spin(image_parser)

if __name__ == '__main__':

    main()