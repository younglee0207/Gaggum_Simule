import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './routes/main/MainPage';
import Diary from './routes/diary/Diary';
import ScrollToTop from './components/scrolltotop/ScrollToTop';
import NavBar from './components/navbar/NavBar';
import Register from './routes/register/Register';
import StartPage from './routes/start/StartPage';
import PlantListPage from './routes/plant/PlantListPage';
import PlantDetailPage from './routes/plant/PlantDetailPage';
import DiaryPage from './routes/diary/DiaryPage';
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
          {/* 내 식물 */}
          <Route path='/plant' element={<PlantListPage />} />
          <Route path='/plant/:id' element={<PlantDetailPage />} />
          {/* 식물 일지 */}
          <Route path='/diary' element={<DiaryPage />} />
          {/* 식물 등록 */}
          <Route path='/register' element={<Register />} />
        </Routes>
        {/* 로그인 되어있어야 navbar 보이는 로직 추가하기 */}
      </BrowserRouter>
    </div>
  )
};

export default App;
