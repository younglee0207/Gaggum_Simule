import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const RedirectURI = () => {
  const [token, setToken] = useState(true);
  const [name, setName] = useState("");

  const navigate = useNavigate()


  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleClick = () => {
    if (inputValue === 'gridwiz' || inputValue === '310') { navigate(`/home`) }
    else { alert('제품키를 확인해주세요') }

  }
  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    let grant_type = "authorization_code";
    let client_id = "58acce2e1c5607a9310ef74870273737";
    console.log("파라미터스", params);
    console.log("인가코드", code);
    console.log('인풋밸류',inputValue)
    axios
      .get(
        `http://localhost:8080/user/kakao/code?code=${code}`,
        {},
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        console.log("토큰", res);
        // res에 포함된 토큰 받아서 원하는 로직을 하면된다.디비에다 디비에서
        const { data } = res; 
        const { access_token } = data;

        if (access_token) {
          console.log(`Bearer ${access_token}`);
          axios
            .post(
              "https://kapi.kakao.com/v2/user/me",
              {},
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  "Content-type": "apllication/x-www-form-urlencoded",
                },
              }
            )
            .then((res) => {
              const testname = res.data.properties.nickname;
              console.log("데이터성공 :");
              console.log(res);
              setName(testname);
            });
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

        <button onClick={handleClick}>입력</button>


        {/* <img src={loginImg} alt="카카오 로그인" onClick={handleLogin} /> */}
      </div>
    </div>
  );
};

export default RedirectURI;
