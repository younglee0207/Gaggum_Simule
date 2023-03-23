import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";
const Modal = ({
  onClose,
  onItemClick,
  GetAllDiaries,
  GetYearDiaries,
}) => {
  const handleItemClick = async (e) => {
    await onItemClick(e.target.textContent);
    await GetYearDiaries();
  };

  const handleYearClick = (e) => {
    GetYearDiaries(e.target.textContent);
    onItemClick(e.target.textContent);

  };
  return ReactDOM.createPortal(
    <div className={classes.modalOverlay} onClick={onClose}>
      <div className={classes.modalContent}>
        <h1 onClick={handleItemClick} >전체보기</h1>
        <h1 onClick={handleYearClick} >2020</h1>
        <h1 onClick={handleYearClick} >2021</h1>
        <h1 onClick={handleYearClick} >2022</h1>
        <h1 onClick={handleYearClick} >2023</h1>
        <h1 onClick={handleYearClick} >2024</h1>

      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
