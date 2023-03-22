import "./Main.style.scss"
import { FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios"

const API_KEY = "be002738467412a6651e4278dd3f8c76"
const KAKAO_REST_API_KEY = "6d4cc0bbd54b7fee991f9f9f3bcbed4d"

const Weather = () => {


  const [nowWeather, setNowWeather] = useState(null)
  const [nowLat, setNowLat] = useState(null)
  const [nowLon, setNowLon] = useState(null)
  const [nowLocation, setNowLocation] = useState(null)

  // 현재 위치 함수
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      console.log("현재 위치", lat, lon);
      setNowLat(lat)
      setNowLon(lon)
      getWeatherByCurrentLocation(lat, lon);
    })
  }

  // 현재 날씨 함수
  const getWeatherByCurrentLocation = async (lat, lon) => {
    // &units=metric => 섭씨 사용
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    // url에 데이터를 가져올 때 까지 기다리기
    let response = await fetch(url);
    let data = await response.json();
    // weather에 데이터 담기
    setNowWeather(data);
    console.log(data)
  }

  useEffect(() => {
    getCurrentLocation();
  }, [nowLat, nowLon])

  return (
    <div className="Weather">
      <FaSun size="40px" color="#FF6B00" />
      <h3>{nowWeather?.name}</h3>
      <div>
        <h3>{Number(nowWeather?.main.temp).toFixed(1)}℃</h3>
        <h4>체감온도 {Number(nowWeather?.main.feels_like).toFixed(1)}℃</h4>
      </div>
    </div>
  )
};

export default Weather;