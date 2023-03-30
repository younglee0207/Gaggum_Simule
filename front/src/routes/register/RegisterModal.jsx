import React, { useState } from "react";
import ReactDOM from "react-dom";
import classes from "../diary/WriteModal.module.scss";
import {
  AiOutlineArrowLeft,
  AiFillPlusCircle,
  AiOutlineClose,
  AiOutlineCheck,
} from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterModal = ({ onClose, setIsModalOpen }) => {

  const [isChecked, setIsChecked] = useState(false);
  const [plantImg, setPlantImg] = useState("")
  const [plantName, setPlantName] = useState("")
  const [plantSpecies, setPlantSpecies] = useState("")
  const [plantLastWateringDate, setPlantLastWateringDate] = useState(null)
  const [plantWateringCycle, setPlantWateringCycle] = useState(null)
  const [plantWateringAmount, setPlantWateringAmount] = useState(null)
  const [plantMemo, setPlantMemo] = useState("")

  const handleRegister = () => {
    // 예외 조건 처리해주기
    const registData = {
      plant_img: plantImg,
      plant_name: plantName,
      plant_species: plantSpecies,
      plant_last_watering_date: plantLastWateringDate,
      plant_watering_cycle: plantWateringCycle,
      plant_watering_amount: plantWateringAmount,
      plant_sunlight: isChecked,
      plant_memo: plantMemo,
      plant_position_x: "0", // 나중에 수정
      plant_position_y: "0" // 나중에 수정
    }
    console.log(registData)
    Swal.fire({
      title: "식물 등록",
      text: "등록 하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: "아니오",
    }).then(() => {
      axios
      .post("https://j8b310.p.ssafy.io/api/plant/create", registData)
      .then(() => {
        setPlantImg("")
        setPlantName("")
        setPlantSpecies("")
        setPlantLastWateringDate(null)
        setPlantWateringCycle(null)
        setPlantWateringAmount(null)
        setPlantMemo("")
        Swal.fire({
          title: "등록 완료",
          text: "등록이 완료되었습니다",
          icon: "success"
        })
        setIsModalOpen(false)
      })
      .catch((error) => {
        console.log(error)
      })
    });


  }

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return ReactDOM.createPortal(
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <div className="justify">
          <AiOutlineClose onClick={onClose} size="24" color="red" />
          <AiOutlineCheck onClick={handleRegister} size="24" color="#022a17" />
        </div>
        <div className={classes.pageTitle}>나의 식물 등록</div>
        <div 
          style={{ display: "flex", justifyContent: "center" }}>
        </div>
        <div className={classes.writeTitle}>식물 이름</div>
        <input
          type="text"
          className={classes.singleLineInput}
          placeholder="식물 이름을 입력하세요"
          onChange={(e) => setPlantName(e.target.value)}
        />
        <div className={classes.writeTitle}>식물 종류</div>
        <input
          type="text"
          className={classes.singleLineInput}
          placeholder="식물 종류를 입력하세요"
          onChange={(e) => setPlantSpecies(e.target.value)}
        />
        <div className={classes.writeTitle}>마지막 급수 날짜</div>
        <input
          type="number"
          className={classes.singleLineInput}
          placeholder="예시: 20230322"
          onChange={(e) => setPlantLastWateringDate(e.target.value)}
        />
        <div className={classes.writeTitle}>급수 주기</div>
        <input
          type="number"
          className={classes.singleLineInput}
          placeholder="예시: 7"
          onChange={(e) => setPlantWateringCycle(e.target.value)}
        />
        <div className={classes.writeTitle}>급수량</div>
        <input
          type="number"
          className={classes.singleLineInput}
          placeholder="예시: 200"
          onChange={(e) => setPlantWateringAmount(e.target.value)}
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
          onChange={(e) => setPlantMemo(e.target.value)}
        />
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default RegisterModal;
