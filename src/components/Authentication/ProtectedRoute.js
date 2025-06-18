import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.status);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!authStatus) {
    return <Navigate to={location.pathname} />;
  }
  return children;
}

export default ProtectedRoute;
