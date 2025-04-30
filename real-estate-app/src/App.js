import React, { useState, useEffect } from 'react'; //para login con localStorage
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Homelist from './components/HomeList';
import AddHomeForm from './components/AddHomeForm';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  //auto login si el token ya esta en localstorag
  useEffect(()=>{
    const token = localStorage.getItem("access");
    if(token) setIsLoggedIn(true);
  },[] ) ;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homelist />} />
        <Route path="/login" element={<Login onLogin={()=> setIsLoggedIn(true)} />} /> {/* Pass setIsLoggedIn to Login */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login onLogin={() => setIsLoggedIn (true)} />} /> {/* Protect dashboard route */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/add-home" element={<AddHomeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
