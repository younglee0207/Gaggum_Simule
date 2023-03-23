import "./Main.style.scss"
import { FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios"
import { useRecoilState } from "recoil";
import { guLocationState, doLocationState, weatherState } from "../../store";

const API_KEY = "be002738467412a6651e4278dd3f8c76"
const KAKAO_REST_API_KEY = "6d4cc0bbd54b7fee991f9f9f3bcbed4d";
const KAKAO_JS_KEY = "19a2ee5bd66f4c3626e90079a534b1e9";

const Weather = () => {

  const [nowWeather, setNowWeather] = useRecoilState(weatherState)
  const [nowLat, setNowLat] = useState(null)
  const [nowLon, setNowLon] = useState(null)
  const [doLocation, setDoLocation] = useRecoilState(doLocationState)
  const [guLocation, setGuLocation] = useRecoilState(guLocationState)

  // 현재 위치 함수
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
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
    console.log(nowLat, nowLon)
  }

  const mapApi = async () => {
    console.log(nowLat, nowLon)
    try {
      let response = await axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${nowLat}&y=${nowLon}`,
          {
            headers: {
              Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`
            },
          },
        )
        .then((res) => {
          console.log(res)
          const location = res.data.documents[0].address
          setDoLocation(location.region_1depth_name)
          setGuLocation(location.region_2depth_name)
        })
    } catch (error) {
      console.log("failed")
      setDoLocation(null)
      setGuLocation(null)
    }
  }

  useEffect(() => {
    if (!nowWeather) {
      getCurrentLocation();
    }
    if (!doLocation || !guLocation) {
      mapApi();
    }
  }, [nowLat, nowLon])

  return (
    <div 
      className="Weather"
      onClick={() => {getCurrentLocation(); mapApi();}}
    >
      <FaSun size="40px" color="#FF6B00" />
      <div className="weather-location">
        <h4>{doLocation ? doLocation : nowWeather?.name}</h4>
        <h4>{guLocation ? guLocation : ""}</h4>
      </div>
      <div className="weather-temp">
        <h3>{nowWeather ? Number(nowWeather?.main.temp).toFixed(1) : 0}℃</h3>
        <h4>체감온도 {nowWeather ? Number(nowWeather?.main.feels_like).toFixed(1) : 0}℃</h4>
      </div>
    </div>
  )
};

export default Weather;