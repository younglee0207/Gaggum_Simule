import "./Start.style.scss";
import loginImg from "../../assets/start/kakao_login_medium_wide.png";

const StartPage = () => {
  const REST_API_KEY = "58acce2e1c5607a9310ef74870273737";
  // const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
  const REDIRECT_URI = "https://j8b310.p.ssafy.io//auth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <div className="StartPage">
      <div className="start-content">
        <h1>가꿈</h1>

       
          <img src={loginImg} alt="카카오 로그인" onClick={handleLogin} style={{marginTop:"60vh"}}/>
        
      </div>
    </div>
  );
};

export default StartPage;
