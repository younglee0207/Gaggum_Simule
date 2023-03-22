import "./Diary.scss";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft, AiFillPlusCircle } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import plantImg from "../../assets/plant/mush.gif";
import NavBar from "../../components/navbar/NavBar";

import React, { useState } from "react";
import Modal from "./Modal";
import PlantModal from "./PlantModal";
import WriteModal from "./WriteModal";
import DiaryList from "./DiaryItem";
import axios from "axios";

const dummyData = [
  {
    diary_number: 1,
    diary_img: plantImg,
    diary_title: "주벗",
    plant_species: "버섯",
    plant_diary_writedate: "12월",
    plant_diary_content: "오늘도 잘 자라줘서 고맙다.",
  },
  {
    diary_number: 2,
    diary_img: plantImg,
    diary_title: "주황버섯",
    plant_species: "버섯",
    plant_diary_writedate: "1월",

    plant_diary_content: "오늘도 잘 자라줘서 고맙다.",
  },
  {
    diary_number: 3,
    diary_img: plantImg,
    diary_title: "주?버벗",
    plant_species: "몰?루",
    plant_diary_writedate: "3월",

    plant_diary_content: "오늘도 잘 자라줘서 고맙다.",
  },
  {
    diary_number: 4,
    diary_img: plantImg,
    diary_title: "주?벗방",
    plant_species: "몰?루",
    plant_diary_writedate: "3월",

    plant_diary_content: "오늘도 잘 자라줘서 고맙다.",
  },
  {
    diary_number: 5,
    diary_img: plantImg,
    diary_title: "주?버벗",
    plant_species: "몰?루",
    plant_diary_writedate: "3월",

    plant_diary_content:
      "오늘도 잘 자라줘서 고맙다.오늘도 잘 자라줘서 고맙다.오늘도 잘 자라줘서 고맙다.오늘도 잘 자라줘서 고맙다.오늘도 잘 자라줘서 고맙다.오늘도 잘 자라줘서 고맙다.오늘도 잘 자라줘서 고맙다.",
  },
  {
    diary_number: 7,
    diary_img: plantImg,
    diary_title: "주?버벗",
    plant_species: "몰?루",
    plant_diary_writedate: "3월",

    plant_diary_content: "오늘도 잘 자라줘서 고맙다.",
  },
  {
    diary_number: 6,
    diary_img: plantImg,
    diary_title: "주?버벗",
    plant_species: "몰?루",
    plant_diary_writedate: "3월",

    plant_diary_content: "오늘도 잘 자라줘서 고맙다.",
  },
];

const Diary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창이 열린 상태인지 여부를 관리하는 상태
  const [isPlantModalOpen, setIsPlantModalOpen] = useState(false); // 모달 창이 열린 상태인지 여부를 관리하는 상태
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 모달 창이 열린 상태인지 여부를 관리하는 상태

  const [modalButtonName, setModalButtonName] = useState("월");
  const [modalPlantButtonName, setModalPlantButtonName] = useState("식물이름");

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPlantModal = () => {
    setIsPlantModalOpen(true);
  };
  const closePlantModal = () => {
    setIsPlantModalOpen(false);
  };

  const openWriteModal = () => {
    setIsWriteModalOpen(true);
  };
  const closeWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  const handleItemClick = (itemName) => {
    setModalButtonName(itemName);
    closeModal();
  };
  const handlePlantItemClick = (itemName) => {
    setModalPlantButtonName(itemName);
    closePlantModal();
  };

  const navigate = useNavigate();

  const GetAllDiaries = () => {
    axios
      .get("https://j8b310.p.ssafy.io/api/diary")
      // console.log("성공")
      //replace는 뒤로가기 버튼 비활성 이미 양식 제출했으므로
      .then((response) => {
        // console.log(response);
        //then 대신에 asynce나 await가능
        alert("일지 작성 성공.");
        navigate.replace("/diary");
      })
      .catch((error) => {
        console.log(error);
        alert("작성에 실패하였습니다.");
      });
  };

  return (
    <div className="Diary">
      <div className="justify">
        <div style={{ width: "42px" }}></div>
        <div className="diary-item">
          <h1 style={{ margin: 0 }}>나의 식물 일지</h1>
          <button onClick={GetAllDiaries}>겟</button>
        </div>
        <div>
          {/* <button
            className="diary-item"
            style={{ border: 0 }}
            
          >
            <AiFillPlusCircle size="30" color="#022a17" />
          </button> */}
        </div>
      </div>

      <hr style={{ margin: 0 }} />

      <div className="justify">
        <div>
          <button onClick={openModal} className="diary-button">
            {modalButtonName}
            <MdKeyboardArrowDown />
          </button>
          {isModalOpen && (
            <Modal onClose={closeModal} onItemClick={handleItemClick} />
          )}
        </div>
        <div>
          <button onClick={openModal} className="diary-button">
            {modalButtonName}
            <MdKeyboardArrowDown />
          </button>
          {isModalOpen && (
            <Modal onClose={closeModal} onItemClick={handleItemClick} />
          )}
        </div>
        <div>
          <button onClick={openPlantModal} className="diary-button">
            {modalPlantButtonName}
            <MdKeyboardArrowDown />
          </button>
          {isPlantModalOpen && (
            <PlantModal
              children={dummyData}
              onClose={closePlantModal}
              onItemClick={handlePlantItemClick}
            />
          )}
        </div>
      </div>

      <div className="PlantList content">
        {dummyData
          .filter(
            (item) =>
              (modalButtonName === "월" ||
                item.plant_diary_writedate === modalButtonName ||
                modalButtonName === "전체보기") &&
              (modalPlantButtonName === item.diary_title ||
                modalPlantButtonName === "전체보기" ||
                modalPlantButtonName === "식물이름")
          )
          .map((item) => (
            <div key={item.diary_number}>
              <div className="MyPlantListItem">
                <div className="img-div">
                  <img
                    className="img-plant"
                    src={item.diary_img}
                    alt={item.diary_title}
                  />
                </div>

                <div className="content-div">
                  <p className="plant-name">{item.diary_title}</p>
                  <p>{item.plant_diary_content}</p>
                  <p>{item.plant_diary_writedate}</p>
                </div>
                <div>
                  <button onClick={openWriteModal} className="modify-button">
                    수정
                  </button>
                  {isWriteModalOpen && (
                    <WriteModal onClose={closeWriteModal} item={item} />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Diary;
