import "./Register.style.scss"
import { useState } from "react";
import plantImg from "../../assets/plant/mush.gif";

const RegisterCamera = () => {

  const handleLift = () => {
    console.log("들기")
    // Socket 통신으로 들기 명령 보내기
  };

  const handlePutDown = () => {
    console.log("놓기")
    // Socket 통신으로 놓기 명령 보내기
  };

  return (
    <div className="RegisterCamera">
      {/* 카메라 들어갈 부분 */}
      <div className="camera__container">
        <img
          className="camera__screen"
          src={plantImg}
        />
      </div>
      <div className="camera-buttons">
        <button 
          className="camera-button"
          onClick={handleLift}
        >들기</button>
        <button 
          className="camera-button"
          onClick={handlePutDown}
        >놓기</button>
      </div>
    </div>
  )
};

export default RegisterCamera;