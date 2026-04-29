import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  // 1. If not logged in, send to login page
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. If logged in but the role doesn't match the required role for this route
  if (allowedRole && currentUser.role !== allowedRole) {
    // Redirect them to their own dashboard instead of a generic error page
    const redirectPath = currentUser.role === 'Teacher' ? '/teacher' : '/student';
    return <Navigate to={redirectPath} replace />;
  }

  // 3. User is authorized, render the requested component
  return children;
};

export default ProtectedRoute;