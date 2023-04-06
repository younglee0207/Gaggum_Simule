import "./Plant.style.scss"
import { useEffect, useState } from "react";
import { GiWaterDrop } from "react-icons/gi"
import { useNavigate } from "react-router";
import { FaSun } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import client from "../../api/client";

const PlantListItem = ({ item, plantId, plantImg, plantName, plantSpecies, plantWateringAmount, plantSunlight }) => {

  const navigate = useNavigate();

  const navigateToDetail = () => {
    navigate(`/plant/${plantId}`, { state: plantId });
  };
  const needSunlight = plantSunlight ? 
  <FaSun className="sunlight__img" size="32px" color="#FF6B00" /> : <FaSun className="sunlight__img" size="32px" />

  const grayColor = "gray";
  const blueColor = "#25D8FF";

  const [ wateringAmount1, setWateringAmount1 ] = useState(grayColor) 
  const [ wateringAmount2, setWateringAmount2 ] = useState(grayColor) 
  const [ wateringAmount3, setWateringAmount3 ] = useState(grayColor) 
  const [ wateringAmount4, setWateringAmount4 ] = useState(grayColor) 
  const [ wateringAmount5, setWateringAmount5 ] = useState(grayColor)

  const handleDelete = () => {
    Swal.fire({
      title: "식물 삭제",
      text: "식물을 삭제하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: "아니오",
    }).then((res) => {
      if (res.isConfirmed) {
        client
          .post("plant/delete", { plant_number: plantId })
          .then((res) => {
          })
      }
    });
  };
  
  useEffect(() => {
    switch (plantWateringAmount) {
      case 100:
        setWateringAmount1(blueColor)
        setWateringAmount2(grayColor)
        setWateringAmount3(grayColor)
        setWateringAmount4(grayColor)
        setWateringAmount5(grayColor)
        break
      case 200:
        setWateringAmount1(blueColor)
        setWateringAmount2(blueColor)
        setWateringAmount3(grayColor)
        setWateringAmount4(grayColor)
        setWateringAmount5(grayColor)
        break
      case 300:
        setWateringAmount1(blueColor)
        setWateringAmount2(blueColor)
        setWateringAmount3(blueColor)
        setWateringAmount4(grayColor)
        setWateringAmount5(grayColor)
        break
      case 400:
        setWateringAmount1(blueColor)
        setWateringAmount2(blueColor)
        setWateringAmount3(blueColor)
        setWateringAmount4(blueColor)
        setWateringAmount5(grayColor)
        break
      case 500:
        setWateringAmount1(blueColor)
        setWateringAmount2(blueColor)
        setWateringAmount3(blueColor)
        setWateringAmount4(blueColor)
        setWateringAmount5(blueColor)
        break
      default:
        break
    }
  }, [])

  return (
    <div 
      className="MyPlantListItem"
      onClick={navigateToDetail}
    >
      {/* <RxCross2 
        className="plant__delete"
        size="20px"
        color="gray"
        onClick={handleDelete}
      /> */}
      <div className="img__container">
        <img
          className="img-plant"
          src={plantImg}
          alt="식물 사진"
        />
        {/* {needSunlight} */}
      </div>
      <div className="content__container">
        <h3 className="content__name">{plantName}</h3>
        <p className="content__species">{plantSpecies}</p>
        <div className="watering-amount-div">
          <GiWaterDrop color={wateringAmount1}/>
          <GiWaterDrop color={wateringAmount2}/>
          <GiWaterDrop color={wateringAmount3}/>
          <GiWaterDrop color={wateringAmount4}/>
          <GiWaterDrop color={wateringAmount5}/>
        </div>
      </div>
    </div>
  )
};

export default PlantListItem;
