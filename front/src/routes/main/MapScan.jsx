import "./Main.style.scss"
import { SlMagnifier } from "react-icons/sl"
import { useNavigate } from "react-router";
import Swal from "sweetalert2"

const MapScan = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    Swal.fire({
      title: "맵 스캔",
      text: "맵을 스캔 하시겠습니까?", 
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: "아니오"
    }).then((res) => {
      if (res.isConfirmed) {
        navigate("/loading")
      }
    })
  };

  return (
    <div 
      className="MapScan"
      onClick={handleClick}
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