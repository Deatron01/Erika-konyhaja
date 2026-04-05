import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Megnézzük, hogy a böngésző "emlékszik-e" a sikeres belépésre
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isAuthenticated) {
    // Ha nem, visszadobjuk a loginra
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;