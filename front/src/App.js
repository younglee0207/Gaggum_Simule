import './App.css';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import StartPage from './routes/Start/StartPage';
import MainPage from './routes/main/MainPage';
import PlantList from './routes/plant/PlantList';
import PlantListItem from './routes/plant/PlantListItem';
import Diary from './routes/diary/Diary';
import ScrollToTop from './components/scrolltotop/ScrollToTop';
import Header from './components/header/Header';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
      
      <ScrollToTop />
        <Routes>
          {/* 시작화면 */}
          <Route path='/' element={<StartPage />} />
          {/* 메인화면 */}
          <Route path='/main' element={<MainPage />} />
          {/* 내 식물 */}
          <Route path='/plant' element={<PlantList />} />
          <Route path='/plant/:id' element={<PlantListItem />} />
          {/* 식물 일지 */}
          <Route path='/diary' element={<Diary />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;
