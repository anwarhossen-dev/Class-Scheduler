import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

/**
 * PrivateRoute component ensures that only authenticated users can access specific routes.
 * If the user is not logged in, it redirects them to the login page and saves the 
 * location they were trying to access.
 */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Note: Based on your AuthProvider implementation, children only render when 
  // loading is false. However, keeping this check ensures robustness.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;