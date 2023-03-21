import flowerImg from "../../assets/main/flower-gif.gif"

const TodayFlower = () => {
  return (
    <div className="TodayFlower"> 
      <h2>오늘의 꽃</h2>
      <div className="flower-content">
        <img 
          className="flower-img"
          src={flowerImg}
          alt="꽃 이미지"
        />
        <div className="flower-text">
          <h3>조팝나무</h3>
          <p>"단정한 사랑"</p>
          <p>"헛고생"</p>
        </div>
      </div>
    </div>
  )
};

export default TodayFlower;