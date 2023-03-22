import "./Start.style.scss"
import loginImg from "../../assets/start/kakao_login_medium_wide.png"

const StartPage = () => {
  return (
    <div className="StartPage">
      <div className="start-content">
        <h1>가꿈</h1>
        <img 
          src={loginImg}
          alt="카카오 로그인"
        />
      </div>
    </div>
  )
};

export default StartPage;