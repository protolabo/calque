import './App.css';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Testpage from './pages/Testpage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout/>}>
          
        </Route>
        <Route path="/test" element={<Testpage/>}/>
    </Routes>
    
  );  
}

export default App;
