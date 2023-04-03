import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./routes/main/MainPage";
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
import Register from "./routes/register/Register";
import StartPage from "./routes/start/StartPage";
import PlantListPage from "./routes/plant/PlantListPage";
import PlantDetailPage from "./routes/plant/PlantDetailPage";
import DiaryPage from "./routes/diary/DiaryPage";
import LoadingPage from "./routes/loading/LoadingPage";
import RedirectURI from "./routes/start/RedirectURI";
import Temp from "../src/routes/temp/Temp";
import { useState, useEffect } from "react";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const turtleNumber = parseInt(localStorage.getItem("turtle_number"));
    if (turtleNumber === 1) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* 시작화면 */}
          <Route path="/" element={<StartPage />} />
          {/* 메인화면 */}
          <Route path="/home" element={<MainPage />} />

          
          {/* <Route
            path="/home"
            element={
              isLoggedIn ? (
                <MainPage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          /> */}
          {/* 로딩화면 */}
          {/* <Route path="/loading" element={<LoadingPage />} /> */}

          
          <Route
            path="/loading"
            element={
              isLoggedIn ? (
                <LoadingPage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          {/* 내 식물 */}
          <Route path="/plant" element={<PlantListPage />} />

          <Route
            path="/plant"
            element={
              isLoggedIn ? (
                <PlantListPage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />

          {/* 식물 디테일 */}
          <Route path="/plant/:id" element={<PlantDetailPage />} />

          <Route
            path="/plant/:id"
            element={
              isLoggedIn ? (
                <PlantDetailPage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          {/* 식물 일지 */}

          <Route
            path="/diary"
            element={
              isLoggedIn ? (
                <DiaryPage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          {/* 식물 등록 */}
          {/* <Route path="/register" element={<Register />} /> */}

          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Register />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          {/* 카카오 RedirectURI 페이지 */}
          <Route path="/auth/kakao/callback" element={<RedirectURI />} />
          {/* 구글 검수 임시용 */}
          <Route path="/googlesecret" element={<MainPage />} />
        </Routes>
        {/* 로그인 되어있어야 navbar 보이는 로직 추가하기 */}
      </BrowserRouter>
    </div>
  );
};

export default App;
