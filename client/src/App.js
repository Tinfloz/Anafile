import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Splash from './pages/Splash';
import Home from './pages/Home';
import Footer from './components/Footer';
import CreateCluster from './pages/CreateCluster';
import MyClusters from './pages/MyClusters';
import Cluster from './pages/Cluster';
import UploadFile from './pages/UploadFile';
import Test from './pages/Test';
import ViewFiles from './pages/ViewFiles';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/my/clusters" element={<MyClusters />} />
          <Route path="/cluster" element={<Cluster />} />
          <Route path="/create/cluster" element={<CreateCluster />} />
          <Route path="/upload/file/:id" element={<UploadFile />} />
          <Route path="/test" element={<Test />} />
          <Route path="/my/files/:clusterId" element={<ViewFiles />} />
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
