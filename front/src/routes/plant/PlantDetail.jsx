import plantImg from "../../assets/plant/mokoko_01.gif"
import { FaSun } from "react-icons/fa"
import ReactSwitch from "react-switch";
import { useState } from "react";
import axios from "axios";

const PlantDetail = ({ item, handleWatering }) => {

  const [checked, setChecked] = useState(false);
  
  const handleChange = () => {
    setChecked(!checked)
  };

  return (
    <div className="PlantDetail">
      {/* 식물 사진 */}
      <div 
        className="detail-image-div"
        style={{ backgroundImage: item?.plant_img, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      >
      </div>
      <div className="detail-top">
        {item?.plant_sunlight ? <FaSun className="top__img" size="40px" color="#FF6B00"/> : <FaSun className="top__img" size="40px" color="#000000" />}
        <p className="top__title">{item?.plant_species}</p>
        <button
          className="top__button"
          onClick={handleWatering}
        >물</button>
      </div>
      <h2 className="detail-name">{item?.plant_name}</h2>
      <div className="detail-content">
        <h3>20일이 지났어요</h3>
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
    </div>
  )
};

export default PlantDetail;