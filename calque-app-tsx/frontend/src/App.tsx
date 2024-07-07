import './App.css';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Testpage from './pages/Testpage';
import Preview from './pages/Preview';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout/>}>
         
          
        </Route>
        <Route path="/test" element={<Testpage/>}/>
        <Route path="/preview" element={<Preview/>}/>
    </Routes>
    
  );  
}

export default App;
