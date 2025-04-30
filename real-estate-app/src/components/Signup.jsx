import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:8000/api/register/', formData);
      setSuccess(res.data.message);
      setTimeout(() => navigate('/login'), 1500); // Redirect to login
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto mt-16 bg-blue-50 rounded-3xl shadow-2xl border-2 border-blue-300">
    <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-10 uppercase">Sign Up Now</h2>
  
    {error && <p className="text-red-600 text-lg text-center font-semibold mb-6">{error}</p>}
    {success && <p className="text-green-600 text-lg text-center font-semibold mb-6">{success}</p>}
  
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-2xl font-bold text-lg tracking-wider shadow-lg transition-all duration-300"
      >
        Register
      </button>
    </form>
  </div>
  
  
  );
};

export default Signup;
