import "./NavBar.style.scss"
import { AiFillHome } from "react-icons/ai"
import { RiPlantFill } from "react-icons/ri"
import { FaBook } from "react-icons/fa"
import { AiOutlinePlus } from "react-icons/ai"
import { useNavigate } from "react-router"
import { React } from "react";

const NavBar = () => {

  const navigate = useNavigate()

  return (
    <div className="NavBar">
      <div 
        className={["nav-items", "nav-item1"].join(" ")}
        onClick={() => {navigate("/home")}}
        // onClick={() => {navigate("/")}}
      >
        <AiFillHome className="navbar-icon" />
        <p>HOME</p>
      </div>
      <div 
        className={["nav-items", "nav-item2"].join(" ")}
        onClick={() => {navigate("/plant")}}
        // onClick={() => {navigate("/")}}
      >
        <RiPlantFill className="navbar-icon" />
        <p>내 식물</p>
      </div>
      <div 
        className={["nav-items", "nav-item3"].join(" ")}
        onClick={() => {navigate("/diary")}}
        // onClick={() => {navigate("/")}}
      >
        <FaBook className="navbar-icon" />
        <p>식물 일지</p>
      </div>
      <div 
        className={["nav-items", "nav-item4"].join(" ")}
        onClick={() => {navigate("/register")}}
        // onClick={() => {navigate("/")}}
      >
        <AiOutlinePlus className="navbar-icon" />
        <p>식물 등록</p>
      </div>
    </div>
  )
};

export default NavBar;