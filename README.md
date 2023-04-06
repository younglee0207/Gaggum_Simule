# 가꿈 - 스마트홈 IoT 프로젝트

## 🌱 프로젝트 주소 : https://j8b310.p.ssafy.io/

---

## 🌱 소개 영상 보기 : Youtube URL

---

## 🌱 프로젝트 진행 기간

---

2023.02.20 ~ 2023.04.07 (총 7주)

SSAFY 8기 특화 프로젝트

## 🌱 팀원 및 역할

---

![특화프로젝트 팀원](https://user-images.githubusercontent.com/109258146/230269654-b33505f0-a6f7-4940-a1ad-afaa7b744206.png)


## 🌱 프로젝트 개요

---

최근 1인 가구에서 반려식물이 인기를 끌고 있습니다. 그러나 식물은 우리가 생각하는 것보다 매우 민감한 생명체입니다. 적절한 수분과 영양분을 공급받지 못하면 쉽게 질병에 걸리거나 죽을 수 있습니다. 하지만 바쁜 직장인들에게는 식물을 관리할 시간이 부족해서 식물을 키우는 데 실패하는 경우가 있습니다. 이러한 배경을 바탕으로 저희는 식물 자동 관리 서비스, 가꿈을 제작하게 되었습니다.

## 🌱 주요 기능

---

### 집안 내부 탐색을 통한 맵 정보 저장

### 물이 필요한 식물들의 급수 주기를 파악하여 필요한 양만큼 자동 급수

### 정해진 시간에 햇빛이 필요한 식물을 햇빛이 잘 드는 곳으로 이동

---

- 라이더 센서를 이용한 장애물 인식
- A* 알고리즘을 통한 최적 경로 계산(Path Tracking)
- YOLO모델을 사용해서 화분 객체 탐지
- 탐지된 화분 좌표 추정 알고리즘 개발


## 🌱 기술 스택

---

### Front

- Node v18.15.0
- React v18.2.0
- node-sass 8.0
- react-router 6.9.0
- 상태관리 라이브러리
  - recoil v0.7.7
- Socket.io-client v4.6.1
- JSX
- APIs

  - KAKAO MAP API
  - OpenweatherAPI
  - 오늘의 꽃 추천 API

### Back

- Node v18.15.0
- Socket.io v4.6.1
- Express.js v4.18.2

### ROS

- Python v3.7.5
- Python-Socket.io v5.8.0
- YOLO v5
- ROS2 - eloquent(release 2020.01.24)
- opencv-python v4.5.3.56

### DB

- Amazon S3
- MySQL

### CI/CD

- Docker
- Jenkins
- NGINX

## 🌱 산출물

---

### 요구사항 명세서

https://j8b310.notion.site/b656bf777c004df1bd5944334ea15ccf

### ERD

https://j8b310.notion.site/ERD-0e435c2328064d6a87edf7f7517a0196

### API 명세서

https://j8b310.notion.site/API-75fa67f8e514482c8c268dee0517140d

### 와이어 프레임

https://www.figma.com/file/bJj1vEB1RWQ0dVShCkFPyV/B310?node-id=0%3A1&t=Xemtrqym1iqpisXl-1

### 포팅 매뉴얼

https://j8b310.notion.site/8701deb361604d30abb754d51c7c4320

## 🌱 프로젝트 파일 구조

---

### Front

```
📦front
 ┣ 📂node_modules
 ┣ 📂public
 ┃ ┣ 📂icons
 ┣ 📂src
 ┃ ┣ 📂.well-known
 ┃ ┣ 📂api
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📂loading
 ┃ ┃ ┣ 📂logo
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┣ 📂plant
 ┃ ┃ ┣ 📂start
 ┃ ┃ ┗ 📂weather
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂navbar
 ┃ ┃ ┣ 📂scrolltotop
 ┃ ┃ ┗ 📂title
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📂diary
 ┃ ┃ ┣ 📂loading
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┣ 📂plant
 ┃ ┃ ┣ 📂register
 ┃ ┃ ┗ 📂start
 ┃ ┣ 📜App.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜logo.svg
 ┃ ┣ 📜service-worker.js
 ┃ ┣ 📜serviceWorkerRegistration.js
 ┃ ┗ 📜store.js
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜Dockerfile
 ┣ 📜nginx.conf
 ┗ 📜README.md
```

### Back

```
📦back
 ┣ 📂aws
 ┃ ┗ 📜s3.js
 ┣ 📂routes
 ┃ ┣ 📜diary.js
 ┃ ┣ 📜plant.js
 ┃ ┣ 📜turtle.js
 ┃ ┗ 📜user.js
 ┣ 📂servies
 ┃ ┣ 📜db.js
 ┃ ┣ 📜diary.js
 ┃ ┣ 📜plant.js
 ┃ ┣ 📜turtle.js
 ┃ ┗ 📜user.js
 ┣ 📂socket
 ┃ ┗ 📜socket.js
 ┣ 📜.dockerignore
 ┣ 📜.gitignore
 ┣ 📜app.js
 ┣ 📜config.js
 ┣ 📜dockerfile
 ┣ 📜helper.js
 ┣ 📜package-lock.json
 ┗ 📜package.json
```