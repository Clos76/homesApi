import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const HomeList = () => {
  const [homes, setHomes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          setError("You must be logged in to view the homes.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:8000/homes/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHomes(response.data.homes);
      } catch (err) {
        console.error("Error fetching homes:", err);
        setError("There was an error fetching the homes.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomes();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading homes...</p>;
  }

  return (
    <>
      {/* Header/Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">My Real Estate</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/add-home">Add Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Logout</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <h2 className="text-center mb-4">Available Homes</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {homes.length === 0 ? (
          <p className="text-center text-muted">No homes available.</p>
        ) : (
          <div className="row">
            {homes.map((home) => (
              <div key={home.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm">
                  {home.images && (
                    <img
                      src={`http://localhost:8000${home.images}`}
                      alt={home.title}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{home.title}</h5>
                    <p className="card-text text-muted">{home.location}</p>
                    <p className="card-text">{home.description}</p>
                    <p className="card-text fw-bold">${home.price}</p>
                    <small className="text-muted">
                      Bedrooms: {home.bedrooms} | Bathrooms: {home.bathrooms}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Home Button */}
        <div className="text-center mt-4">
          <Link to="/add-home" className="btn btn-success">
            Add New Home
          </Link>

          
        </div>
      </div>
    </>
  );
};

export default HomeList;
