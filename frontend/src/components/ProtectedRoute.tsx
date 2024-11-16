import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { sessionToken } = useAuth();

  if (!sessionToken) {
    // User is not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;