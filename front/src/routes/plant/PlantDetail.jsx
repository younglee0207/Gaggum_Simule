import { useLocation } from "react-router";
import plantImg from "../../assets/plant/mokoko_01.gif"
import { FaSun } from "react-icons/fa"
import ReactSwitch from "react-switch";
import { useState } from "react";

const PlantDetail = () => {

  const [checked, setChecked] = useState(false);
  
  const handleChange = () => {
    setChecked(!checked)
  };

  return (
    <div className="PlantDetail">
      {/* 식물 사진 */}
      <div className="detail-image-div">
      </div>
      <div className="detail-top">
        <FaSun 
          size="40px"
          color="#FF6B00"
        />
        <p className="detail-top-title">치치페그린 미니선인장</p>
        <button>물</button>
      </div>
      <h2 className="detail-name">쀼쀼</h2>
      <div className="detail-content">
        <h3>20일이 지났어요</h3>
        <hr />
        <p>우리 쀼쀼 가시는 찔려도 안아프다구욧!!</p>
      </div>
      <div className="detail-bottom">
        <div className="detail-bottom-item">
          <p>급수주기</p>
          <div className="detail-bottom-item-circle">
            3일
          </div>
        </div>
        <div className="detail-bottom-item">
          <p>급수량</p>
          <div className="detail-bottom-item-circle">
            300ML
          </div>
        </div>
        <div className="detail-bottom-item">
          <p>급수일</p>
          <div className="detail-bottom-item-circle">
            03.10
          </div>
        </div>
      </div>
    </div>
  )
};

export default PlantDetail;