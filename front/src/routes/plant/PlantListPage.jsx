import NavBar from "../../components/navbar/NavBar";
import Title from "../../components/title/Title";
import "./Plant.style.scss"
import PlantList from "./PlantList";

const PlantListPage = () => {
  return (
    <>
      <div className="PlantListPage">
        <Title text={"내 식물"} />
        <PlantList />
        <NavBar />
      </div>
    </>
  )
};

export default PlantListPage;