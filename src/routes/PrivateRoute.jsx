import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  if (!isAuthenticated) return <Navigate to="/" />;
  if (allowedRoles.includes(user?.role)) return <Outlet />;
  
  return <Navigate to="/" />;
};

export default PrivateRoute;
