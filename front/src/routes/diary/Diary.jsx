import "./Diary.scss";
import { useLocation, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { MdKeyboardArrowDown } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ModalMonth from "./ModalMonth";

import PlantModal from "./PlantModal";
import WriteModal from "./WriteModal";
import Swal from "sweetalert2";
import client from "../../api/client";

const Diary = () => {
  
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창이 열린 상태인지 여부를 관리하는 상태
  const [isPlantModalOpen, setIsPlantModalOpen] = useState(false); // 모달 창이 열린 상태인지 여부를 관리하는 상태
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 모달 창이 열린 상태인지 여부를 관리하는 상태
  const [isModalMonthOpen, setIsModalMonthOpen] = useState(false); // 모달 창이 열린 상태인지 여부를 관리하는 상태
  const [modalButtonName, setModalButtonName] = useState("년");
  const [modalMonthButtonName, setModalMonthButtonName] = useState("월");
  const [modalPlantButtonName, setModalPlantButtonName] = useState("식물이름");

  const [selectedDiary, setSelectedDiary] = useState(null);
  const diaryImg = "https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/planticon.png"

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

  const handleCloseModal = () => {
    Swal.fire({
      title: "수정 취소",
      text: "수정을 취소하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: "아니요",
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire("수정이 취소되었습니다", "", "success")
        setSelectedDiary(null)
      }
    })
  };

  const handleSubmitModal = () => {
    Swal.fire({
      title: "수정 확인",
      text: "수정하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: "아니요",
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire("수정이 완료되었습니다", "", "success")
        setSelectedDiary(null)
      }
    })
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
    client
      .get("diary")
      .then((response) => {
        // console.log("이거", response.data.data);
        setLoadedDiaries(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("로딩에 실패하였습니다.");
      });
  };
  useEffect(() => {
    if (location.state) {
      GetNameDiaries(location.state.plant_name)
      setModalPlantButtonName(location.state.plant_name)
    } else {
      GetAllDiaries();
    }
  }, []);
  const GetYearDiaries = (year) => {
    console.log(year);
    client
      .get(`diary/date?diaryDate=${year}`)
      .then((response) => {
        // console.log("이거년도", response.data.data);
        setLoadedDiaries(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("로딩에 실패하였습니다.");
      });
  };
  const GetPlants = () => {
    client
      .get(`plant`)
      .then((response) => {
        const plants = [];
        // console.log("이거전체식물", response);
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
    client
      .get(`diary/name?plantName=${plant_name}`)
      .then((response) => {
        console.log("이거이름로드", response);
        setLoadedDiaries(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("작성에 실패하였습니다.");
      });
  };

  const deleteDiary = (number) => {
    console.log("넘버", number);
    const deleteInfo = {
      diary_number: number,
    };
    client
      .post(`diary/delete`, deleteInfo)
      .then((response) => {
        alert("삭제 성공");
        GetYearDiaries(2023);
      })
      .catch((error) => {
        console.log(error);
        alert("삭제에 실패하였습니다.");
      });
  };
  const check = () => {
    console.log(modalButtonName);
  };

  console.log(loadedDiaries)
  return (
    <div className="Diary">
      <div className="center">
        <div className="diary-item">
          <h1 style={{ margin: 0 }}>나의 식물 일지</h1>
        </div>
        <div></div>
      </div>

      <hr style={{ margin: 0 }} />

      {/* 모달 관리 */}
      <div className="justify">
        <div>
          <button onClick={openModal} className="diary-button">
            <span className="diary-button-text">{modalButtonName}</span>
            <span className="diary-button-arrow">
              <MdKeyboardArrowDown />
            </span>
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
            <span className="diary-button-text">{modalMonthButtonName}</span>
            <span className="diary-button-arrow">
              <MdKeyboardArrowDown />
            </span>
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
            <span className="diary-button-text">{modalPlantButtonName}</span>
            <span className="diary-button-arrow">
              <MdKeyboardArrowDown />
            </span>
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
              <div className="MyPlantListItem" onClick={() => setSelectedDiary(item)}>
                <div className="img-div">
                  <img
                    className="img-plant"
                    // src={item.diary_img}
                    src={item ? item.diary_img : diaryImg}
                    alt="식물 이미지"
                  />
                </div>
                <div className="content-div">
                  <p className="flex">{item.diary_title}</p>
                  <p className="flex diary-memo">{item.diary_memo}</p>
                  <p className="flex">{item.diary_date.substr(0, 10)}</p>
                </div>

                <div className="button-div">
                  <button
                    className={"modify-button"}
                    onClick={() => {
                      deleteDiary(item.diary_number);
                    }}
                  >
                    <RxCross2/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        {selectedDiary && (
          <WriteModal
            onClose={handleCloseModal}
            onSubmit={handleSubmitModal}
            item={selectedDiary}
            // GetAllDiaries={GetAllDiaries}
            GetNameDiaries={GetNameDiaries}
            GetYearDiaries={GetYearDiaries}
          />
        )}
      </div>
    </div>
  );
};

export default Diary;
