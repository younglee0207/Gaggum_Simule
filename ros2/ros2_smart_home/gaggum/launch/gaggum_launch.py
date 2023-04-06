from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='gaggum',
            node_executable='odom',
            node_name='odom'
        ),
        Node(
            package='gaggum',
            node_executable='a_star',
            node_name='a_star'
        ),
        Node(
            package='gaggum',
            node_executable='a_star_local_path',
            node_name='a_star_local_path'
        ),
        Node(
            package='gaggum',
            node_executable='load_map',
            node_name='load_map'
        ),
        Node(
            package='gaggum',
            node_executable='yolov5',
            node_name='yolov5'
        ),
        Node(
            package='gaggum',
            node_executable='tts',
            node_name='tts'
        ),
        Node(
            package='gaggum',
            node_executable='handcontrol',
            node_name='handcontrol'
        ),
    ])



