// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // We'll create a simple CSS for this

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Try to get user data from localStorage
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        // Handle corrupted data: logout and redirect
        handleLogout();
      }
    } else {
      // If no user data, redirect to sign-in (this is a basic protection)
      // More robust protection should be handled in App.jsx routes
      console.log("No user data found in localStorage, redirecting to signin.");
      navigate('/signin');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');

    // Optionally, call an API endpoint to invalidate the token on the server

    // Redirect to sign-in page
    navigate('/signin');
  };

  if (!user) {
    // Still loading user data or redirecting
    return (
      <div className="dashboard-container">
        <p>Loading dashboard or redirecting...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard, {user.username || user.name || 'User'}!</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <div className="dashboard-content">
        <p>This is your personal dashboard.</p>
        <p>You are successfully logged in.</p>
        {/* You can add more dashboard-specific content here */}
        <div className="user-info">
          <h3>Your Information:</h3>
          <p><strong>Email:</strong> {user.email}</p>
          {user.createdAt && <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;