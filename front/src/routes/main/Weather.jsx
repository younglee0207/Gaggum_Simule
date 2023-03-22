import "./Main.style.scss"
import { FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios"

const API_KEY = "be002738467412a6651e4278dd3f8c76"
const KAKAO_REST_API_KEY = "6d4cc0bbd54b7fee991f9f9f3bcbed4d"

const Weather = ({ name, temp, feels_like }) => {

  return (
    <div className="Weather">
      <FaSun size="40px" color="#FF6B00" />
      <h3>{name}</h3>
      <div>
        <h3>{Number(temp).toFixed(1)}℃</h3>
        <h4>체감온도 {Number(feels_like).toFixed(1)}℃</h4>
      </div>
    </div>
  )
};

Weather.defaultProps = {
  name: "지역",
  temp: 0,
  feels_like: 0
}

export default Weather;