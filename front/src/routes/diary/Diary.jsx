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
import ModalMonth from "./ModalMonth";

import PlantModal from "./PlantModal";
import WriteModal from "./WriteModal";
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
  const [isModalMonthOpen, setIsModalMonthOpen] = useState(false); // 모달 창이 열린 상태인지 여부를 관리하는 상태

  const [modalButtonName, setModalButtonName] = useState("");
  const [modalMonthButtonName, setModalMonthButtonName] = useState("");
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
  const openModalMonth = () => {
    setIsModalMonthOpen(true);
  };
  const closeModalMonth = () => {
    setIsModalMonthOpen(false);
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
  const handleMonthItemClick = (itemName) => {
    setModalMonthButtonName(itemName);
    closeModalMonth();
  };
  const navigate = useNavigate();

  const [loadedDiaries, setLoadedDiaries] = useState([]);
  const [loadedPlants, setLoadedPlants] = useState([]);

  const GetAllDiaries = () => {
    axios
      .get("https://j8b310.p.ssafy.io/api/diary")

      .then((response) => {
        console.log("이거", response.data.data);

        setLoadedDiaries(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("로딩에 실패하였습니다.");
      });
  };

  const GetYearDiaries = (year) => {
    console.log(year);
    axios
      .get(`https://j8b310.p.ssafy.io/api/diary/date?diaryDate=${year}`)
      .then((response) => {
        console.log("이거년도", response.data.data);
        setLoadedDiaries(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("로딩에 실패하였습니다.");
      });
  };
  const GetPlants = () => {
    axios
      .get(`https://j8b310.p.ssafy.io/api/plant`)
      .then((response) => {
        const plants = [];
        console.log("이거전체식물", response);
        for (const key in response.data.data) {
          const plant = {
            id: key,
            plant_name: response.data.data[key].plant_name,
          };
          plants.push(plant);
        }
        setLoadedPlants(plants);
      })
      .catch((error) => {
        console.log(error);
        alert("작성에 실패하였습니다.");
      });
  };

  const GetNameDiaries = (plant_name) => {
    axios
      .get(`https://j8b310.p.ssafy.io/api/diary/name?plantName=${plant_name}`)
      .then((response) => {
        console.log("이거전체식물", response);
        setLoadedDiaries(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("작성에 실패하였습니다.");
      });
  };

  const deleteDiary = (number) => {
    console.log('넘버',number)

    const deleteInfo = {
      diary_number: number,
      
    };

    axios
      .post(`https://j8b310.p.ssafy.io/api/diary/delete`,deleteInfo)
      .then((response) => {
        alert("삭제 성공")
      })
      .catch((error) => {
        console.log(error);
        alert("작성에 실패하였습니다.");
      });
  };

  const check = () => {
    console.log(modalButtonName);
  };

  return (
    <div className="Diary">
      <div className="center">
        <div className="diary-item">
          <h1 style={{ margin: 0 }}>나의 식물 일지</h1>
        </div>
        <div>
        </div>
      </div>

      <hr style={{ margin: 0 }} />

      {/* 모달 관리 */}
      <div className="justify">
        <div>
          <button onClick={openModal} className="diary-button">
            {modalButtonName}년
            <MdKeyboardArrowDown />
          </button>
          {isModalOpen && (
            <Modal
              onClose={closeModal}
              onItemClick={handleItemClick}
              GetAllDiaries={GetAllDiaries}
              GetYearDiaries={GetYearDiaries}
              check={false}
            />
          )}
        </div>
        <div>
          <button onClick={openModalMonth} className="diary-button">
            {modalMonthButtonName}월
            <MdKeyboardArrowDown />
          </button>
          {isModalMonthOpen && (
            <ModalMonth
              onClose={closeModalMonth}
              onItemClick={handleMonthItemClick}
              GetAllDiaries={GetAllDiaries}
              GetYearDiaries={GetYearDiaries}
              check={true}
            />
          )}
        </div>
        <div>
          <button
            onClick={() => {
              openPlantModal();
              GetPlants();
            }}
            className="diary-button"
          >
            {modalPlantButtonName}
            <MdKeyboardArrowDown />
          </button>
          {isPlantModalOpen && (
            <PlantModal
              children={loadedPlants}
              onClose={closePlantModal}
              onItemClick={handlePlantItemClick}
              GetNameDiaries={GetNameDiaries}
              GetAllDiaries={GetAllDiaries}

            />
          )}
        </div>
      </div>

      {/* 일지 보이는 곳 */}
      <div className="PlantList content">
        {loadedDiaries
          // .filter(
          //   (item) =>
          //     (modalButtonName === "월" ||
          //       item.plant_diary_writedate === modalButtonName ||
          //       modalButtonName === "전체보기") &&
          //     (modalPlantButtonName === item.diary_title ||
          //       modalPlantButtonName === "전체보기" ||
          //       modalPlantButtonName === "식물이름")
          // )
          .map((item) => (
            <div key={item.diary_number}>
              <div className="MyPlantListItem">
                <div className="img-div">
                  <img
                    className="img-plant"
                    // src={item.diary_img}
                    src={plantImg}
                    alt="이미지 로딩 실패"
                  />
                </div>

                <div className="content-div">
                  <p className="flex">{item.diary_title}</p>
                  <p className="flex">{item.diary_memo}</p>
                  <p className="flex">{item.diary_date.substr(0, 10)}</p>
                </div>
                <div>
                  <button onClick={openWriteModal} className="modify-button">
                    수정
                  </button>
                  {isWriteModalOpen && (
                    <WriteModal
                      onClose={closeWriteModal}
                      item={item}
                      GetAllDiaries={GetAllDiaries}
                      GetNameDiaries={GetNameDiaries}
                      GetYearDiaries={GetYearDiaries}
                    />
                  )}
                  <button>삭제</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Diary;
