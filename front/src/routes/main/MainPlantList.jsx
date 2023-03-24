import "./Main.style.scss"
import cardImg from "../../assets/plant/mokoko_01.gif"

// import swiper
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
  return (
    <div className="MainPlantList">
      <h2>물 줘</h2>
      <Swiper
        modules={[Navigation, EffectFade, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        loop={false}
      >
        {dummy.map((item) => {
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