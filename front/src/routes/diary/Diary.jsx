import "./Diary.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft, AiFillPlusCircle } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import plantImg from "../../assets/plant/mokoko_01.gif";
import NavBar from "../../components/navbar/NavBar";

import React, { useState } from "react";
import Modal from "./Modal";
import PlantModal from "./PlantModal";
import WriteModal from "./WriteModal";
// import DiaryList from "./DiaryList";

const dummyData = [
  {
    id: 1,
    plant_img: plantImg,
    plant_name: "모코코",
    plant_species: "새싹",
    plant_diary_writedate: "12월",
    plant_diary_content: "오늘도 잘 자라줘서 고맙다.",
  },
  {
    id: 2,
    plant_img: plantImg,
    plant_name: "몰?코코",
    plant_species: "몰?코",
    plant_diary_writedate: "1월",

    plant_diary_content: "오늘도 잘 자라줘서 고맙다.",
  },
  {
    id: 3,
    plant_img: plantImg,
    plant_name: "몰?로코",
    plant_species: "몰?루",
    plant_diary_writedate: "3월",

    plant_diary_content: "오늘도 잘 자라줘서 고맙다.",
  },
  {
    id: 4,
    plant_img: plantImg,
    plant_name: "몰?로코",
    plant_species: "몰?루",
    plant_diary_writedate: "3월",

    plant_diary_content: "오늘도 잘 자라줘서 고맙다.",
  },
  {
    id: 5,
    plant_img: plantImg,
    plant_name: "몰?로코",
    plant_species: "몰?루",
    plant_diary_writedate: "3월",

    plant_diary_content:
      "오늘도 잘 자라줘서 고맙다.오늘도 잘 자라줘서 고맙다.오늘도 잘 자라줘서 고맙다.오늘도 잘 자라줘서 고맙다.오늘도 잘 자라줘서 고맙다.오늘도 잘 자라줘서 고맙다.오늘도 잘 자라줘서 고맙다.",
  },
  {
    id: 7,
    plant_img: plantImg,
    plant_name: "몰?로코",
    plant_species: "몰?루",
    plant_diary_writedate: "3월",

    plant_diary_content: "오늘도 잘 자라줘서 고맙다.",
  },
  {
    id: 6,
    plant_img: plantImg,
    plant_name: "몰?로코",
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

  return (
    <div className="Diary">
      <div className="justify">
        <div style={{ width: "42px" }}></div>
        <div className="diary-item">
          <h1 style={{ margin: 0 }}>나의 식물 일지</h1>
        </div>
        <div>
          <button
            className="diary-item"
            style={{ border: 0 }}
            onClick={openWriteModal}
          >
            <AiFillPlusCircle size="30" color="#022a17" />
          </button>
          {isWriteModalOpen && <WriteModal onClose={closeWriteModal} />}
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
              (modalPlantButtonName === item.plant_name ||
                modalPlantButtonName === "전체보기" ||
                modalPlantButtonName === "식물이름")
          )
          .map((item) => (
            <div key={item.id}>
              <div className="MyPlantListItem">
                <div className="img-div">
                  <img
                    className="img-plant"
                    src={item.plant_img}
                    alt={item.plant_name}
                  />
                </div>

                <div className="content-div">
                  <p className="plant-name">{item.plant_name}</p>
                  <p>{item.plant_diary_content}</p>
                  <p>{item.plant_diary_writedate}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Diary;
