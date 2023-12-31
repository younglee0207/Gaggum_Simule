import "./Start.style.scss";
import loginImg from "../../assets/start/kakao_login_large_wide.png";
import logoImg from "../../assets/logo/maskable_icon_x192_logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const StartPage = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_LOGIN_REST_API_KEY;
  // const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
  const REDIRECT_URI = "https://j8b310.p.ssafy.io/auth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const navigate = useNavigate();


  const [turtleNumber, setTurtleNumber] = useState('')

  useEffect(() => {
    setTurtleNumber(parseInt(localStorage.getItem("turtle_number")))
    
  }, []);
  const handleLogin = () => {
    
    if (turtleNumber === 1) {
      navigate("/home");
    } else {
      window.location.href = KAKAO_AUTH_URL;
    }
  };

  return (
    <div className="StartPage">
      <div className="start-content">
        <img className="start__logo" src={logoImg} alt="가꿈 로고"/>
        <img
          className="button-content"
          src={loginImg}
          alt="카카오 로그인"
          onClick={handleLogin}
        />
      </div>
    </div>
  );
};

export default StartPage;
