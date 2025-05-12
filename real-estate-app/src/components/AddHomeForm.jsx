import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddHomeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [sqfoot, setSqfoot] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");
    if (!token) {
      setError("You must be logged in to add a home.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("sqfoot", sqfoot);

    
    if (image) {
      formData.append("images", image);
    }

    try {
      const response = await axios.post("http://localhost:8000/homes/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Home added:", response);
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setBedrooms("");
      setBathrooms("");
      setSqfoot("");
      setImage(null);
      setError("");
    } catch (err) {
      console.error("Error adding home:", err);
      setError("There was an error adding the home.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "500px" }}>
        <h1 className="text-center mb-4">Add a New Home</h1>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Price"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Location"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Bedrooms"
              className="form-control"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Bathrooms"
              className="form-control"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Square Footage"
              className="form-control"
              value={sqfoot}
              onChange={(e) => setSqfoot(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Add Home
          </button>

          <div className="mt-3 text-center">
            <Link to="/homes" className="btn btn-outline-dark w-100">
              View Your Homes
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

// export default AddHomeForm;
export default AddHomeForm;


