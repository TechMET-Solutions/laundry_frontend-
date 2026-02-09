import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show nothing or loader while checking auth
  if (loading) {
    return null;
  }

  // If not logged in → redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If logged in → show protected content
  return children;
};

export default ProtectedRoute;