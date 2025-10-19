
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import LinesPage from './pages/LinesPage.tsx';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/lines" element={<LinesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
