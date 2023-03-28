import "./Register.style.scss"
import { useState } from "react";
import plantImg from "../../assets/plant/mush.gif";

const RegisterCamera = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창이 열린 상태인지 여부를 관리하는 상태
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
        <button className="camera-button">
          들기
        </button>
        <button className="camera-button">
          놓기
        </button>
        {/* {isModalOpen && <RegisterModal onClose={closeModal} />} */}
      </div>
    </div>
  )
};

export default RegisterCamera;