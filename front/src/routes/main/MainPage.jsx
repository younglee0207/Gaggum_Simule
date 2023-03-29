import NavBar from "../../components/navbar/NavBar"
import MainPlantList from "./MainPlantList";
import MapScan from "./MapScan";
import TodayFlower from "./TodayFlower";
import Weather from "./Weather";

import { useState, useEffect } from "react";

const MainPage = () => {

  const tempImg = ""
  
  return (
    <div className="MainPage">
      <div className="main-content">
        <Weather />
        <MainPlantList />
        <TodayFlower />
        <MapScan />
        {/* <img 
        src={`data:image/jpeg;base64,${tempImg}`}
        style={{ width: "640px", height: "480px" }}
        /> */}
      </div>
      <NavBar />

    </div>
  )
};

export default MainPage;