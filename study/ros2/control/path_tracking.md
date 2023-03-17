### 충돌 감지 기능

```python
 # 라이다 데이터 수신시 호출되는 콜백함수
    def lidar_callback(self, msg):
        self.is_lidar = True
        self.lidar_msg = msg
        # print('self.lidar_msg', self.lidar_msg)

        # 경로와 위치를 알고 있어야 하기 때문에 알고 있는지 체크
        if self.is_path and self.is_odom:
            # 직교좌표계 데이터를 가질 포인트클라우드 생성
            pcd_msg = PointCloud()
            pcd_msg.header.frame_id = 'map'

            # local_path를 global_path 변환 행렬
            pose_x = self.odom_msg.pose.pose.position.x
            pose_y = self.odom_msg.pose.pose.position.y
            theta = self.robot_yaw
            t = np.array([[cos(theta), -sin(theta), pose_x],
                          [sin(theta), cos(theta), pose_y],
                          [0, 0, 1]])
            
            # 극좌표계를 직교좌표계로 만들기
            for angle, r in enumerate(msg.ranges):
                global_point = Point32()
                # print(angle, r, global_point)

                if 0.0 < r < 12:
                    # 극좌표계를 로봇 기준(로컬) 직교좌표계로
                    local_x = r * cos(angle * pi / 180)
                    local_y = r * sin(angle * pi / 180)
                    local_point = np.array([[local_x], [local_y], [1]])
                    # print('local_x:', local_x)
                    # print('local_y:', local_y)
                    # print('local_point:', local_point)
                    
                    # 로컬 직교좌표계를 맵 기준(글로벌) 직교좌표계로
                    global_result = t.dot(local_point)
                    global_point.x = global_result[0][0]
                    global_point.y = global_result[1][0]
                    # 포인트 클라우드에 맵 기준 직교좌표계 데이터 추가
                    # 퍼블리시는 하지 않았지만 확인하고 싶으면 pcd_msg를 퍼블리시해서 rviz에서 확인할 것
                    pcd_msg.points.append(global_point)
                     
            # 전/후방 충돌 감지
            self.collision = False
            # 라이다 거리는 반시계방향 순으로 들어옴
            forward_right = self.lidar_msg.ranges[355:360]
            forward_left = self.lidar_msg.ranges[0:6]
            forward_dis = forward_left + forward_right
            # print(forward_dis)
            # 전방과의 평균 거리 계산
            self.forward = sum(forward_dis) / len(forward_dis)
            # print(self.forward)
            if self.forward < 0.1:
                print('충돌')
```


