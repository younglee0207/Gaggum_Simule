import "./Diary.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft, AiFillPlusCircle } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

import React, { useState } from "react";
import Modal from "./Modal";
import PlantModal from "./PlantModal";
import WriteModal from "./WriteModal";

const Diary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창이 열린 상태인지 여부를 관리하는 상태
  const [isPlantModalOpen, setIsPlantModalOpen] = useState(false); // 모달 창이 열린 상태인지 여부를 관리하는 상태
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 모달 창이 열린 상태인지 여부를 관리하는 상태

  const [modalButtonName, setModalButtonName] = useState("1월");
  const [modalPlantButtonName, setModalPlantButtonName] = useState("1월");

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
    // <div className="content">
    <div className="Diary">
      <div className="justify">
        <Link to={"/"} className="diary-item">
          {/* <FontAwesomeIcon icon={faArrowLeft} size="xl" color="#C1B5A9" /> */}
          <AiOutlineArrowLeft size="24" color="#022a17" />
        </Link>
        <div className="diary-item">
          <h1 style={{ margin: 0 }}>xx님의 식물 일지</h1>
        </div>
        <div>
          <button
            className="diary-item"
            style={{ border: 0 }}
            onClick={openWriteModal}
          >
            <AiFillPlusCircle size="30" color="#022a17" />
          </button>
          {isWriteModalOpen && (
            <WriteModal onClose={closeWriteModal} />
          )}
        </div>
      </div>

      <hr style={{ marginTop: 16 }} />

      <div className="justify">
        <div>
          <button onClick={openModal}>
            {modalButtonName}
            <MdKeyboardArrowDown />
          </button>
          {isModalOpen && (
            <Modal onClose={closeModal} onItemClick={handleItemClick} />
          )}
        </div>

        <div>
          <button onClick={openPlantModal}>
            {modalPlantButtonName}
            <MdKeyboardArrowDown />
          </button>
          {isPlantModalOpen && (
            <PlantModal
              children={'ab'}
              onClose={closePlantModal}
              onItemClick={handlePlantItemClick}
            />
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Diary;
