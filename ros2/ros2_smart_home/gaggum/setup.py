from setuptools import setup

package_name = 'gaggum'

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
    maintainer='SSAFY',
    maintainer_email='chl7tkd4@naver.com',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'ex_calib = gaggum.ex_calib:main',
            'yolov5 = gaggum.yolov5:main',
        ],
    },
)
