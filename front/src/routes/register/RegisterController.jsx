import "./Register.style.scss"
import { FaArrowAltCircleUp, FaArrowAltCircleDown, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa"

const RegisterController = () => {
  return (
    <div className="RegisterController">
      <div className="controller__up">
        <FaArrowAltCircleUp size="100" color="#022a17" />
      </div>
      <div className="controller__down">
        <FaArrowAltCircleLeft size="100" color="#022a17" />
        <FaArrowAltCircleDown size="100" color="#022a17" />
        <FaArrowAltCircleRight size="100" color="#022a17" />
      </div>
    </div>
  )
};

export default RegisterController;