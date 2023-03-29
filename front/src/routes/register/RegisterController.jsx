import "./Register.style.scss";
import {
  FaArrowAltCircleUp,
  FaArrowAltCircleDown,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import { io } from "socket.io-client";
import { useEffect } from "react";

const RegisterController = ({ socket }) => {
  useEffect(() => {
    // 카메라 받기
    socket.on();

    return () => {
      // 카메라 종료
      socket.off();
    };
  }, []);

  const handleUpMouseDown = () => {
    // 앞쪽으로 이동
    socket.emit("go_straight", { name: "go straight", data: 2 });
  };

  const handleDown = () => {
    console.log("뒤");
    // 뒤쪽으로 이동
    socket.emit("go_back", { name: "go back", data: 3 });
  };

  const handleLeft = () => {
    console.log("왼쪽");
    // 왼쪽으로 이동
    socket.emit("go_left", { name: "go left", data: 1 });
  };

  const handleRight = () => {
    console.log("오른쪽");
    // 오른쪽으로 이동
    socket.emit("go_right", { name: "go right", data: 4 });
  };

  return (
    <div className="RegisterController">
      <div className="controller__up">
        <FaArrowAltCircleUp
          size="100"
          color="#022a17"
          // onClick={handleUpKeyDown}
          onMouseOver={handleUpMouseDown}
        />
      </div>
      <div className="controller__down">
        <FaArrowAltCircleLeft size="100" color="#022a17" onClick={handleLeft} />
        <FaArrowAltCircleDown size="100" color="#022a17" onClick={handleDown} />
        <FaArrowAltCircleRight
          size="100"
          color="#022a17"
          onClick={handleRight}
        />
      </div>
    </div>
  );
};

export default RegisterController;
