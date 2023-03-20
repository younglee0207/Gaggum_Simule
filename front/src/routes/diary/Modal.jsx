import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";
const Modal = ({ onClose, onItemClick }) => {
  const handleItemClick = (e) => {
    onItemClick(e.target.textContent);
  };

  return ReactDOM.createPortal(
    <div className={classes.modalOverlay} onClick={onClose}>
      <div className={classes.modalContent}>
        <ul>
          <h1 onClick={handleItemClick}>1월</h1>
          <h1 onClick={handleItemClick}>2월</h1>
          <h1 onClick={handleItemClick}>3월</h1>
          <h1 onClick={handleItemClick}>4월</h1>
          <h1 onClick={handleItemClick}>5월</h1>
          <h1 onClick={handleItemClick}>6월</h1>
          <h1 onClick={handleItemClick}>7월</h1>
          <h1 onClick={handleItemClick}>8월</h1>
          <h1 onClick={handleItemClick}>9월</h1>
          <h1 onClick={handleItemClick}>10월</h1>
          <h1 onClick={handleItemClick}>11월</h1>
          <h1 onClick={handleItemClick}>12월</h1>
        </ul>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
