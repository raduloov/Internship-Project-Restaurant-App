import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
