const express = require("express");
const app = express();
const plants = require("../servies/plant");
// 로직 1. WebSocket 서버, WebClient 통신 규약 정의
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://j8b310.p.ssafy.io:3001",
      "http://j8b310.p.ssafy.io",
      "http://localhost:8080",
      "http://localhost:3001",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
});

// 로직 2. 포트번호 지정
function socketStart() {
  const port1 = process.env.port || 3001;

  server.listen(port1, () => {
    console.log(`listening on *:${port1}`);
  });

  // 터틀봇의 소켓 이름.
  const roomName = "team";

  io.on("connection", (socket) => {
    socket.join(roomName);

    console.log("connected from server");

    // 로직 3. 사용자의 메시지 수신시 WebClient로 메시지 전달
    socket.on("run_mapping", (message) => {
      socket.to(roomName).emit("run_mapping", message);
      // socket.emit("safety_status", message);
      console.log("run_mapping", message);
    });

    // 시뮬레이터 환경변수(시간, 날씨), 로봇 위치 정보 전달(백 -> ROS)
    socket.on("simulator_info", (data) => {
      console.log("simulator_info", data);
      // 프론트 페이지로 simulator 전달
      // socket.to(roomName).emit("simulator_info", data);

      //현재 시간이 물주는 시간인지 체크
      if (data.environment.hour == 13) {
        (async () => {
          // db에서 물줘야하는 식물 리스트 가져오기
          let waterNeedPlants = await plants.getWaterNeedPlant2();
          console.log("물줘야하는 식물들", waterNeedPlants);
          waterNeedPlants.mode = 100;
          // ROS로 급수 필요 식물 리스트 전달
          socket.emit("auto_move", waterNeedPlants);
        })();
      }else if(data.environment.hour == 15 ){
        (async () => {
          // db에서 햇빛이 필요한 식물과 햇빛 위치를 가져오기
          let sunNeedPlants = await plants.SunNeedPlant();
          let sunSpots = await plants.getSunSpot();
          console.log("햇빛 필요 식물들", sunNeedPlants);
          sunNeedPlants.mode = 200;
          sunNeedPlants.sunSpots = sunSpots;
          // ROS로 급수 필요 식물 리스트 전달
          socket.emit("auto_move", sunNeedPlants);
        })();
      }
    });
    auto_move.data[1].plant_number
    auto_move.mode
    auto_move.sunspot.data[1].sunspot_x_position

    // 터틀봇 수동조작 파트 앞, 뒤, 오른쪽, 왼쪽
    socket.on("go_straight", (data) => {
      socket.to(roomName).emit("go_straight", data);
      console.log("앞");
    });

    socket.on("go_back", (data) => {
      socket.to(roomName).emit("go_back", data);
      console.log("뒤");
    });

    socket.on("go_left", (data) => {
      socket.to(roomName).emit("go_left", data);
      console.log("왼쪽");
    });

    socket.on("go_right", (data) => {
      socket.to(roomName).emit("go_right", data);
      console.log("오른쪽");
    });

    socket.on("disconnect", () => {
      console.log("disconnected from server");
    });

    // // 전달받은 이미지를 jpg 파일로 저장
    // socket.on('streaming', (message) => {
    //     socket.to(roomName).emit('sendStreaming', message);
    //     // console.log(message);
    //     buffer = Buffer.from(message, "base64");
    //     fs.writeFileSync(path.join(picPath, "/../client/cam.jpg"), buffer);
    // });
  });
}

module.exports = {
  socketStart,
};
