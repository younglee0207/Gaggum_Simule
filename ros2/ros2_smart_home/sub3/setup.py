from setuptools import setup

package_name = 'sub3'

setup(
    name=package_name,
    version='0.0.0',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='user',
    maintainer_email='mgko@morai.ai',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'aws_client = sub3.aws_client:main',
            'tf_detector_skeleton = sub3.tf_detector_skeleton:main',
            'tf_detector = sub3.tf_detector:main',
            'run_mapping = sub3.run_mapping:main',
            'load_map = sub3.load_map:main',
            'run_localization = sub3.run_localization:main',
            'iot_udp = sub3.iot_udp:main',
            'iot_udp_skeleton = sub3.iot_udp_skeleton:main',
            'run_localization_skeleton = sub3.run_localization_skeleton:main',
            'run_mapping_skeleton = sub3.run_mapping_skeleton:main',
            'yolov5 = sub3.yolov5:main',
            'wall_tracking = sub3.wall_tracking:main',
            'socket = sub3.socket:main',
            'move_turtle = sub3.move_turtle:main',
            'yolov5_distance = sub3.yolov5_distance:main',
            'tts = sub3.tts:main',
            'yolov5_single = sub3.yolov5_single:main',
        ],
    },
)
