import "./Main.style.scss"
import { FaSun } from "react-icons/fa";

const Weather = () => {
  return (
    <div className="Weather">
      <FaSun size="40px" color="#FF6B00" />
      <h3>대전 덕명동</h3>
      <div>
        <h3>16℃</h3>
        <h4>10℃ / -2℃</h4>
      </div>
    </div>
  )
};

export default Weather;