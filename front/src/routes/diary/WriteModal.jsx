//수정모달입니다. 이름만 Write임


import { useState } from "react";
import ReactDOM from "react-dom";
import classes from "./WriteModal.module.scss";
import {
  AiOutlineClose,
  AiOutlineCheck,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import client from "../../api/client";

const WriteModal = ({ onClose, onSubmit, item, GetNameDiaries, GetYearDiaries }) => {
  // console.log('이건 다이어리 넘버',item.diary_number)
  const handleItemClick = () => {
    if (item.plant_name) {
      GetNameDiaries(item.plant_name);
    } else {
      GetYearDiaries(item.diary_date.substr(0, 7));
    }
  }; 
  //수정 후 일지 초기화
  // console.log("수정아이템", item.diary_date.substr(0, 7));
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const contentInputRef = useRef();
  const titleInputRef = useRef();
  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    const enteredContent = contentInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;

    const diaryInfo = {
      diary_number: item.diary_number,
      diary_title: enteredTitle,
      diary_memo: enteredContent,
    };
    // props.onAddInfo(userInfo);

    client
      .post("diary/edit", diaryInfo)
      .then((response) => {
        handleItemClick();
        onSubmit();
      })
      .catch((error) => {
        console.log(error);
        alert("작성에 실패하였습니다.");
      });
  }

  return ReactDOM.createPortal(
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <div className="justify">
          <AiOutlineClose onClick={onClose} size="24" color="#022a17" />

          <AiOutlineCheck onClick={submitHandler} size="24" color="#022a17" />
        </div>
        <div className={classes.pageTitle}>식물 일지 수정</div>

        <img className="img-plant" src={item.diary_img} alt="식물 사진" />

        <div className={classes.writeTitle}>제목</div>

        <div className={classes.note}>
          <textarea
            defaultValue={item.diary_title}
            ref={titleInputRef}
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
              backgroundSize: "100% 1.2em",
              lineHeight: "1.2em",
              padding: "0.6em",
              paddingTop: "0",
              resize: "none",
              width: "100%",
              height: "43px",
              border: "1px solid #ccc",
              fontFamily: "monospace",
              fontSize: "24px",
              fontWeight: "bold",
              overflow: "auto",
            }}
          />
        </div>
        <div className={classes.writeTitle}>메모</div>
        <div className={classes.note}>
          <textarea
            // value={text}
            defaultValue={item.diary_memo}
            onChange={handleChange}
            ref={contentInputRef}
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
              backgroundSize: "100% 1.2em",
              lineHeight: "1.2em",
              padding: "0.6em",
              paddingTop: "0",
              resize: "none",
              width: "100%",
              height: "300px",
              border: "1px solid #ccc",
              fontFamily: "monospace",
              fontSize: "24px",
              fontWeight: "bold",
              overflow: "auto",
            }}
            className="note__textarea"
          />
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default WriteModal;
