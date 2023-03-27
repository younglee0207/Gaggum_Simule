import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const RedirectURI = () => {
  const [token, setToken] = useState(true);
  const [name, setName] = useState("");
  const [userNumber, setUserNumber] = useState('')
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleClick = () => {
    if (inputValue === "gridwiz" || inputValue === "310") {
      navigate(`/home`);
    } else {
      alert("제품키를 확인해주세요");
    }
  };

  const numberCheck = () => {
    const turtle_key = {
      turtle_key : inputValue,
    }
    const info = {
      user_number : userNumber,
      turtle_key : turtle_key,
    }
    console.log('인포',info)
    axios
    .post( 
      `https://j8b310.p.ssafy.io/api/turtle`, turtle_key
    )
    .then(async (res) => {
      if (res.data.data[0].valid === 0) {
        alert('잘못된 인증키입니다.')
      } else {
        axios
        
        .post('https://j8b310.p.ssafy.io/api/user/turtle', info)
        .then(
          navigate('/home')
        ) //유저넘버, 터틀키
      }
      console.log("터틀키", res);

      // setName(res.data.data[0].user_name);
      // if (res.data.data[0].turtle_number !== 0 ) {
      //   navigate('/home')
      // }
    });
  }


  useEffect(() => {
   
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    let grant_type = "authorization_code";
    let client_id = "58acce2e1c5607a9310ef74870273737";
    console.log("파라미터스", params);
    console.log("인가코드", code);
    console.log("인풋밸류", inputValue);
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
        console.log("토큰", res);
        setName(res.data.data[0].user_name);
        setUserNumber(res.data.data[0].user_number)
        if (res.data.data[0].turtle_number !== 0 ) {
          navigate('/home')
        }
      });
  }, []);

  return (
    <div className="StartPage">
      <div className="start-content">
        <h1>{name}님 안녕하세요</h1>
        <h2>가꿈을 이용해주셔서 감사합니다.</h2>
        <h2>제품을 이용하시려면 제품 박스에 동봉된 인증키를 입력해주세요.</h2>
        
        <input type="text" onChange={handleInputChange} />
        
        <button onClick={numberCheck}>입력</button>

        {/* <img src={loginImg} alt="카카오 로그인" onClick={handleLogin} /> */}
      </div>
    </div>
  );
};

export default RedirectURI;
