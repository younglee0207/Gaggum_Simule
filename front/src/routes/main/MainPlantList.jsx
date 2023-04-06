import "./Main.style.scss"
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { needWaterState } from "../../store";
import client from "../../api/client"

// import swiper
import { Navigation, Pagination, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from "react-router";

const dummy = [
  {
    id: 1,
    plant_img: cardImg,
    plant_name: "1번 식물"
  },
  {
    id: 2,
    plant_img: cardImg,
    plant_name: "2번 식물"
  },
  {
    id: 3,
    plant_img: cardImg,
    plant_name: "3번 식물"
  },
  {
    id: 4,
    plant_img: cardImg,
    plant_name: "4번 식물"
  },
  {
    id: 5,
    plant_img: cardImg,
    plant_name: "5번 식물"
  },
]

const MainPlantList = () => {

  const navigate = useNavigate()

  const [needWaterPlant, setNeedWaterPlant] = useState(null);

  const getNeedWaterPlant = () => {
    client
      .get('plant/needwater')
      .then((res) => {
        setNeedWaterPlant(res.data.data)
      })
  }

  const handleNavigate = (id) => {
    navigate(`/plant/${id}`, { state: id })
  };

  useEffect(() => {
    getNeedWaterPlant();
  }, [])

  return (
    <div className="MainPlantList">
      <h2>오늘 물을 줘야하는 식물</h2>
      {needWaterPlant?.length > 0 ? (
        <Swiper
          modules={[Navigation, EffectFade, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          loop={false}
        >
          {needWaterPlant?.map((item) => {
            return (
              <SwiperSlide className="slider__container" key={item.plant_number} onClick={() => handleNavigate(item?.plant_number)} >
                <img
                  className="slider__img"
                  src={item.plant_img}
                  alt="식물 사진"
                />
                <h3 style={{ marginTop: 0, marginBottom: 24, paddingBottom: 8, textAlign: "center" }}>{item.plant_name}</h3>
              </SwiperSlide>
            )
          })}
      </Swiper>
      ) : (
        <div className="plant__no-plant">
          <h3>오늘은 물이 필요한 식물이 없어요</h3>
        </div>
      )}
    </div>
  )
};

export default MainPlantList;