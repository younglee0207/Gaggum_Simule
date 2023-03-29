import numpy as np
import rclpy
import socketio
import cv2
import base64

from rclpy.node import Node
from geometry_msgs.msg import Twist,Point
from squaternion import Quaternion
from nav_msgs.msg import Odometry,Path
from std_msgs.msg import Int8MultiArray, Bool
from math import pi,cos,sin,sqrt,atan2


sio = socketio.Client()
global m_control_cmd
m_control_cmd = 0

@sio.event
def connect():
    print('connection established move_client')

@sio.event
def disconnect():
    print('disconnected from server')
    

@sio.on('go_straight')
def go_straight(move):    
    global m_control_cmd
    m_control_cmd = move['data']
    print('go_straight')

@sio.on('go_back')
def back(move):
    print(move['data'])
    global m_control_cmd
    m_control_cmd = move['data']
    print('go_back')

@sio.on('go_left')
def turn_right(move):
    global m_control_cmd
    m_control_cmd = move['data']
    print('go_left')

@sio.on('go_right')
def turn_right(move):
    global m_control_cmd
    m_control_cmd = move['data']
    print('go_right')

def get_global_var():
    return m_control_cmd

def reset_global_var():
    global m_control_cmd
    m_control_cmd = 0

class MoveTurtleBot(Node):

    def __init__(self):
        super().__init__('map_client')
        # self.map_publisher = self.create_publisher(Int8MultiArray, 'map_status', 10)
        # self.automap_publisher = self.create_publisher(Int8MultiArray,'map_auto',10)
        # self.subscription = self.create_subscription(Odometry,'/odom',self.odom_callback,10)
        self.cmd_publisher = self.create_publisher(Twist, 'cmd_vel', 10)
        self.cmd_msg=Twist()

        self.timer_period = 0.05
        self.timer = self.create_timer(self.timer_period, self.timer_callback)

        self.m_control_interval = 10
        self.m_control_iter = 0

        sio.connect('http://localhost:3001')


    def odom_callback(self, msg):
        self.is_odom=True
        self.odom_msg=msg
        q=Quaternion(msg.pose.pose.orientation.w,msg.pose.pose.orientation.x,msg.pose.pose.orientation.y,msg.pose.pose.orientation.z)
        _,_,self.robot_yaw=q.to_euler()
    
    def turtlebot_go(self) :
        self.cmd_msg.linear.x=0.2
        self.cmd_msg.angular.z=0.0


    def turtlebot_back(self) :
        self.cmd_msg.linear.x= -0.2
        self.cmd_msg.angular.z=0.0


    def turtlebot_stop(self) :
        self.cmd_msg.linear.x=0.0
        self.cmd_msg.angular.z=0.0


    def turtlebot_cw_rot(self) :
        self.cmd_msg.linear.x=0.0
        self.cmd_msg.angular.z=0.1


    def turtlebot_cww_rot(self) :
        self.cmd_msg.linear.x=0.0
        self.cmd_msg.angular.z=-0.1


    def timer_callback(self):
 
        # 터틀봇 조작관련 
        ctrl_cmd = get_global_var()

        # # turn left
        if ctrl_cmd == 1:     
            self.turtlebot_cww_rot()

        # go straight
        elif ctrl_cmd == 2:          
            self.turtlebot_go()

        # back        
        elif ctrl_cmd == 3:
            self.turtlebot_back()

        # turn right
        elif ctrl_cmd == 4:
            self.turtlebot_cw_rot()
        
        else:
            self.turtlebot_stop()

        self.cmd_publisher.publish(self.cmd_msg)
        
        if ctrl_cmd != 0: 
            self.m_control_iter += 1

        if self.m_control_iter % self.m_control_interval == 0:

            self.m_control_iter = 0

            reset_global_var()
        

def main(args=None):
    
    rclpy.init(args=args)
    map_client = MoveTurtleBot()
    rclpy.spin(map_client)    
    rclpy.shutdown()
    sio.disconnect()


if __name__ == '__main__':
    main()