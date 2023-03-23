import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";
const ModalMonth = ({ onClose, onItemClick, GetAllDiaries, GetYearDiaries }) => {
  const handleItemClick = async (e) => {
    await onItemClick(e.target.textContent);
    await GetYearDiaries();
  };

  const handleYearClick = (e) => {
    GetYearDiaries(`2023-0${e.target.textContent}`)
    onItemClick(e.target.textContent);

  }

  return ReactDOM.createPortal(
    <div className={classes.modalOverlay} onClick={onClose}>
      <div className={classes.modalContent}>
        <h1 onClick={handleItemClick}>전체보기</h1>
        <h1 onClick={handleYearClick}>1</h1>
        <h1 onClick={handleYearClick}>2</h1>
        <h1 onClick={handleYearClick}>3</h1>
        <h1 onClick={handleYearClick}>4</h1>
        <h1 onClick={handleYearClick}>5</h1>
        <h1 onClick={handleYearClick}>6</h1>
        <h1 onClick={handleYearClick}>7</h1>
        <h1 onClick={handleYearClick}>8</h1>
        <h1 onClick={handleYearClick}>9</h1>
        <h1 onClick={handleYearClick}>10</h1>
        <h1 onClick={handleYearClick}>11</h1>
        <h1 onClick={handleYearClick}>12</h1>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalMonth;
