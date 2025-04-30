import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded)
        setUsername(decoded.username || decoded.name);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  return (
    <div className="dashboard-container p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Welcome back, {username ? username : "User"}!
      </h2>
      
      <div className="profile-info bg-white shadow p-4 rounded mb-4">
        <h3 className="text-lg font-semibold mb-2">Your Profile</h3>
        <p>Email: john@example.com</p>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Edit Profile</button>
      </div>

      <div className="activity-feed bg-white shadow p-4 rounded mb-4">
        <h3 className="text-lg font-semibold mb-2">Your Recent Activity</h3>
        <ul className="list-disc ml-6">
          <li>Added a new home: Beachfront Villa</li>
          <li>Saved a home: Cozy Apartment in Rosarito</li>
        </ul>
      </div>

      <div className="quick-actions flex gap-4 mb-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded">Add New Home</button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded">View Your Homes</button>
      </div>

      <div className="notifications bg-yellow-100 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Important Updates</h3>
        <ul className="list-disc ml-6">
          <li>Don't miss our new promotion on beachfront properties!</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
