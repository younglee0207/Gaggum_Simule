from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='gaggum',
            node_executable='run_mapping',
            node_name='run_mapping'
        ),
        Node(
            package='gaggum',
            node_executable='wall_tracking',
            node_name='wall_tracking'
        ),
    ])