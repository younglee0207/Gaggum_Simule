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
              parseInt(localStorage.getItem("turtle_number")) === 1 ? (
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
              parseInt(localStorage.getItem("turtle_number")) === 1 ? (
                <LoadingPage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />

          {/* 내 식물 */}
          {/* <Route path="/plant" element={<PlantListPage />} /> */}
          <Route
            path="/plant"
            element={
              parseInt(localStorage.getItem("turtle_number")) === 1 ? (
                <PlantListPage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />

          <Route
            path="/plant/:id"
            element={
              parseInt(localStorage.getItem("turtle_number")) === 1 ? (
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
              parseInt(localStorage.getItem("turtle_number")) === 1 ? (
                <DiaryPage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          {/* 식물 등록 */}
          <Route path="/register" element={<Register />} />

          {/* <Route
            path="/register"
            element={
              parseInt(localStorage.getItem("turtle_number")) === 1 ? (
                <Register />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          /> */}
          {/* 카카오 RedirectURI 페이지 */}
          <Route path="/auth/kakao/callback" element={<RedirectURI />} />
          {/* Socket 체크 */}
          <Route path="/temp" element={<Temp />} />
        </Routes>
        {/* 로그인 되어있어야 navbar 보이는 로직 추가하기 */}
      </BrowserRouter>
    </div>
  );
};

export default App;
