// src/App.jsx
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard'; // Import Dashboard
import './components/AuthForm.css'; // Styles for auth forms


// Helper component for protected routes
const ProtectedRoute = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    // If no token, redirect to signin page
    return <Navigate to="/signin" replace />;
  }
  // If token exists, render the child routes/component
  return <Outlet />; // Outlet renders the nested child route component (e.g., Dashboard)
};

// Helper component for public routes (e.g., signin/signup should not be accessible if logged in)
const PublicRoute = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // If token exists (user is logged in), redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }
  // If no token, render the child routes/component (e.g., SignIn, SignUp)
  return <Outlet />;
};


function App() {

  return (
   <div>
      <Routes>
        {/* Public Routes - redirect to dashboard if logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Protected Routes - redirect to signin if not logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other protected routes here */}
        </Route>

        {/* Default route */}
        <Route
          path="/"
          element={localStorage.getItem('authToken') ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />}
        />

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}
export default App
