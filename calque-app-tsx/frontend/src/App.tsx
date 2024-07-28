import './App.css';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import MapCreationPage from './pages/MapCreationPage';
import UserMainPage from './pages/UserMainPage';
import Testpage from './pages/TestPage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout/>}>
        </Route>
        <Route path='/create-map' element={<MapCreationPage/>}/>
        <Route path='/user' element={<UserMainPage/>}/>
        <Route path='/test' element={<Testpage/>}/>
    </Routes>
    
  );  
}

export default App;
