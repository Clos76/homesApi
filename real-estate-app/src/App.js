import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homelist from './components/HomeList';
import AddHomeForm from './components/AddHomeForm';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import HomePage from './pages/homePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/add-home" element={<AddHomeForm />} />
        <Route path="/homes" element={<Homelist />} />
      </Routes>
    </Router>
  );
}

export default App;
