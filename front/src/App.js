import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import StartPage from './routes/start/StartPage';
import MainPage from './routes/main/MainPage';
import PlantList from './routes/plant/PlantList';
import Diary from './routes/diary/Diary';
import ScrollToTop from './components/scrolltotop/ScrollToTop';
import PlantDetail from './routes/plant/PlantDetail';
import NavBar from './components/navbar/NavBar';
import Register from './routes/register/Register';
import StartPage from './routes/Start/StartPage';

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
          <Route path='/plant' element={<PlantList />} />
          <Route path='/plant/:id' element={<PlantDetail />} />
          {/* 식물 일지 */}
          <Route path='/diary' element={<Diary />} />
          {/* 식물 등록 */}
          <Route path='/register' element={<Register />} />
        </Routes>
        {/* 로그인 되어있어야 navbar 보이는 로직 추가하기 */}
        <NavBar />
      </BrowserRouter>
    </div>
  )
};

export default App;
