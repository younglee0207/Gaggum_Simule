import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";
const Modal = ({
  onClose,
  onItemClick,
  GetAllDiaries,
  GetYearDiaries,
}) => {
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
    onItemClick(`${e.target.textContent}`)
    GetAllDiaries()
  }

  const handleYearClick = (e) => {
    GetYearDiaries(e.target.textContent);
    onItemClick(`${e.target.textContent}년`);

  };
  return ReactDOM.createPortal(
    <div className={classes.modalOverlay} onClick={onClose}>
      <div className={classes.modalContent}>
        <h1 onClick={handleAllItemClick} >전체보기</h1>
        <hr/>
        <h1 onClick={handleYearClick} >2020</h1>
        <hr/>
        <h1 onClick={handleYearClick} >2021</h1>
        <hr/>
        <h1 onClick={handleYearClick} >2022</h1>
        <hr/>
        <h1 onClick={handleYearClick} >2023</h1>
        <hr/>
        <h1 onClick={handleYearClick} >2024</h1>

      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
