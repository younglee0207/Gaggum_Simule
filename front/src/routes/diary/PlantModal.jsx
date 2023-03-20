import React from "react";
import ReactDOM from "react-dom";
// import "./Modal.module.scss";

const PlantModal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default PlantModal;