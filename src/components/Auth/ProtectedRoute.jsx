import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // TODO: Ide jön majd a valódi autentikációs logika (pl. Firebase, Supabase, JWT token ellenőrzés)
  const isAuthenticated = true; // Most 'true'-ra állítva, hogy meg tudd nézni az Admin oldalt!

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;