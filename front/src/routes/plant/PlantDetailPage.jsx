import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../../components/navbar/NavBar";
import { getPlantDetailState } from "../../store";
import "./Plant.style.scss"
import PlantDetail from "./PlantDetail";

const PlantDetailPage = () => {

  const { id } = useParams()
  const [plantDetail, setPlantDetail] = useState(getPlantDetailState);

  console.log(plantDetail)

  const getPlantDetail = () => {
    axios
      .get(`https://j8b310.p.ssafy.io/api/plant/number?plantNumber=${id}`)
      .then((res) => {
        setPlantDetail(res.data.data[0])
      })
  }

  const handleWatering = () => {

    const data = {
      plant_number: id
    }

    axios
      .post('https://j8b310.p.ssafy.io/api/plant/water', data)
      .then((res) => {
        getPlantDetail()
      })
  };

  useEffect(() => {
    getPlantDetail()
  }, [])

  return (
    <div className="PlantDetailPage">
      <PlantDetail 
        item={plantDetail}
        handleWatering={handleWatering}
      />
      <NavBar />
    </div>
  )
};

export default PlantDetailPage;