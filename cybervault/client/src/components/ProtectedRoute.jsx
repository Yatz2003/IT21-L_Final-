import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/dashboard', {
          credentials: 'include',
        });
        setAuthorized(response.ok);
      } catch (error) {
        setAuthorized(false);
      }
    };
    checkAuth();
  }, []);

  if (authorized === null) {
    return <div className="text-center text-sm text-[#8db4d4]">Verifying access...</div>;
  }

  return authorized ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
