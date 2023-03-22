import React, { useState } from "react";
import ReactDOM from "react-dom";
import classes from "../diary/WriteModal.module.scss";
import {
  AiOutlineArrowLeft,
  AiFillPlusCircle,
  AiOutlineClose,
  AiOutlineCheck,
} from "react-icons/ai";
import plantImg from "../../assets/plant/mokoko_01.gif";

const RegisterModal = ({ onClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  return ReactDOM.createPortal(
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <div className="justify">
          <AiOutlineClose onClick={onClose} size="24" color="#022a17" />

          <AiOutlineCheck onClick={onClose} size="24" color="#022a17" />
        </div>
        <div className={classes.pageTitle}>나의 식물 등록</div>

        <img className="img-plant" src={plantImg} alt="식물 사진" />

        <div className={classes.writeTitle}>식물 이름</div>
        <input
          type="text"
          className={classes.singleLineInput}
          placeholder="식물 이름을 입력하세요"
        />
        <div className={classes.writeTitle}>식물 종류</div>
        <input
          type="text"
          className={classes.singleLineInput}
          placeholder="식물 종류를 입력하세요"
        />
        <div className={classes.writeTitle}>마지막 급수 날짜</div>
        <input
          type="number"
          className={classes.singleLineInput}
          placeholder="예시: 20230322"
        />
        <div className={classes.writeTitle}>급수 주기</div>
        <input
          type="number"
          className={classes.singleLineInput}
          placeholder="예시: 7"
        />
        <div className={classes.writeTitle}>급수량</div>
        <input
          type="number"
          className={classes.singleLineInput}
          placeholder="예시: 200"
        />
        <div className={classes.writeTitle}>햇빛 필요 여부</div>
        
        <label className={classes.customCheckbox}>
          <input
            type="checkbox"
            name="exampleCheckbox"
            value="exampleValue"
            checked={isChecked}
            onChange={handleCheckboxChange}
            style={{margin:10}}
          />
        </label>

        <div className={classes.writeTitle}>메모</div>
        <input
          type="text"
          className={classes.singleLineInput}
          placeholder="예시 : 주의사항, 효과 등"
        />
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default RegisterModal;
