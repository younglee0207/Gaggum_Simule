import "./Loading.style.scss"
import loading from "../../assets/loading/loading.gif"

const LoadingPage = () => {
  // 버튼 누를 시 로딩
  // 끝나면 확인 모달 띄우고 다시 home으로
  return (
    <div className="LoadingPage">
      <h2 className="loading-title">집을 스캔 중입니다..</h2>
      <img 
        src={loading}
        alt="로딩중"
      />
      <h2 className="loading-content">이 작업은 집 크기에 따라 수십 분이 소요됩니다.</h2>
    </div>
  )
};

export default LoadingPage;