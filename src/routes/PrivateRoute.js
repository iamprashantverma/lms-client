import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function PrivateRoute() {
  console.log("i m from private route")
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'ADMIN') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
