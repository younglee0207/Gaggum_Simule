import NavBar from "../../components/navbar/NavBar"
import MainPlantList from "./MainPlantList";
import MapScan from "./MapScan";
import TodayFlower from "./TodayFlower";
import Weather from "./Weather";

import { useState, useEffect } from "react";

const MainPage = () => {
  
  return (
    <div className="MainPage">
      <div className="main-content">
        <MainPlantList />
        <Weather />
        <TodayFlower />
        <MapScan />
      </div>
      <NavBar />
    </div>
  )
};

export default MainPage;