import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = (WrappedComponent: React.ComponentType<any>) => {
  const AuthGuard: React.FC = (props) => {
    const navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem("access_token"); // Check if user is authenticated

    useEffect(() => {
      const verifyToken = async () => {
        try {
          // Redirect to login page if user is not authenticated
          if (!isAuthenticated) {
            navigate("/auth/login");
            return;
          }
        } catch (error) {
          console.error("Token verification error:", error);
          // Handle any verification errors, e.g., log out the user
          navigate("/auth/login");
        }
      };

      verifyToken();
    }, [navigate, isAuthenticated]);

    // Render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthGuard;
};

export default ProtectedRoutes;
