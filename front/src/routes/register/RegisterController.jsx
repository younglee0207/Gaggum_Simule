import "./Register.style.scss"
import { FaArrowAltCircleUp, FaArrowAltCircleDown, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa"

const RegisterController = () => {

  const handleUp = () => {
    console.log("위")
    // 위쪽으로 이동
  };

  const handleDown = () => {
    console.log("아래")
    // 아래쪽으로 이동
  };

  const handleLeft = () => {
    console.log("왼쪽")
    // 왼쪽으로 이동
  };

  const handleRight = () => {
    console.log("오른쪽")
    // 오른쪽으로 이동
  };

  return (
    <div className="RegisterController">
      <div className="controller__up">
        <FaArrowAltCircleUp 
          size="100" 
          color="#022a17"
          onClick={handleUp}
        />
      </div>
      <div className="controller__down">
        <FaArrowAltCircleLeft 
          size="100" 
          color="#022a17"
          onClick={handleLeft}
        />
        <FaArrowAltCircleDown 
          size="100" 
          color="#022a17"
          onClick={handleDown}
        />
        <FaArrowAltCircleRight 
          size="100" 
          color="#022a17"
          onClick={handleRight}
        />
      </div>
    </div>
  )
};

export default RegisterController;