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
import { useState, useEffect } from "react";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const turtleNumber = parseInt(localStorage.getItem("turtle_number"));
    if (turtleNumber === 1) {
      setIsLoggedIn(true);
    }

  }, [isLoggedIn]);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* 시작화면 */}
          <Route path="/" element={<StartPage />} />
          {/* 메인화면 */}
          <Route
            path="/home"
            element={
              isLoggedIn ? (
                <MainPage />
              ) : (
                <StartPage />
              )
            }
          />
          {/* 로딩화면 */}
          <Route
            path="/loading"
            element={
              isLoggedIn ? (
                <LoadingPage />
              ) : (
                <StartPage />
              )
            }
          />
          {/* 내 식물 */}
          <Route
            path="/plant"
            element={
              isLoggedIn ? (
                <PlantListPage />
              ) : (
                <StartPage />
              )
            }
          />

          {/* 식물 디테일 */}
          <Route
            path="/plant/:id"
            element={
              isLoggedIn ? (
                <PlantDetailPage />
              ) : (
                <StartPage />
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
                <StartPage />
              )
            }
          />
          {/* 식물 등록 */}
          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Register />
              ) : (
                <StartPage />
              )
            }
          />
          {/* 카카오 RedirectURI 페이지 */}
          <Route path="/auth/kakao/callback" element={<RedirectURI />} />
          
        </Routes>
        {/* 로그인 되어있어야 navbar 보이는 로직 추가하기 */}
      </BrowserRouter>
    </div>
  );
};

export default App;
