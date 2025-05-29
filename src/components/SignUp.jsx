// src/components/SignUp.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import './AuthForm.css'; // Your styles

// This will be replaced by Vite with the value from your .env file during the build process
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignUp = () => {
  const [fullName, setFullName] = useState(''); // Will be used as 'username' for the API
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For displaying API or validation errors
  const [successMessage, setSuccessMessage] = useState(''); // For success feedback
  const [isLoading, setIsLoading] = useState(false); // To manage loading state of the form
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission which causes a page reload
    setError(''); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages
    setIsLoading(true); // Set loading state to true

    // Basic client-side validation
    if (!fullName || !email || !password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      // Prepare the data for the API request
      // Your backend API /auth/register endpoint expects 'username', 'email', 'password'
      const userData = {
        username: fullName, // Map the form's 'fullName' to 'username'
        email: email,
        password: password,
      };

      // Make the API call to your backend's registration endpoint
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json(); // Parse the JSON response from the server

      if (!response.ok) {
        // If response is not OK (status code 2xx), throw an error
        // Use the message from the API if available, otherwise a generic error
        throw new Error(data.message || `HTTP error! Status: ${response.status}`);
      }

      // If registration is successful
      setSuccessMessage('Registration successful! You can now sign in.');
      console.log('Sign up successful:', data); // Log the response data (includes token and user info)

      // Clear the form fields after successful registration
      setFullName('');
      setEmail('');
      setPassword('');

      // Optional: Automatically redirect to the sign-in page after a short delay
      // setTimeout(() => {
      //   navigate('/signin');
      // }, 2000); // Redirect after 2 seconds

    } catch (err) {
      // If an error occurs during the fetch or if the API returns an error
      setError(err.message || 'Failed to sign up. Please try again.');
      console.error('Sign up error:', err);
    } finally {
      // This block will run regardless of success or failure
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="logo-container">
          {/* Replace with your actual logo component or image if needed */}
          <span className="logo-text-main">POINTS</span>
          <span className="logo-text-accent">Ê</span>
        </div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name (becomes your username)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
              required
              style={{ width: '100%', boxSizing: 'border-box', paddingRight: '2.5rem' }}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              style={{ width: '100%', boxSizing: 'border-box', paddingRight: '2.5rem' }}
            />
          </div>
          <div className="form-group">
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (min. 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                style={{ width: '100%', boxSizing: 'border-box', paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: '1.3rem',
                  color: '#555',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.362-2.7A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.043 5.197M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L6 6" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Display error messages */}
          {error && <p className="error-message">{error}</p>}
          {/* Display success messages */}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="switch-form-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;