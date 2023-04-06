import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RedirectURI = () => {
  const [token, setToken] = useState(true);
  const [name, setName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const test = () => {
    localStorage.setItem('turtle_number',1 )
  }
  const numberCheck = () => {
    const turtle_key = {
      turtle_key: inputValue,
    };
    const info = {
      user_number: userNumber,
      turtle_key: inputValue,
    };
    axios
      .post(`https://j8b310.p.ssafy.io/api/turtle`, turtle_key)
      .then((res) => {
        if (res.data.data[0].valid === 0) {
          Swal.fire({
            title: "인증키 오류",
            text: "잘못된 인증키입니다.",
            icon: "error"
          })
        } else {
          axios
            .post("https://j8b310.p.ssafy.io/api/user/turtle", info)
            .then(navigate("/home")); //유저넘버, 터틀키
        }
      });
  };

  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    let grant_type = "authorization_code";
    let client_id = "58acce2e1c5607a9310ef74870273737";
    axios
      .get(
        `https://j8b310.p.ssafy.io/api/user/kakao/code?code=${code}`,
        {},
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        setName(res.data.data[0].user_name);
        setUserNumber(res.data.data[0].user_number);
        localStorage.setItem('turtle_number',res.data.data[0].turtle_number)
        if (res.data.data[0].turtle_number !== 0) {
          navigate("/home");
        }
      });
  }, []);

  return (
    <div className="Turtlebot-Page">
      <div className="turtlebot__content">
        <h1>{name}님 안녕하세요</h1>
        <h2>인증키를 입력해주세요.</h2>
        <input className="turtlebot__input" type="text" onChange={handleInputChange} />
        <button className="turtlebot__btn" onClick={numberCheck}>입력</button>
        <h4>인증키는 제품 박스에 동봉되어 있습니다.</h4>
      </div>
    </div>
  );
};

export default RedirectURI;
