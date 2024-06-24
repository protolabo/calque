import './App.css';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Testpage from './pages/Testpage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/test" element={<Testpage/>}/>
        </Route>
    </Routes>
    
  );  
}

export default App;
