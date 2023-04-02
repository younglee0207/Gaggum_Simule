import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";
const ModalMonth = ({
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
    GetAllDiaries();
  };

  const handleMonthClick = (e) => {
    GetYearDiaries(`2023-0${e.target.textContent}`);
    onItemClick(`${e.target.textContent}월`);
  };

  return ReactDOM.createPortal(
    <div className={classes.modalOverlay} onClick={onClose}>
      <div className={classes.modalContent}>
        <h1 onClick={handleAllItemClick}>전체보기</h1>
        <hr/>
        <h1 onClick={handleMonthClick}>1</h1>
        <hr/>
        <h1 onClick={handleMonthClick}>2</h1>
        <hr/>
        <h1 onClick={handleMonthClick}>3</h1>
        <hr/>
        <h1 onClick={handleMonthClick}>4</h1>
        <hr/>
        <h1 onClick={handleMonthClick}>5</h1>
        <hr/>
        <h1 onClick={handleMonthClick}>6</h1>
        <hr/>
        <h1 onClick={handleMonthClick}>7</h1>
        <hr/>
        <h1 onClick={handleMonthClick}>8</h1>
        <hr/>
        <h1 onClick={handleMonthClick}>9</h1>
        <hr/>
        <h1 onClick={handleMonthClick}>10</h1>
        <hr/>
        <h1 onClick={handleMonthClick}>11</h1>
        <hr/>
        <h1 onClick={handleMonthClick}>12</h1>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalMonth;
