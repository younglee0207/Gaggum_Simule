import "./Main.style.scss"
import { SlMagnifier } from "react-icons/sl"

const MapScan = () => {
  return (
    <div className="MapScan">
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