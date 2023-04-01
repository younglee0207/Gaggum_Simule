import rclpy
import socketio

from rclpy.node import Node
from ssafy_msgs.msg import TurtlebotStatus,EnviromentStatus, MapScan
from geometry_msgs.msg import Twist,Point
from std_msgs.msg import Int8MultiArray
from math import pi,cos,sin,sqrt,atan2

# Int8MultiArray = [map_scan, map_create_turtle_bot, map_save] 
# lidar로 맵 스캔, 터틀봇 자동으로 움직이기, 만들어진 map 저장

info = {
    "robot" : {
        "x" : 0,
        "y" : 0,
        "mode" : 0,
    },
    "environment" : {
        "month" : 30,
        "day" : 0,
        "hour" : 9,
        "minute" : 0,
        "temperature" : 10,
        "weather" : "Cloudy"
    }
}

# global 변수 설정, msg로 publish 하여 다른 node에서 조건에 맞게 실행하기 위함
# 기본 값은 0 으로 제어 명령을 보내지 않는 상태가 됨.
global map_scan, map_create_turtle_bot
map_scan = False
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
    global map_scan, map_create_turtle_bot 
    
    # FRONT -> ROS로 제어 명령 보냄
    if data == 1:
        map_scan = 1
        map_create_turtle_bot = 1


# 자동급수, 자동 물주기 정보 들어오는 곳
@sio.on("auto_move")
def auto_move(data):
    # 여기에 어떤 정보를 가공해서 보내야 할까?
    print("auto_move", data['mode'])    

    
ip_server = 'http://localhost:3001'
# ip_server = "https://j8b310.p.ssafy.io/socket"
# ip_server = 'http://j8b310.p.ssafy.io:3001'


print("connect ", ip_server)
sio.connect(ip_server)


class SocketClass(Node):

    def __init__(self):
        super().__init__('socket_info') 

        # 맵 만들 때 필요한 변수를 저장하는 주소 publish
        self.create_map_publisher = self.create_publisher(Int8MultiArray, '/map_scan', 10)
        # 터틀 봇 맵 작동 정보 구독
        self.create_map_sub = self.create_subscription(Int8MultiArray, '/map_scan', self.map_scan_callback, 1000)
        # 환경 변수
        self.envir_sub = self.create_subscription(EnviromentStatus, '/envir_status', self.env_callback, 1000)
        # 터틀봇 정보
        self.turtle_bot_sub = self.create_subscription(TurtlebotStatus, '/turtlebot_status', self.turtlebot_callback, 1000)
        
        # test
        # self.map_scan_sub = self.create_subscription(MapScan, '/scan', self.test_callback, 100)


        self.timer_period = 1
        self.timer = self.create_timer(self.timer_period, self.timer_callback)       


    # 시뮬레이터 환경 변수 Back에 전달.
    def env_callback(self, msg):

        info["environment"]["month"] = msg.month
        info["environment"]["day"] = msg.day
        info["environment"]["hour"] = msg.hour
        info["environment"]["minute"] = msg.minute
        info["environment"]["weather"] = msg.weather
        info["environment"]["temperature"] = msg.temperature

    # 터틀봇 현재 위치
    def turtlebot_callback(self, msg):

        info["robot"]["x"] = msg.twist.angular.x
        info["robot"]["y"] = msg.twist.angular.y

    def map_scan_callback(self, msg):
  
        if msg.data[1] == -1:
            print("맵 스캔이 종료되었습니다.")
            global map_scan, map_create_turtle_bot        
            map_scan, map_create_turtle_bot = -1, -1

            msg.data = [0, 0]
            self.create_map_publisher.publish(msg)

            # sio.emit("run_mapping", msg.data[1])

            # # 스캔 종료 후 다시 0으로 대기 상태 하기
            # msg = Int8MultiArray()
            # msg.data = [0, 0]
            # self.create_map_publisher.publish(msg)
            
            # sio.disconnect()

    


    # socket 정보를 저장하거나 다른 곳에 쓸 수 있게 callback
    def timer_callback(self):
        global map_scan, map_create_turtle_bot

        # run_mapping을 하기위해 만든 함수. msg를 publish해서 run_mapping, wall_tracking을 할 수 있게 한다.
        # map_scan Topic
        msg = Int8MultiArray()
        # msg.data = [map_scan, map_create_turtle_bot]
        print("MapOperationList", msg)
        # self.create_map_publisher.publish(msg)
        testmsg = MapScan()
        print('make', testmsg.map_scan)
                    
        # wall_tracking이 종료 되었으면 map_create는 -1이 됨.
        if map_scan == -1:
            print("맵 스캔이 종료 -> 프론트로 데이터 전달.")
            sio.emit("run_mapping", map_scan)

            # 스캔 종료 후 다시 0으로 대기 상태 하기
            map_scan, map_create_turtle_bot = 0, 0

        # map_scan 작동 명령을 topic에다가 전달. -> run_mapping, wall_tracking 둘다 실행
        elif map_scan == 1:
            msg.data = [map_scan, map_create_turtle_bot]
            self.create_map_publisher.publish(msg)

            
        # envir_status 정보를 socket 통신을 통해 백에 전달.
        sio.emit("simulator_info", info)


        

def main(args=None):
        
    rclpy.init(args=args)    
    

    socket_info = SocketClass()
    rclpy.spin(socket_info)   
    socket_info.destory_node() 
    rclpy.shutdown()


if __name__ == '__main__':
    main()
