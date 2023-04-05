import React, { useState } from "react";
import ReactDOM from "react-dom";
import classes from "../diary/WriteModal.module.scss";
import {
  AiOutlineClose,
  AiOutlineCheck,
} from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { ros2frontData } from "../../store";
import logoImg from "../../assets/logo/maskable_icon_x192_logo.png"

const RegisterModal = ({ onClose, setIsModalOpen }) => {

  // const [plantImg, setPlantImg] = useState("")
  const [registedData, setRegistedData] = useRecoilState(ros2frontData)
  const [isChecked, setIsChecked] = useState(false);
  const [plantName, setPlantName] = useState("")
  const [plantSpecies, setPlantSpecies] = useState("")
  const [plantLastWateringDate, setPlantLastWateringDate] = useState("")
  const [plantWateringCycle, setPlantWateringCycle] = useState(0)
  const [plantWateringAmount, setPlantWateringAmount] = useState(0)
  const [plantMemo, setPlantMemo] = useState("")

  const handleRegister = () => {
    if (!plantName) {
      Swal.fire(
        "오류","식물 이름을 입력해주세요.", "error"
      )
    } else if (plantName.length > 8) {
      Swal.fire(
        "오류", "식물 이름은 8글자 이하로 입력해주세요.", "error"
      )
    } else if (!plantSpecies) {
      Swal.fire(
        "오류", "식물 종류를 입력해주세요.", "error"
      )
    } else if (plantSpecies.length > 10) {
      Swal.fire(
        "오류", "식물 종류는 10글자 이하로 입력해주세요.", "error"
      )
    } else if (!plantLastWateringDate) {
      Swal.fire(
        "오류", "마지막 급수 날짜를 입력해주세요.", "error"
      )
    } else if (plantLastWateringDate.length !== 8) {
      Swal.fire(
        "오류 ", "마지막 급수 날짜를 주어진 예시에 맞게 입력해주세요.", "error"
      )
    } else if (!plantWateringCycle) {
      Swal.fire(
        "오류", "급수 주기를 입력해주세요.", "error"
      )
    } else if (plantWateringCycle > 365) {
      Swal.fire(
        "오류", "급수 주기는 1년을 넘을 수 없습니다.", "error"
      )
    } else if (!plantWateringAmount) {
      Swal.fire(
        "오류", "급수량을 입력해주세요.", "error"
      )
    } else if (plantWateringAmount > 500) {
      Swal.fire(
        "오류", "급수량은 500ml을 넘을 수 없습니다.", "error"
      )
    } else if (!plantMemo) {
      Swal.fire(
        "오류", "메모를 입력해주세요.", "error"
      )
    } else if (plantMemo.length > 50) {
      Swal.fire(
        "오류", "메모는 50글자 까지만 입력 가능합니다.", "error"
      )
    } else {
      const registData = {
        plant_img: registedData ? registedData.plant_img : logoImg,
        plant_name: plantName,
        plant_species: plantSpecies,
        plant_last_watering_date: plantLastWateringDate,
        plant_watering_cycle: plantWateringCycle,
        plant_watering_amount: plantWateringAmount,
        plant_sunlight: isChecked,
        plant_memo: plantMemo,
        plant_position_x: registedData ? registedData.plant_position_x : 0, // 나중에 수정
        plant_position_y: registedData ? registedData.plant_position_y : 0,
        plant_original_name: registedData && registedData.plant_original_name !== "none" ? registedData.plant_original_name : ""
      }
      console.log(registData)
  
      Swal.fire({
        title: "식물 등록",
        text: "등록 하시겠습니까?",
        showDenyButton: true,
        confirmButtonText: "네",
        denyButtonText: "아니오",
      }).then((res) => {
        if (res.isConfirmed) {
          axios
          .post("https://j8b310.p.ssafy.io/api/plant/create", registData)
          .then(() => {
            // setPlantImg("")
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
        } 
      });
    }
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
        <div className={classes.writeTitle}>마지막 급수 날짜(연, 월, 일)</div>
        <input
          type="number"
          className={classes.singleLineInput}
          placeholder="예시: 20230322"
          onChange={(e) => setPlantLastWateringDate(e.target.value)}
        />
        <div className={classes.writeTitle}>급수 주기(일)</div>
        <input
          type="number"
          className={classes.singleLineInput}
          placeholder="예시: 7"
          onChange={(e) => setPlantWateringCycle(e.target.value)}
        />
        <div className={classes.writeTitle}>급수량(ml)</div>
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
