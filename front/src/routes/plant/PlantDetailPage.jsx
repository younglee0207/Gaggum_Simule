import { useEffect, useState } from "react";
// import { useParams } from "react-router";
import Swal from "sweetalert2";
import NavBar from "../../components/navbar/NavBar";
import { getPlantDetailState } from "../../store";
import "./Plant.style.scss"
import PlantDetail from "./PlantDetail";
import client from "../../api/client";
import { useLocation } from "react-router-dom"

const PlantDetailPage = () => {

  const [plantDetail, setPlantDetail] = useState(getPlantDetailState);
  const location = useLocation()
  const id = location.state

  const getPlantDetail = () => {
    client
      .get(`plant/number?plantNumber=${id}`)
      .then((res) => {
        const data = res.data.data.filter((it) => it.plant_number === id)
        setPlantDetail(data[0])
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
    }).then((res) => {
      if (res.isConfirmed) {
        client
          .post('plant/water', data)
          .then(() => {
            getPlantDetail(id)
          })
      }
    })
  };

  useEffect(() => {
    getPlantDetail(id)
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