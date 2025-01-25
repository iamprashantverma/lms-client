import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import AdminRoutes from './AdminRoutes';

function PublicRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* Delegate /admin routes to AdminRoutes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}

export default PublicRoutes;
