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

const MainPlantList = () => {

  const navigate = useNavigate()

  const [needWaterPlant, setNeedWaterPlant] = useState(null);

  const getNeedWaterPlant = () => {
    client
      .get('plant/needwater')
      .then((res) => {
        console.log("물이 필요한 식물들 불러오기 성공")
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
              <SwiperSlide className="slider__container" key={item.div} onClick={() => handleNavigate(item?.plant_number)} >
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