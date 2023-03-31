import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import NavBar from "../../components/navbar/NavBar";
import { getPlantDetailState } from "../../store";
import "./Plant.style.scss"
import PlantDetail from "./PlantDetail";

const PlantDetailPage = () => {

  const { id } = useParams()
  const [plantDetail, setPlantDetail] = useState(getPlantDetailState);

  const getPlantDetail = () => {
    axios
      .get(`https://j8b310.p.ssafy.io/api/plant/number?plantNumber=${id}`)
      .then((res) => {
        setPlantDetail(res.data.data[id - 1])
      })
  }

  const handleWatering = () => {

    const data = {
      plant_number: id
    }

    Swal.fire({
      title: "급수 날짜 최신화",
      text: "급수 날짜를 최신화 하시겠습니까?", 
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: "아니오"
    }).then(() => {
      axios
        .post('https://j8b310.p.ssafy.io/api/plant/water', data)
        .then(() => {
          getPlantDetail()
        })
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