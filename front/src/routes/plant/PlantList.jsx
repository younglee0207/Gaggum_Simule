import PlantListItem from "./PlantListItem";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { getAllPlantListState } from "../../store";
import client from "../../api/client";

const PlantList = () => {

  const [plantList, setPlantList] = useRecoilState(getAllPlantListState)

  const getPlantList = () => {
    client
      .get('plant')
      .then((res) => {
        setPlantList(res.data.data)
      })
  }

  useEffect(() => {
    getPlantList()
  }, [])

  return (
    <div className="PlantList">
      {plantList?.map((item) => (
      <PlantListItem
        key={item.plant_number}
        item={item}
        plantId={item.plant_number}
        plantImg={item.plant_img}
        plantName={item.plant_name}
        plantSpecies={item.plant_species}
        plantWateringAmount={item.plant_watering_amount}
        plantSunlight={item.plant_sunlight}
      />
      ))}
    </div>
  )
};

export default PlantList;