import "./Register.style.scss";
import { useState } from "react";
import plantImg from "../../assets/plant/mush.gif";
import { BsCameraFill } from "react-icons/bs";

const RegisterCamera = ({ socket }) => {
  const handleLiftUp = () => {
    console.log("들기");
    // Socket 통신으로 들기 명령 보내기
    socket.emit("liftUp", {
      name: "lift up", data: ""
    })
  };

  const handleLiftDown = () => {
    console.log("놓기");
    // Socket 통신으로 놓기 명령 보내기
    socket.emit("liftDown", {
      name: "lift down", data: ""
    })
  };

  const handleCapture = () => {
    console.log("캡쳐");
    // Socket 통신으로 캡쳐 명령 보내기
    socket.emit("capture", {
      name: "capture", data: ""
    })
  };
  return (
    <div className="RegisterCamera">
      {/* 카메라 들어갈 부분 */}
      <div className="camera__container">
        <img className="camera__screen" src={plantImg} />
      </div>
      <div className="camera-buttons">
        <button className="camera-button" onClick={handleLiftUp}>
          들기
        </button>
        <button className="camera-button">
          <BsCameraFill
            size="32"
            className="camera-button__img"
            // color="#022a17"
            onClick={handleCapture}
          />
        </button>
        <button className="camera-button" onClick={handleLiftDown}>
          놓기
        </button>
      </div>
    </div>
  );
};

export default RegisterCamera;
