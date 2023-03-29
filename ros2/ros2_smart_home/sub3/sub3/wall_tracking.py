import rclpy
from rclpy.node import Node

from geometry_msgs.msg import Twist,Point, Point32
from ssafy_msgs.msg import TurtlebotStatus
from squaternion import Quaternion
from nav_msgs.msg import Odometry,Path
from sensor_msgs.msg import LaserScan, PointCloud
from std_msgs.msg import Int8MultiArray


class wallTracking(Node):

    def __init__(self) :

        super().__init__('wall_Tracking')
        self.cmd_pub = self. create_publisher(Twist,'cmd_vel',10)
        self.lidar_sub = self.create_subscription(LaserScan,'/scan',self.lidar_callback,10)
        self.subscription = self.create_subscription(Odometry,'/odom',self.odom_callback,10)
        self.status_sub = self.create_subscription(TurtlebotStatus,'/turtlebot_status',self.status_callback,10)
        self.move_start_sub = self.create_subscription(Int8MultiArray, '/create_map', self.start_callback, 10)


        self.cmd_msg = Twist()
        time_period = 0.05
        self.timer = self.create_timer(time_period,self.timer_callback)

        self.is_odom=False
        self.is_path=False
        self.is_status=False
        self.is_lidar = False

        # 터틀봇의 상태를 저장
        self.state = 0

        # 영역별 장애물과의 거리
        self.regions = {
            'right': 0,
            'front_right': 0,
            'front_left': 0,
            'front': 0,
            'left': 0,
        }

        # 장애물 충돌여부
        self.collision = False

        # wall_following 시작 조건
        self.is_start = False

    def start_callback(self, msg):
        # msg.data[1] = map_create_turtle_bot
        self.is_start = msg.data[1]

    def timer_callback(self):

        if self.is_start:
            if self.state == 0:
                self.find_wall()
            elif self.state == 1:
                self.turn_right()
            elif self.state == 2:
                self.follow_the_wall()
            else:
                print('오류 발생!!')
            
            self.cmd_pub.publish(self.cmd_msg)
        else:
            print('터틀봇 대기중')


    def change_state(self,state):

        if state is not self.state:
            self.state = state


    def take_action(self):
        
        # 제자리에 멈추고 행동 취하기 충돌 방지
        self.cmd_msg.linear.x = 0.0
        self.cmd_msg.angular.z = 0.0
        d = 0.6

        if self.regions['front'] > d:                # 전방 널널
            if self.regions['front_right'] > d:      # 우측 널널
                if self.regions['front_left'] > d:   # 좌측 널널
                    self.change_state(0)             # 왼쪽 벽 찾기
                elif self.regions['front_left'] < d: # 좌측 근접
                    self.change_state(2)             # 왼쪽 벽 따라가기
            elif self.regions['front_right'] < d:    # 우측 근접
                    self.change_state(0)             # 왼쪽 벽 찾기
                    
        elif self.regions['front'] < d:              # 전방 근접
            self.change_state(1)                     # 멈추고 오른쪽으로 회전

        else:
            print('예외상황 발생!!')


    def find_wall(self):

        self.cmd_msg.linear.x = 0.3
        self.cmd_msg.angular.z = -0.3

    
    def turn_right(self):

        self.cmd_msg.angular.z = 0.5

    
    def follow_the_wall(self):

        self.cmd_msg.linear.x = 0.3

    
    def odom_callback(self, msg):

        self.is_odom=True
        self.odom_msg=msg
        q = Quaternion(msg.pose.pose.orientation.w, msg.pose.pose.orientation.x, msg.pose.pose.orientation.y, msg.pose.pose.orientation.z)
        _,_,self.robot_yaw = q.to_euler()


    def lidar_callback(self, msg):

        self.lidar_msg = msg
        self.regions = {
            'front': min(msg.ranges[345:358]+msg.ranges[:15]),
            'front_left': min(msg.ranges[15:60]),
            'front_right': min(msg.ranges[270:345]),
            'left': min(msg.ranges[60:120]),
            'right': min(msg.ranges[210:270]),
        }

        self.take_action()
        

    def status_callback(self,msg):
        self.is_status=True
        self.status_msg=msg
    

def main(args=None):

    rclpy.init(args=args)
    Wall_tracking = wallTracking()
    rclpy.spin(Wall_tracking)
    Wall_tracking.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()