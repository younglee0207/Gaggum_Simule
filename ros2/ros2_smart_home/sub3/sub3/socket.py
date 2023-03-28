import rclpy
import socketio

from rclpy.node import Node
from ssafy_msgs.msg import TurtlebotStatus
from geometry_msgs.msg import Twist,Point
from std_msgs.msg import Float32, String, Int8MultiArray
# from create_map_msgs.msg import MapOperationList
from math import pi,cos,sin,sqrt,atan2

# MapOperationList = [map_create, map_create_turtle_bot, map_save] 
# lidar로 맵 스캔, 터틀봇 자동으로 움직이기, 만들어진 map 저장

info = {
    "robot" : {
        "pos" : [],
        "velocity" : 0,
        "battery" : 100,
        "mode" : 0
    },
}

# global 변수 설정, msg로 publish 하여 다른 node에서 조건에 맞게 실행하기 위함
global map_create, map_create_turtle_bot
map_create = False
map_create_turtle_bot = False

# socket 
sio = socketio.Client()

@sio.event
def connect():
    print('connection ROS')        
    
@sio.event
def disconnect():
    print('disconnected ROS from server')
    
@sio.event
def connect_error(data):
    print("connect_error!", data)

@sio.on("run_mapping")
def run_mapping(data):            
    print("run_mapping", data)

    global map_create, map_create_turtle_bot 

    # mapping을 시작한다.
    map_create = not map_create
    map_create_turtle_bot = not map_create_turtle_bot


# def get_map_create():
#     return [map_create, map_create_turtle_bot]
    
ip_server = 'http://localhost:3001'

print("connect ", ip_server)
sio.connect(ip_server)


class SocketClass(Node):

    def __init__(self):
        super().__init__('socket_info') 

        # 맵 만들 때 필요한 변수를 저장하는 주소 publish
        self.create_map_publisher = self.create_publisher(Int8MultiArray, '/create_map', 10)

        self.timer_period = 1
        self.timer = self.create_timer(self.timer_period, self.timer_callback)

        # self.m_control_interval = 10
        # self.m_control_iter = 0
       

    # Front 신호 받아 온 값을 터틀 봇 내 msg로 저장


    # 내가 보내는 데이터
    def timer_callback(self):
        msg = Int8MultiArray()
        msg.data = [map_create, map_create_turtle_bot]
        print("MapOperationList", msg)
        self.create_map_publisher.publish(msg)

        sio.emit("ros_test", 'ROS에서 보내는 데이터')


        

def main(args=None):
        
    rclpy.init(args=args)    
    

    socket_info = SocketClass()
    rclpy.spin(socket_info)   
    socket_info.destory_node() 
    rclpy.shutdown()


if __name__ == '__main__':
    main()