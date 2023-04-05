from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='gaggum',
            node_executable='socket',
            node_name='socket'
        ),
        Node(
            package='gaggum',
            node_executable='move_turtle',
            node_name='move_turtle'
        ),
    ])



