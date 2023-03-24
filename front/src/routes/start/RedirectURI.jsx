import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const RedirectURI = () => {
  const [token, setToken] = useState(true);

  const [name, setName] = useState("");
  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    let grant_type = "authorization_code";
    let client_id = "58acce2e1c5607a9310ef74870273737";
    console.log("파라미터스", params);
    console.log("인가코드", code);
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=http://localhost:3000/auth/kakao/callback&code=${code}`,
        {},
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        console.log("토큰", res);
        // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
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
              if (
                testname === "이영재" ||
                testname === "장현혁" ||
                testname === "김경섭" ||
                testname === "이준호" ||
                testname === "윤동민" ||
                testname === "최상원"
              ) {
                setToken(false);
              }
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
        <input type="text" />
        <Link to={"/home"} hidden={token}>
          <button>입력</button>
        </Link>

        {/* <img src={loginImg} alt="카카오 로그인" onClick={handleLogin} /> */}
      </div>
    </div>
  );
};

export default RedirectURI;
