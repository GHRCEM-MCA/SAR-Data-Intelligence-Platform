import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // In a real application, validate the JWT token structure and expiry here
  const isAuthenticated = Boolean(localStorage.getItem('jwt_token')); 
  
  if (!isAuthenticated) {
    // Redirect unauthenticated users to login, replacing the history state
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}