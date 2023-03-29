import axios from "axios";
import { useEffect, useState } from "react";
import flowerImg from "../../assets/main/flower-gif.gif"

const API_KEY = "XXL2KwjyRGopX8KOKa1BT7gj3em5fLBeqRHJ3xmUpHboTi9da0bZL9fXntQWh63TkQBodm6xHmgeas8K7yBerg%3D%3D"

const TodayFlower = () => {

  let now = new Date()
  let todayMonth = now.getMonth() + 1;
  let todayDay = now.getDate();
  
  console.log(todayMonth, todayDay)

  const [flowerData, setFlowerData] = useState(null)
  const getFlowerData = async () => {
    try {
      axios
        .get("https://apis.data.go.kr/1390804/NihhsTodayFlowerInfo01/selectTodayFlowerView01", {
          params: {
            ServiceKey: "XXL2KwjyRGopX8KOKa1BT7gj3em5fLBeqRHJ3xmUpHboTi9da0bZL9fXntQWh63TkQBodm6xHmgeas8K7yBerg%3D%3D",
            fMonth: todayMonth,
            fDay: todayDay
          },
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((res) => {
          console.log(res)
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFlowerData()
  }, [])

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