import React from "react";
import ReactDOM from "react-dom";
import classes from "./WriteModal.module.scss";


const WriteModal = ({ onClose }) => {
//   const handleItemClick = (e) => {
//     onItemClick(e.target.textContent);
//   };

  return ReactDOM.createPortal(
    <div className={classes.modalOverlay} onClick={onClose}>
      <div className={classes.modalContent}>
        <ul>
          <h1 onClick={'#'}>1월</h1>

        </ul>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default WriteModal;
