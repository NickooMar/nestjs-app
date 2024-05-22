import { ProtectedRouteProps } from '@/types/auth.types';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }: ProtectedRouteProps) => {
  if (!isAuthenticated) return <Navigate to="/auth/signin" />;

  return children ? <div>{children}</div> : <Outlet />;
};

export default ProtectedRoute;
