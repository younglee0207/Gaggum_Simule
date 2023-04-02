import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";

const PlantModal = ({ onClose, children, onItemClick, GetNameDiaries, GetAllDiaries }) => {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const handleAllItemClick = (e) => {
    onItemClick(e.target.textContent)
    GetAllDiaries()
    onClose()
  }

  const handlePlantItemClick = (e) => {
    
    onItemClick(e.target.textContent);
    GetNameDiaries(e.target.textContent)
  };
  return ReactDOM.createPortal(
    <div className={classes.modalOverlay} onClick={onClose}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 onClick={handleAllItemClick}>전체보기</h1>
        {children
          .reduce((unique, item) => {
            if (!unique.some((u) => u.plant_name === item.plant_name)) {
              unique.push(item);
            }
            return unique;
          }, [])
          .map((item) => (
            <div key={item.id}>
              <hr />
              <h1 onClick={handlePlantItemClick}>
                {item.plant_name}
              </h1>
            </div>
          ))}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default PlantModal;
