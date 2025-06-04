// src/components/SignIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import './AuthForm.css'; // Your styles

// This will be replaced by Vite with the value from your .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignIn = () => {
  const [email, setEmail] = useState(''); // Clear pre-filled email for general use
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For displaying API or validation errors
  const [isLoading, setIsLoading] = useState(false); // To manage loading state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const navigate = useNavigate(); // Hook from react-router-dom to navigate programmatically

  // Placeholder for a global auth context/function to update login state
  // Example: const { setAuthToken, setCurrentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous errors
    setIsLoading(true); // Set loading state

    // Basic client-side validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }

    try {
      // Prepare the data for the API request
      const loginData = {
        email: email,
        password: password,
      };

      // Make the API call to your backend's login endpoint
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json(); // Parse the JSON response

      if (!response.ok) {
        // If response is not OK, throw an error using the API's message
        throw new Error(data.message || `HTTP error! Status: ${response.status}`);
      }

      // If login is successful
      console.log('Sign in successful:', data); // Log the response (token, user info)

      // IMPORTANT: Handle the authentication token and user data
      if (data.token && data.user) {
        // Store the token (e.g., in localStorage, sessionStorage, or an auth context)
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('authUser', JSON.stringify(data.user)); // Store user info

        // If you have a global auth state (e.g., using Context API):
        // setAuthToken(data.token);
        // setCurrentUser(data.user);

        // Navigate to a protected route (e.g., dashboard)
        navigate('/dashboard'); // Make sure you have a '/dashboard' route defined in App.jsx
      } else {
        // This case should ideally not happen if the API is designed correctly
        setError('Login successful, but token or user data was not received.');
      }

    } catch (err) {
      // If an error occurs
      setError(err.message || 'Failed to sign in. Please check your credentials.');
      console.error('Sign in error:', err);
    } finally {
      // This runs regardless of success or failure
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="logo-container">
          <span className="logo-text-main">POINTS</span>
          <span className="logo-text-accent">Ê</span>
        </div>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div className="form-group">
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
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
                  height: '100%',
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

     
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="switch-form-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;