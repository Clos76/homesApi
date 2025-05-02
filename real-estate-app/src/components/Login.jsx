import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState(null);
  const navigate = useNavigate();

  const MAX_ATTEMPTS = 5;
  const BLOCK_DURATION_MS = 60 * 1000; // 1 minute

  const isBlocked = blockedUntil && Date.now() < blockedUntil;

  // Reset block when time passes
  useEffect(() => {
    if (!blockedUntil) return;
    const interval = setInterval(() => {
      if (Date.now() >= blockedUntil) {
        setBlockedUntil(null);
        setAttempts(0);
        setError("");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [blockedUntil]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isBlocked) {
      const secondsLeft = Math.ceil((blockedUntil - Date.now()) / 1000);
      setError(`Too many attempts. Try again in ${secondsLeft} seconds.`);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      const { access, refresh } = res.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      setAttempts(0);
      setBlockedUntil(null);
      setError("");
      onLogin();
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        setBlockedUntil(Date.now() + BLOCK_DURATION_MS);
        setError("Too many failed attempts. You are temporarily blocked for 1 minute.");
      } else {
        setError(`Invalid credentials. Attempt ${newAttempts} of ${MAX_ATTEMPTS}.`);
      }
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4 text-primary">Login to Your Account</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isBlocked}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isBlocked}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={isBlocked}>
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-muted mt-3 mb-0">
          Don’t have an account? <a href="/signup" className="text-decoration-none">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
