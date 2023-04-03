import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist, Point, Point32, Pose, PoseStamped
from ssafy_msgs.msg import TurtlebotStatus, Detection
from squaternion import Quaternion
from nav_msgs.msg import Odometry,Path
from math import pi,cos,sin,sqrt,atan2
import numpy as np
from sensor_msgs.msg import LaserScan, PointCloud
from std_msgs.msg import Int16

# path_tracking 노드는 로봇의 위치(/odom), 로봇의 속도(/turtlebot_status), 주행 경로(/local_path)를 받아서, 주어진 경로를 따라가게 하는 제어 입력값(/cmd_vel)을 계산합니다.
# 제어입력값은 선속도와 각속도로 두가지를 구합니다. 


# 노드 로직 순서
# 1. 제어 주기 및 타이머 설정
# 2. 파라미터 설정
# 3. Quaternion 을 euler angle 로 변환
# 4. 터틀봇이 주어진 경로점과 떨어진 거리(lateral_error)와 터틀봇의 선속도를 이용해 전방주시거리 계산
# 5. 전방 주시 포인트 설정
# 6. 전방 주시 포인트와 로봇 헤딩과의 각도 계산
# 7. 선속도, 각속도 정하기

class followTheCarrot(Node):
    def __init__(self):
        super().__init__('path_tracking') 

        # 로봇을 움직이게 하는 부분
        self.cmd_pub = self.create_publisher(Twist, 'cmd_vel', 10)

        # 로봇의 현재 위치
        self.subscription = self.create_subscription(Odometry,'/odom',self.odom_callback,10)
        self.status_sub = self.create_subscription(TurtlebotStatus,'/turtlebot_status',self.status_callback,10)

        # 경로 받아오기
        self.path_sub = self.create_subscription(Path,'/local_path',self.path_callback,10)

        # 라이다 데이터 구독
        self.lidar_sub = self.create_subscription(LaserScan, '/scan', self.lidar_callback, 10)

        # 로직 1. 제어 주기 및 타이머 설정
        time_period=0.05
        self.timer = self.create_timer(time_period, self.timer_callback)

        # handcontrol node에 제어 메시지를 보냄
        self.hand_control_pub = self.create_publisher(Int16, '/hand_control_cmd', 10)

        # 목표 좌표를 가지고 옴
        # self.goal_sub = self.create_subscription(PoseStamped,'/goal_pose',self.goal_callback, 1)

        # a_star에 목표 좌표를 보냄
        self.a_star_goal_pub = self.create_publisher(Point, '/a_star_goal', 10)

        # yolo에서 정보를 받아옴
        self.yolo_sub = self.create_subscription(Detection, '/yolo_detected', self.yolo_callback, 10)

        self.is_odom = False
        self.is_path = False
        self.is_status = False
        self.is_forward_approach = False
        self.is_right_approach = False
        self.is_left_approach = False
        self.is_trigger = True
        self.is_yolo = False
        self.is_pointed = False

        self.odom_msg=Odometry()            
        self.robot_yaw=0.0
        self.turtle_yaw = 0.0
        self.path_msg=Path()
        self.cmd_msg=Twist()

        self.handcontrol_cmd_msg = Int16()

        # 로직 2. 파라미터 설정(전방주시거리)
        self.lfd=0.1
        self.min_lfd=0.1
        self.max_lfd=1.0

        # 터틀봇이 정지해있는지 판단
        self.stop_cnt = 0 # 터틀봇이 멈춰 있는지 판단하는 간격을 정하기 위한 변수
        self.is_stop = False # 터틀봇의 정지 여부 판단
        self.out_vel = 0.0 # 탈출을 계속하기 위해 필요함
        self.out_rad_vel = 0.0

        self.turn_cnt = 0
        self.go_cnt = 0
        self.back_cnt = 0

         # 터틀봇의 현재 위치
        self.robot_pose_x = 0
        self.robot_pose_y = 0

        # 백에서 넘어오는 trigger
        self.triggers = {
                'data': [
                    {
                    'plant_number': 1, 
                    'plant_original_name': 'plant1', 
                    'plant_position_x': -4.0, 
                    'plant_position_y': 5.0
                    },
                    {
                    'plant_number': 2, 
                    'plant_original_name': 'plant1', 
                    'plant_position_x': -4.17, 
                    'plant_position_y': 6.06
                    }
                ], 
                'mode': 100}
        
        # trigger 정보
        self.goal_x = 0
        self.goal_y = 0
        self.plant_original_name = ''
        self.palnt_number = 0

       
       # yolo에서 받아온 정보
        self.yolo_msg = Detection()
        self.yolo_distance = 0
        self.yolo_number = 0
        self.yolo_cx = 0
        self.yolo_cy = 0

        # 사진은 한번만 찍기 위한 변수
        self.pickture = set()

        # handcontrol에 모드를 보냄
        self.hand_control_msg = Int16()
        
        # 멈췄는 지 확인 하는 함수
        self.check_stop = 0

    def timer_callback(self):
        # 백에서 트리거가 실행되면
        if self.is_trigger:
            self.mode = self.triggers['mode']
            self.goal_x = self.triggers['data'][0]['plant_position_x']
            self.goal_y = self.triggers['data'][0]['plant_position_y']
            self.plant_original_name = self.triggers['data'][0]['plant_original_name']
            self.plant_number = self.triggers['data'][0]['plant_number']

            goal = Point()
            goal.x, goal.y = self.goal_x, self.goal_y
            self.a_star_goal_pub.publish(goal)

        # 로봇의 현재 위치를 나타내는 변수
        self.robot_pose_x = self.odom_msg.pose.pose.position.x
        self.robot_pose_y = self.odom_msg.pose.pose.position.y
        
        # yolo가 넘어오면
        if self.is_yolo:
            try:
                idx = self.yolo_msg.object_class.index(self.plant_number - 1)
                self.yolo_distance = self.yolo_msg.distance[idx]
                self.yolo_number = self.yolo_msg.object_class[idx]
                self.yolo_cx = self.yolo_msg.cx[idx]
                self.yolo_cy = self.yolo_msg.cy[idx]
                
                if self.check_stop >= 100:
                    self.is_pointed = True
                else:
                    self.is_pointed = False

                # 화분 앞에 위치하지 않고 거리가 2보다 작으면
                if not self.is_pointed and self.yolo_distance <= 2:
                    self.is_stop = True
                    self.cmd_msg.linear.x=0.0
                    self.cmd_msg.angular.z=0.0

                    # 목표 화분인지 확인하고(화분 번호는 백에서는 1번 부터 시작,yolo는 0번 부터 시작)
                    if  self.yolo_number == self.plant_number - 1:
                        #print('목표 화분 맞음')
                        # 화분 과의 거리가 0.6 미만이면 사진을 찍-5.기 위해 0.6까지 전진
                        #print('distance', distance)
                        # 중앙 맞추기
                        if 318 <= self.yolo_cx <= 322:
                            #print('중앙 맞춤')
                            # 중간에 있으면 천천히 전진
                            self.cmd_msg.angular.z=0.0
                            self.cmd_msg.linear.x=0.3
                            if self.yolo_distance <= 1:
                                self.cmd_msg.linear.x=0.1
                                if 0.58 < self.yolo_distance <= 0.6:
                                    self.cmd_msg.linear.x=0.0
                                    self.cmd_msg.angular.z=0.0
                                    self.check_stop += 1
                                else:
                                    # 포인트에서 벗어나면
                                    self.check_stop = 0
                                    # 너무 가까우면 후진하기
                                    if self.yolo_distance <= 0.58:
                                        self.cmd_msg.linear.x=-0.1
                                        self.cmd_msg.angular.z=0.0
                        # 목표가 왼쪽에 있으면
                        else:
                            if self.yolo_cx < 316:
                                self.cmd_msg.angular.z=-0.05
                                if self.yolo_cx < 280:
                                    self.cmd_msg.angular.z=-0.3

                            # 목표가 오른쪽에 있으면
                            else:
                                self.cmd_msg.angular.z=0.05
                                if self.yolo_cx > 360:
                                    self.cmd_msg.angular.z = 0.3

                        # 목표 화분이면 mode에 맞춰서 handcontrol 작동시기키
                        self.hand_control_pub.publish(self.hand_control_msg)
                    else:
                        # 목표 화분이 아니면 회피해서 목표 지점으로 가기
                        #print('목표 화분 아님')
                        self.is_stop = False 

                    #print('x', self.cmd_msg.linear.x, 'z', self.cmd_msg.angular.z)
                else:
                    # 화분 앞에서 정지한 상태
                    # 물 줄때만 사진 찍기
                    if self.mode == 100 and self.yolo_number not in self.pickture:
                        print('사진찍기')
                        self.pickture.add(self.yolo_number)
                    print('화분 앞이다!!')
                    self.cmd_msg.linear.x=0.0
                    self.cmd_msg.angular.z=0.0
                    # 들기

                self.cmd_pub.publish(self.cmd_msg)
            except IndexError:
                print('화분 없음')
            except ValueError:
                print('목표 화분이 yolo에 없음')

        # 1. turtlebot이 연결되어 있고, odom이 작동하며, 경로가 있을 때, yolo가 작동 중일때, stop이 아닐때
        #print(self.is_status, self.is_odom, self.is_path, self.is_stop)
        if self.is_status and self.is_odom and self.is_path and not self.is_stop:
            # 남은 경로가 1 이상이면
            if len(self.path_msg.poses)> 1:
                self.is_look_forward_point = False
                self.handcontrol_cmd_msg.data = 0

                # 로봇과 가장 가까운 경로점과의 직선거리
                lateral_error = sqrt(pow(self.path_msg.poses[0].pose.position.x-self.robot_pose_x,2)+pow(self.path_msg.poses[0].pose.position.y-self.robot_pose_y,2))
                # #print(self.robot_pose_x,self.robot_pose_y,lateral_error)

                # 로직 4. 로봇이 주어진 경로점과 떨어진 거리(lateral_error)와 로봇의 선속도를 이용해 전방주시거리 설정

                self.lfd = (self.status_msg.twist.linear.x + lateral_error) * 0.7

                # 최대, 최소 전방주시거리 제한 (0.1 ~ 1.0m)
                if self.lfd < self.min_lfd :
                    self.lfd=self.min_lfd
                if self.lfd > self.max_lfd:
                    self.lfd=self.max_lfd

                min_dis=float('inf')

                # 로직 5. 전방 주시 포인트 설정(lfd만큼 떨어진 경로점을 찾는 부분)
                for num, waypoint in enumerate(self.path_msg.poses):
                    self.current_point = waypoint.pose.position
                    # 로봇과 가장 가까운 경로점과 모든 경로점과의 거리 탐색
                    dis = sqrt(pow(self.path_msg.poses[0].pose.position.x - self.current_point.x, 2) + pow(self.path_msg.poses[0].pose.position.y - self.current_point.y, 2))
                    if abs(dis-self.lfd) < min_dis:
                        min_dis = abs(dis-self.lfd)
                        # 경로점을 넣어준다
                        self.forward_point = self.current_point
                        self.is_look_forward_point = True
                        target_num = num

                if self.is_look_forward_point: 
                    # 전방 주시 포인트
                    global_forward_point=[self.forward_point.x, self.forward_point.y, 1]

                    '''
                    로직 6. 전방 주시 포인트와 로봇 헤딩과의 각도 계산
                    (테스트) 맵에서 로봇의 위치(self.robot_pose_x,self.robot_pose_y)가 (5,5)이고, 헤딩(self.robot_yaw) 1.57 rad 일 때, 선택한 전방포인트(global_forward_point)가 (3,7)일 때
                    변환행렬을 구해서 전방포인트를 로봇 기준좌표계로 변환을 하면 local_forward_point가 구해지고, atan2를 이용해 선택한 점과의 각도를 구하면
                    theta는 0.7853 rad 이 나옵니다.
                    trans_matrix는 로봇좌표계에서 기준좌표계(Map)로 좌표변환을 하기위한 변환 행렬입니다.
                    det_tran_matrix는 trans_matrix의 역행렬로, 기준좌표계(Map)에서 로봇좌표계로 좌표변환을 하기위한 변환 행렬입니다.  
                    local_forward_point 는 global_forward_point를 로봇좌표계로 옮겨온 결과를 저장하는 변수입니다.
                    theta는 로봇과 전방 주시 포인트와의 각도입니다. 
                    '''
                    trans_matrix = np.array([       
                                            [cos(self.robot_yaw), -sin(self.robot_yaw), self.robot_pose_x],
                                            [sin(self.robot_yaw), cos(self.robot_yaw), self.robot_pose_y],
                                            [0, 0, 1],
                    ])
                    # 역행렬 만들기
                    det_trans_matrix = np.linalg.inv(trans_matrix)
                    # 글로벌 경로를 역행렬 연산 => 로컬 경로를 알아냄   
                    local_forward_point = det_trans_matrix.dot(global_forward_point)
                    # 로봇과 전방주시 포인트간의 차이값 계산
                    theta = -atan2(local_forward_point[1], local_forward_point[0])
                    
                    # 로직 7. 선속도, 각속도 정하기
                    out_vel = 0.7
                    out_rad_vel = theta
                    # 10이내의 거리에서 선속도를 줄이고 각속도를 높여서 목표 지점을 지나치지 않도록 함
                    if len(self.path_msg.poses) < 20:
                        out_vel = 0.3
                        # 5 이내의 거리에서는 정밀한 제어를 위해 완전히 속도를 줄임
                        if len(self.path_msg.poses) < 10:
                            out_vel = 0.1
                        out_rad_vel = theta
        
                    self.cmd_msg.linear.x = out_vel
                    self.cmd_msg.angular.z = out_rad_vel
            # 남은 경로가 1 미만
            else:
                # 현재 위치가 목표 좌표 1 영역 이내에 들어왔으면
                if self.goal_x - 1 <= self.robot_pose_x <= self.goal_x + 1 and self.goal_y - 1 <= self.robot_pose_y <= self.goal_y + 1:
                    #print('목표 지점에 도착')
                    # 도착 후 멈추기
                    self.cmd_msg.linear.x=0.0
                    self.cmd_msg.angular.z=0.0
                    
                    # 목표로 왔는데 화분이 없다 그럼 제자리에서 돌기
                    try:
                        if self.yolo_msg.object_class[0] != self.plant_number - 1:
                            print('목표 화분이 아니야')
                            self.cmd_msg.angular.z=0.3
                    except:
                        print('목표 지점에 왔는데 화분이 없어!!')
                        self.cmd_msg.angular.z=0.3
                        
                else:
                    # 목표 좌표를 찾을 수 없으면 초록색 영역(127) 안에 있다는 말 빠져나오기 위해 후진을 해야함
                    #print("no found forward point")
                    self.cmd_msg.linear.x=-0.1
                    self.cmd_msg.angular.z=0.1

            self.cmd_pub.publish(self.cmd_msg)
            

    def odom_callback(self, msg):
        self.is_odom=True
        self.odom_msg=msg

        # 로직 3. Quaternion 을 euler angle 로 변환
        q = Quaternion(msg.pose.pose.orientation.w, msg.pose.pose.orientation.x, 
                       msg.pose.pose.orientation.y, msg.pose.pose.orientation.z)
        _, _, self.robot_yaw = q.to_euler()


    def path_callback(self, msg):
        self.is_path=True
        self.path_msg=msg


    def status_callback(self,msg):
        self.is_status=True
        self.status_msg=msg

    # 라이다 데이터 수신시 호출되는 콜백함수
    def lidar_callback(self, msg):
        self.is_lidar = True
        self.lidar_msg = msg
        # 경로와 위치를 알고 있어야 하기 때문에 알고 있는지 체크
        if self.is_path == True and self.is_odom == True:
            # 직교좌표계 데이터를 가질 포인트클라우드 생성
            pcd_msg = PointCloud()
            pcd_msg.header.frame_id = 'map'
            # 로컬 to 글로벌 변환 행렬
            pose_x = self.odom_msg.pose.pose.position.x
            pose_y = self.odom_msg.pose.pose.position.y
            theta = self.robot_yaw
            t = np.array([[cos(theta), -sin(theta), pose_x],
                          [sin(theta), cos(theta), pose_y],
                          [0, 0, 1]])
            # 극좌표계를 직교좌표계로 만들기
            for angle, r in enumerate(msg.ranges):
                global_point = Point32()

                if 0.0 < r < 12:
                    # 극좌표계를 로봇 기준(로컬) 직교좌표계로
                    local_x = r * cos(angle * pi / 180)
                    local_y = r * sin(angle * pi / 180)
                    local_point = np.array([[local_x], [local_y], [1]])
                    # 로컬 직교좌표계를 맵 기준(글로벌) 직교좌표계로
                    global_result = t.dot(local_point)
                    global_point.x = global_result[0][0]
                    global_point.y = global_result[1][0]
                    # 포인트 클라우드에 맵 기준 직교좌표계 데이터 추가
                    # 퍼블리시는 하지 않았지만 확인하고 싶으면 pcd_msg를 퍼블리시해서 rviz에서 확인할 것
                    pcd_msg.points.append(global_point)

            # 전/후방, 좌/우측 충돌 감지
            forward_left = self.lidar_msg.ranges[0:6]
            forward_right = self.lidar_msg.ranges[355:360]
            forward = forward_left + forward_right
            backward = self.lidar_msg.ranges[170:191]
            left = self.lidar_msg.ranges[20:31]
            right = self.lidar_msg.ranges[330:341]

            # 평균 거리 계산
            forward_dis = sum(forward) / len(forward)
            backward_dis = sum(backward) / len(backward)
            left_dis = sum(left) / len(left)
            right_dis = sum(right) / len(right)
            # #print('전방', forward_dis)
            # #print('후방', backward_dis)
            # #print('좌측', left_dis)       
            # #print('우측', right_dis)

            # 근접 감지
            if forward_dis < 0.25:
                self.is_forward_approach = True
                #print('전방 근접')
            elif left_dis < 0.25:
                self.is_right_approach = True
                #print('좌측 근접')
            elif right_dis < 0.25:
                self.is_left_approach = True
                #print('우측 근접')
            # elif backward_dis < 0.25:
            #     self.is_approach = False
            #     #print('후방 근접')

    # def goal_callback(self, msg):
    #     if msg.header.frame_id=='map':
    #         # #print(msg)
    #         # {
    #         #     'data': [
    #         #         {
    #         #             'plant_number': 1, 
    #         #             'plant_original_name': 'plant1', 
    #         #             'plant_position_x': -2.57, 
    #         #             'plant_position_y': 3.77
    #         #         },
    #         #         {
    #         #             'plant_number': 2, 
    #         #             'plant_original_name': 'plant2', 
    #         #             'plant_position_x': -5.57, 
    #         #             'plant_position_y': 5.77
    #         #         },
    #         #     ], 
    #         #     'mode': 100
    #         # }
    #         '''
    #         로직 6. goal_pose 메시지 수신하여 목표 위치 설정
    #         ''' 
    #         self.goal_poses = []
    #         self.goal_x=msg.pose.position.x
    #         self.goal_y=msg.pose.position.y

    def yolo_callback(self, msg):
        self.is_yolo = True
        self.yolo_msg = msg

            
def main(args=None):
    rclpy.init(args=args)

    path_tracker = followTheCarrot()

    rclpy.spin(path_tracker)


    path_tracker.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main() # 선속도와 각속도로 두가지를 구합니다. 