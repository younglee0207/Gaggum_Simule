import "./Main.style.scss"
import { SlMagnifier } from "react-icons/sl"
import { useNavigate } from "react-router";

const MapScan = () => {

  const navigate = useNavigate()

  return (
    <div 
      className="MapScan"
      onClick={() => navigate("/loading")}
    >
      <span>
        <SlMagnifier 
          size="40"
        />
      </span>
      <span><h2>맵 스캔</h2></span>
    </div>
  )
};

export default MapScan;