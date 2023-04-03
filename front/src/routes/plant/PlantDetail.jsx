import { FaSun } from "react-icons/fa"
import { useState } from "react";
import { ImBook } from "react-icons/im"
import { useNavigate } from "react-router";

const PlantDetail = ({ item, handleWatering }) => {

  const navigate = useNavigate()
  const [checked, setChecked] = useState(false);
  const registDate = new Date(item.plant_create_date?.slice(0, 10))
  const nowDate = new Date()
  const diff = (nowDate - registDate) / (1000 * 60 * 60 * 24) // 일(day) 단위로 계산
  const daysDiff = Math.floor(diff) // 소수점 이하 절사 
  const backgroundImage = item.plant_img || 'https://ssafybucket.s3.ap-northeast-2.amazonaws.com/image/planticon.png'

  const handleChange = () => {
    setChecked(!checked)
  };

  const handleDiary = () => {
    navigate("/diary", { state: item })
  };

  console.log(item.plant_img)
  return (
    <div className="PlantDetail">
      {/* 식물 사진 */}
      <div 
        className="detail-image-div"
        // style={{ backgroundImage: `url(${item?.plant_img})` }}
      >
        <img 
          src={backgroundImage}
          alt="식물 사진"
        />
      </div>
      <div className="detail__content">
        <div className="detail-top">
          {item?.plant_sunlight ? <FaSun className="top__img" size="40px" color="#FF6B00"/> : <FaSun className="top__img" size="40px" color="#000000" />}
          <p className="top__title">{item?.plant_species}</p>
          <div
            className="top__button"
          >
            <button
              onClick={handleWatering}
            >급수 최신화</button>
          </div>
        </div>
        <h2 className="detail-name">{item?.plant_name}</h2>
        <div className="detail-content">
          <h3>함께한지 {daysDiff}일이 지났어요</h3>
          <hr />
          <p>{item?.plant_memo}</p>
        </div>
        <div className="detail-bottom">
          <div className="detail-bottom-item">
            <p>급수주기</p>
            <div className="detail-bottom-item-circle">
              {item?.plant_watering_cycle}일
            </div>
          </div>
          <div className="detail-bottom-item">
            <p>급수량</p>
            <div className="detail-bottom-item-circle">
              {item?.plant_watering_amount}ml
            </div>
          </div>
          <div className="detail-bottom-item">
            <p>급수일</p>
            <div className="detail-bottom-item-circle">
              {item?.plant_last_watering_date?.slice(2, 10)}
            </div>
          </div>
        </div>
        <div 
          className="content__diary--button"
          onClick={handleDiary}
        >
          <span>
            <ImBook size="40px"/>
          </span>
          <span><h2>일지 보기</h2></span>
        </div>
      </div>
    </div>
  )
};

export default PlantDetail;