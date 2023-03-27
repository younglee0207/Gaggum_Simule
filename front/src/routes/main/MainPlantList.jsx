import "./Main.style.scss"
import { useRecoilState } from "recoil";
import axios from "axios";
import { useEffect } from "react";
import { needWaterState } from "../../store";

// import swiper
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


// swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const MainPlantList = () => {

  const [needWaterPlant, setNeedWaterPlant] = useRecoilState(needWaterState);

  const getNeedWaterPlant = () => {
    axios
      .get('https://j8b310.p.ssafy.io/api/plant/needwater')
      .then((res) => {
        setNeedWaterPlant(res.data.data)
      })
  }

  useEffect(() => {
    getNeedWaterPlant();
  }, [])

  return (
    <div className="MainPlantList">
      <h2>물 줘</h2>
      <Swiper
        modules={[Navigation, EffectFade, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        loop={false}
      >
        {needWaterPlant?.map((item) => {
          return (
            <SwiperSlide key={item.div}>
              <img
                style={{ width: 100, height: 100 }}
                src={item.plant_img}
              />
              <h3 style={{ marginTop: 0, marginBottom: 24, paddingBottom: 8 }}>{item.plant_name}</h3>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
};

export default MainPlantList;