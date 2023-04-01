import axios from "axios";
import { useEffect, useState } from "react";
import XMLParser from "react-xml-parser"


const API_KEY = "XXL2KwjyRGopX8KOKa1BT7gj3em5fLBeqRHJ3xmUpHboTi9da0bZL9fXntQWh63TkQBodm6xHmgeas8K7yBerg%3D%3D"

let now = new Date()
let todayMonth = now.getMonth() + 1;
let todayDay = now.getDate();

const TodayFlower = () => {
  
  console.log(todayMonth, todayDay)

  const [flowerName, setFlowerName] = useState(null)
  const [flowerMean, setFlowerMean] = useState(null)
  const [flowerImg, setFlowerImg] = useState(null)

  const getFlowerData = async () => {
    try {
      axios
        .get(`http://apis.data.go.kr/1390804/NihhsTodayFlowerInfo01/selectTodayFlower01?serviceKey=${API_KEY}&fMonth=${todayMonth}&fDay=${todayDay
      }`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((res) => {
          const dataSet = new XMLParser().parseFromString(res.data)
          console.log(dataSet)
          setFlowerName(dataSet?.children[0].children[3].children[3].value)
          setFlowerMean(dataSet?.children[0].children[3].children[6].value)
          setFlowerImg(
            dataSet?.children[0].children[3].children[14].value.split(" ")[0]
          )
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
        {flowerImg ? (
          <img 
            src={flowerImg}
            alt="꽃 이미지"
          />
        ) : null}
        <div className="flower-text">
          <h3>{flowerName}</h3>
          <p>{flowerMean}</p>
        </div>
      </div>
    </div>
  )
};

export default TodayFlower;