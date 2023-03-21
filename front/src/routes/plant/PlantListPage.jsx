import NavBar from "../../components/navbar/NavBar";
import "./Plant.style.scss"
import PlantList from "./PlantList";

const PlantListPage = () => {
  return (
    <>
      <div className="content">
        <PlantList />
      </div>
    </>
  )
};

export default PlantListPage;