import NavBar from "../../components/navbar/NavBar";
import "./Plant.style.scss"
import PlantDetail from "./PlantDetail";

const PlantDetailPage = () => {
  return (
    <div className="PlantDetailPage">
      <PlantDetail />
      <NavBar />
    </div>
  )
};

export default PlantDetailPage;