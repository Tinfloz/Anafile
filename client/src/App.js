import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Splash from './pages/Splash';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Splash />} />
        </Routes>
        <div
          className='flex justify-center items-center sticky absolute bottom-5'
        >
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
