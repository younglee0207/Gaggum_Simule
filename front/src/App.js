import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './routes/main/MainPage';
import ScrollToTop from './components/scrolltotop/ScrollToTop';
import Register from './routes/register/Register';
import StartPage from './routes/start/StartPage';
import PlantListPage from './routes/plant/PlantListPage';
import PlantDetailPage from './routes/plant/PlantDetailPage';
import DiaryPage from './routes/diary/DiaryPage';
import LoadingPage from './routes/loading/LoadingPage';
import RedirectURI from './routes/start/RedirectURI';
import Temp from "../src/routes/temp/Temp"

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          {/* 시작화면 */}
          <Route path='/' element={<StartPage />} />
          {/* 메인화면 */}
          <Route path='/home' element={<MainPage />} />
          {/* 로딩화면 */}
          <Route path="/loading" element={<LoadingPage /> } />
          {/* 내 식물 */}
          <Route path='/plant' element={<PlantListPage />} />
          <Route path='/plant/:id' element={<PlantDetailPage />} />
          {/* 식물 일지 */}
          <Route path='/diary' element={<DiaryPage />} />
          {/* 식물 등록 */}
          <Route path='/register' element={<Register />} />
          <Route path="/auth/kakao/callback" element={<RedirectURI />} />
          {/* Socket 체크 */}
          <Route path='/socket' element={<Temp />} />
        </Routes>
        {/* 로그인 되어있어야 navbar 보이는 로직 추가하기 */}
      </BrowserRouter>
    </div>
  )
};

export default App;
