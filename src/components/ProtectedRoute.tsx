import { useAuthContext } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from './Loading';

type ProtectedRouteProps = {
  allowedRoles?: ('ADMIN' | 'USER')[];
  fallbackPath?: string;
};

const ProtectedRoute = ({
  allowedRoles,
  fallbackPath = '/login',
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={fallbackPath} replace />;
  }

  if (!allowedRoles) {
    return <Outlet />;
  }

  const hasAccess = user && allowedRoles.includes(user);
  return hasAccess ? <Outlet /> : <Navigate to={fallbackPath} replace />;
};

export default ProtectedRoute;
