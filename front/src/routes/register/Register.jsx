import { Link } from "react-router-dom";
import { AiOutlineArrowLeft, AiFillPlusCircle } from "react-icons/ai";
import plantImg from "../../assets/plant/mush.gif";
import classes from "../diary/WriteModal.module.scss";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleLeft,
  FaArrowAltCircleUp,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import { useState } from "react";
import RegisterModal from "./RegisterModal";
const Register = () => {
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
  return (
    <div className="Register">
      <div className="justify" style={{ margin: 16 }}>
        <Link to={"/home"} className="diary-item">
          {/* <FontAwesomeIcon icon={faArrowLeft} size="xl" color="#C1B5A9" /> */}
          <AiOutlineArrowLeft size="24" color="#022a17" />
        </Link>
        <div className="diary-item">
          <h1 style={{ margin: 0 }}>식물 등록하기</h1>
        </div>
        
      </div>
      {/* hr 위로 */}
      <hr style={{ margin: 0 }} />
      {/* hr밑으로 */}
      <div style={{ margin: 16 }}>
        <div
          className="img-div"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img className="img-plant" src={plantImg} alt="식물 사진" />
        </div>

        <div className="justify">
          <button className={classes.registerButton}>
            들기
          </button>

          <div>
            <button className={classes.registerButton} onClick={openModal}>
              놓기
            </button>
            {isModalOpen && <RegisterModal onClose={closeModal} />}
          </div>
        </div>
      </div>
      <div className={classes.controller}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: 26,
          }}
        >
          <FaArrowAltCircleUp size="80" color="#022a17" />
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <FaArrowAltCircleLeft size="80" color="#022a17" />
          <FaArrowAltCircleDown size="80" color="#022a17" />
          <FaArrowAltCircleRight size="80" color="#022a17" />
        </div>
      </div>
    </div>
  );
};

export default Register;
