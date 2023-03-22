import PlantListItem from "./PlantListItem";
import plantImg from "../../assets/plant/mokoko_01.gif"

const dummyData = [
  {
    id: 1,
    plant_img: plantImg,
    plant_name: "모코코",
    plant_species: "새싹",
    plant_watering_amount: 300,
    plant_sunlight: true
  },
  {
    id: 2,
    plant_img: plantImg,
    plant_name: "몰?코코",
    plant_species: "몰?코",
    plant_watering_amount: 100,
    plant_sunlight: false
  },
  {
    id: 3,
    plant_img: plantImg,
    plant_name: "몰?로코",
    plant_species: "몰?루",
    plant_watering_amount: 500,
    plant_sunlight: true
  },
  {
    id: 4,
    plant_img: plantImg,
    plant_name: "몰?로코",
    plant_species: "몰?루",
    plant_watering_amount: 500,
    plant_sunlight: true
  },
  {
    id: 5,
    plant_img: plantImg,
    plant_name: "몰?로코",
    plant_species: "몰?루",
    plant_watering_amount: 500,
    plant_sunlight: true
  },
  {
    id: 6,
    plant_img: plantImg,
    plant_name: "몰?로코",
    plant_species: "몰?루",
    plant_watering_amount: 500,
    plant_sunlight: true
  },
  {
    id: 7,
    plant_img: plantImg,
    plant_name: "몰?로코",
    plant_species: "몰?루",
    plant_watering_amount: 500,
    plant_sunlight: true
  }
]


const PlantList = () => {
  return (
    <div className="PlantList">
      {dummyData.map((item) => (
      <PlantListItem
        item={item}
        key={item.id}
        plantId={item.id}
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