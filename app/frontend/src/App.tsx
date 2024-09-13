import './App.css';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import MapCreationPage from './pages/MapCreationPage';
import UserMainPage from './pages/UserMainPage';
//import Testpage from './pages/TestPage';
import MainMenu from './pages/MainMenu';
import LandingPage from './pages/LandingPage';
import EndUserPage from './pages/EndUserPage';

function App() { // changé la route pour /test à l'élément MainMenu, car je pouvais pas comment-out
  return (
    <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<MainMenu/>} />
          <Route path='/create-map' element={<MapCreationPage/>}/>
        </Route>
        <Route path='/user' element={<UserMainPage/>}/>
        {/*<Route path='/test' element={<TestPage/>}/>*/}
        <Route path='land' element={<LandingPage/>}/>
        <Route path='map' element={<EndUserPage/>}/>
    </Routes>
    
  );  
}

export default App;
