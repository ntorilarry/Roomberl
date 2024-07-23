import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRoutesProps {
  allowedRoles: string[];
}

const ProtectedRoutes = (
  WrappedComponent: React.ComponentType<any>,
  { allowedRoles }: ProtectedRoutesProps
) => {
  const AuthGuard: React.FC = (props) => {
    const navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem("access_token"); // Check if user is authenticated
    const roles = sessionStorage.getItem("roles");
    const [code_name, setCode_name] = useState<string | null>(
      sessionStorage.getItem("code_name")
    );

    useEffect(() => {
      const verifyToken = async () => {
        try {
          // Redirect to login page if user is not authenticated
          if (!isAuthenticated) {
            navigate(`/auth/login/${code_name}`);
            return;
          }

          // Authorization check
          if (
            allowedRoles &&
            roles?.includes &&
            !allowedRoles.includes(roles)
          ) {
            navigate("/auth/unauthorized");
          }
        } catch (error) {
          console.error("Token verification error:", error);
          // Handle any verification errors, e.g., log out the user
          navigate(`/auth/login/${code_name}`);
        }
      };

      verifyToken();
    }, [navigate, isAuthenticated, allowedRoles, roles]);

    // Render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthGuard;
};

export default ProtectedRoutes;
