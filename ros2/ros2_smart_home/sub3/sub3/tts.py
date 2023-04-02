import rclpy
from rclpy.node import Node
from ssafy_msgs.msg import Tts
from gtts import gTTS
from playsound import playsound

import os

# bool water_mode
# bool sunny_mode
# string pot_name

class TTS(Node):
    
    def __init__(self):
        super().__init__('tts')

        self.tts_sub = self.create_subscription(Tts, '/tts', self.tts_callback, 100)

        # publish도 필요함 끝났으면 끝났다는 정보를 어딘가에 전달해야하니까. Tts.msg에 end 변수도 넣을까.?
        # self.pub = self.create_publisher()
    
    
    def tts_callback(self,msg):
        # tts 사운드 상대경로 설정
        os_file_path = os.path.abspath(__file__)        
        tts_path = os_file_path.replace('install\\sub3\\Lib\\site-packages\\sub3\\tts.py', 
                                        'ros2_smart_home\\sub3\\sound')     
        
        # TTS 만들기(물주기/ 필요한 정보 : 모드)
        # pot_name = msg.pot_name
        pot_name = "mao1"    # 변수 명으로 바꿔야함  

        if msg.water_mode or msg.sunny_mode:

            if msg.water_mode:
                data = pot_name + ' 화분에 물 주는 중입니다.'
                tts_file = 'water.mp3'
            elif msg.sunny_mode:
                data = pot_name + ' 화분을 옮기는 중입니다.'
                tts_file = 'sunny.mp3'
            

            sp = gTTS( lang='ko', text=data, slow=False )

            sp.save(f'{tts_path}/{tts_file}')

            playsound(f'{tts_path}/{tts_file}')





def main(args=None):
    rclpy.init(args=args)
    tts = TTS()
    rclpy.spin(tts)
    tts.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()