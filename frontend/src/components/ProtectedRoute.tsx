// src/components/ProtectedRoute.tsx
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, ...routeProps }) => {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return <Route {...routeProps} />;
};

export default ProtectedRoute;