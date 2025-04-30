import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      console.log(res.data); // Token para log

      const { access, refresh } = res.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      setError("");
      onLogin(); // poner a  isLoggedIn a true para que este ingresado
      navigate("/dashboard"); //redirectionar al dashboard
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
    
    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        Login
      </button>
    </form>

    <p className="text-sm text-center text-gray-500 mt-4">
      Don’t have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
    </p>
  </div>
</div>

  );
};

export default Login;
