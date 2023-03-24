import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiFillCheckCircle } from "react-icons/ai";
import classes from "../diary/WriteModal.module.scss";

import { useState } from "react";
import RegisterModal from "./RegisterModal";
import "./Register.style.scss"
import RegisterCamera from "./RegisterCamera";
import RegisterController from "./RegisterController";

const Register = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창이 열린 상태인지 여부를 관리하는 상태
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const handleItemClick = (itemName) => {
  //   setModalButtonName(itemName);
  //   closeModal();
  // };

  const handleRegist = () => {
    console.log("regist")
  }
  return (
    <div className="Register">
      <div className="register__header">
        <div className="register__header__back">
          <AiOutlineArrowLeft 
            size="32" 
            color="#022a17"
            onClick={() => navigate("/home")}
          />
        </div>
        <h2 className="register__header__title">식물 등록</h2>
        <div className="register__header__regist">
          <AiFillCheckCircle 
            size="32"
            color="#022a17"
            onClick={handleRegist}
          />
        </div>
      </div>
      {/* hr 위로 */}
      <hr />
      {/* hr밑으로 */}
      <RegisterCamera />
      <RegisterController />
    </div>
  );
};

export default Register;
