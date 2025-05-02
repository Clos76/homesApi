import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); //place inside to use navigate


  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        setUsername(decoded.username || decoded.name);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  //logout 

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login"); // Or "/" depending on your app
  };


  return (
    <div className="container my-4">
      <h2 className="h4 mb-4">
        Welcome back, {username ? username : "User"}!
      </h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Your Profile</h5>
          <p className="card-text">Email: john@example.com</p>
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Your Recent Activity</h5>
          <ul>
            <li>Added a new home: Beachfront Villa</li>
            <li>Saved a home: Cozy Apartment in Rosarito</li>
          </ul>
        </div>
      </div>

      <div className="d-flex gap-2 mb-4">
        <Link to="/add-home" className="btn btn-success">
          Add New Home
        </Link>
        <Link to="/homes" className="btn btn-dark">
          View Your Homes
        </Link>
        <Link to="/" className="btn btn-info">
          Home Page
        </Link>
        <button onClick={handleLogout} className='btn btn-danger'>
        Logout
        </button>

        
      </div>

      <div className="alert alert-warning" role="alert">
        <h5 className="alert-heading">Important Updates</h5>
        <ul>
          <li>Don't miss our new promotion on beachfront properties!</li>
        </ul>
      </div>
    </div>


  );



};

export default Dashboard;
