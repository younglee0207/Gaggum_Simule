import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiFillCheckCircle } from "react-icons/ai";
import Swal from "sweetalert2";

import { useState } from "react";
import RegisterModal from "./RegisterModal";
import "./Register.style.scss";
import RegisterCamera from "./RegisterCamera";
import RegisterController from "./RegisterController";

import { io } from "socket.io-client";
import { useRecoilState } from "recoil";

import { ros2frontData } from "../../store";

// 나중에 배포 주소로 바꿔주기
// const socket = io("ws://localhost:3001");
const socket = io("https://j8b310.p.ssafy.io");

const Register = () => {
  const [cameraData, setCameraData] = useRecoilState(ros2frontData)
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창이 열린 상태인지 여부를 관리하는 상태
  // const [isRegist, setIsRegist] = useState(false);
  
  // const [registData, setRegistData] = useRecoilState(ros2frontData)

  const closeModal = () => {
    Swal.fire({
      title: "등록 취소",
      text: "등록을 취소하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: "아니오",
    }).then((res) => {
      if (res.isConfirmed) {
        setIsModalOpen(false);
      }
    });
  };

  // const handleItemClick = (itemName) => {
  //   setModalButtonName(itemName);
  //   closeModal();
  // };

  const handleCancel = () => {
    Swal.fire({
      title: "등록 취소",
      text: "등록을 취소하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: "아니오",
    }).then((res) => {
      if (res.isConfirmed) {
        navigate("/home");
      }
    });
  };

  const handleRegist = () => {
    Swal.fire({
      title: "등록 확인",
      text: "식물을 등록하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: "아니오",
    }).then((res) => {
      if (res.isConfirmed) {
        // 등록 하기
        // if (!cameraData || cameraData.plant_original_name === "none") {
        //   Swal.fire(
        //     "식물 인식 불가",
        //     "가운데에 화분을 놓고 다시 찍어주세요.",
        //     "error"
        //   )
        // } else {
        //   // 모달 띄우기
        //   setRegistData(cameraData)
        //   setIsModalOpen(true);
        // }
        setIsModalOpen(true)
      }
    });

    // 눌렀을 때 사진찍기 -> 자동으로 이동하여 사진 찍게하기
  };

  return (
    <div className="Register">
      <div className="register__header">
        <div className="register__header__back">
          <AiOutlineArrowLeft
            size="32"
            color="#022a17"
            onClick={handleCancel}
          />
        </div>
        <h2 className="register__header__title">식물 등록</h2>
        <div className="register__header__regist">
          <AiFillCheckCircle size="32" color="#022a17" onClick={handleRegist} />
        </div>
      </div>
      {/* hr 위로 */}
      <hr />
      {/* hr밑으로 */}
      <RegisterCamera setCameraData={setCameraData} socket={socket} />
      <RegisterController socket={socket} />
      {isModalOpen && <RegisterModal onClose={closeModal} setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Register;
