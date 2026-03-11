import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PassportProvider } from "./context/PassportContext";

import NavBar from './components/NavBar';

import Home from './pages/Home';
import Passport from './pages/Passport';
import ParkDetail from './pages/ParkDetail';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css'
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <PassportProvider>
    <Router>
      <NavBar/>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/passport" element={<Passport />}/>
          <Route path="/park/:id" element={<ParkDetail/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>

        </Routes>
      </main>
    </Router>
    </PassportProvider>
  );
}
export default App;