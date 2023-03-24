import "./Plant.style.scss"
import sunlight from "../../assets/plant/sun_image.png"
import { useEffect, useState } from "react";
import { GiWaterDrop } from "react-icons/gi"
import { useNavigate } from "react-router";

const PlantListItem = ({ item, plantId, plantImg, plantName, plantSpecies, plantWateringAmount, plantSunlight }) => {

  const navigate = useNavigate();

  const navigateToDetail = () => {
    navigate(`/plant/${plantId}`, { state: item });
  };
  const needSunlight = plantSunlight ? 
  <img className="img-sunlight" src={sunlight} alt="햇빛 사진" /> : null

  const grayColor = "gray";
  const blueColor = "#25D8FF";

  const [ wateringAmount1, setWateringAmount1 ] = useState(grayColor) 
  const [ wateringAmount2, setWateringAmount2 ] = useState(grayColor) 
  const [ wateringAmount3, setWateringAmount3 ] = useState(grayColor) 
  const [ wateringAmount4, setWateringAmount4 ] = useState(grayColor) 
  const [ wateringAmount5, setWateringAmount5 ] = useState(grayColor)

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
      <div className="img-div">
        <img
          className="img-plant"
          src={plantImg}
          alt="식물 사진"
        />
        {needSunlight}
      </div>
      <div className="content-div">
        <p className="plant-name">{plantName}</p>
        <p>{plantSpecies}</p>
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
