import Reac, { useState } from "react";
import ReactDOM from "react-dom";
import classes from "./WriteModal.module.scss";
import {
  AiOutlineArrowLeft,
  AiFillPlusCircle,
  AiOutlineClose,
  AiOutlineCheck,
} from "react-icons/ai";
import plantImg from "../../assets/plant/mokoko_01.gif";
import { useNavigate } from "react-router-dom"; //dom 아닌가?
import axios from "axios";
import { useRef } from "react";

const WriteModal = ({ onClose }) => {
  //   const handleItemClick = (e) => {
  //     onItemClick(e.target.textContent);
  //   };
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const contentInputRef = useRef();
  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    const enteredContent = contentInputRef.current.value;

    const userInfo = {
      diaryContent: enteredContent,
      // noticeWriteDateTime: "2023-02-07T05:23:54.712Z",
      diaryCategory: 2,
      accountNo: localStorage.getItem("accountNo"),
      // noticeId: Id,
    };
    console.log(userInfo);
    // props.onAddInfo(userInfo);

    axios
      .post("https://i8b201.p.ssafy.io/backend/notice/write", userInfo)
      // console.log("성공")
      //replace는 뒤로가기 버튼 비활성 이미 양식 제출했으므로
      .then((response) => {
        console.log(response);
        //then 대신에 asynce나 await가능
        alert("일지 작성 성공.");
        navigate.replace("/diary");
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

          <AiOutlineCheck onClick={onClose} size="24" color="#022a17" />
        </div>
        <div className={classes.writeTitle}>식물 일지 등록</div>

        <img className="img-plant" src={plantImg} alt="식물 사진" />

        <div className={classes.writeTitle}>메모</div>

        {/* <div className={classes.note}>
          <textarea
            placeholder="메모를 입력해주세요"
            type="text"
            ref={contentInputRef}
            className={classes.note__textarea}
            // required
            // id="content"
          />
        </div> */}

        <div className="note">
          <textarea
            value={text}
            onChange={handleChange}
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
            placeholder="Write your note here"
          />
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default WriteModal;
