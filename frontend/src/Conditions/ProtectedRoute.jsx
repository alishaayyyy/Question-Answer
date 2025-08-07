// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("userRole");

  if (userRole === null) {
    // Show loading if role is not yet available
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
