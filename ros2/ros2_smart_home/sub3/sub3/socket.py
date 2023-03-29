import rclpy
import socketio

from rclpy.node import Node
from ssafy_msgs.msg import TurtlebotStatus
from geometry_msgs.msg import Twist,Point
from std_msgs.msg import String
from math import pi,cos,sin,sqrt,atan2


info = {
    "robot" : {
        "pos" : [],
        "velocity" : 0,
        "battery" : 100,
        "mode" : 0
    },
}

# socket 
sio = socketio.Client()

# msg = String()
# print('String', msg)

@sio.event
def connect():
    print('connection ROS')        
    
@sio.event
def disconnect():
    print('disconnected ROS from server')
    
@sio.event
def connect_error(data):
    print("connect_error!", data)

@sio.on("safety_status")
def listening(data):        
    print("들리나야오오요요", data)
    
ip_server = 'http://localhost:3001'

print("connect ", ip_server)
sio.connect(ip_server)


class SocketClass(Node):

    def __init__(self):
        super().__init__('socket_info') 

        # self.cmd_msg=Twist()

        self.timer_period = 1
        self.timer = self.create_timer(self.timer_period, self.timer_callback)

        # self.m_control_interval = 10
        # self.m_control_iter = 0
       

    # 내가 보내는 데이터
    def timer_callback(self):
        # pass      
        sio.emit("ros_test", 'ROS에서 보내는 데이터')


        

def main(args=None):
        
    rclpy.init(args=args)    
    

    socket_info = SocketClass()
    rclpy.spin(socket_info)   
    socket_info.destory_node() 
    rclpy.shutdown()


if __name__ == '__main__':
    main()