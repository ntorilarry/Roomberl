import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
  login: (id: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  setToken: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [code_name, setCode_name] = useState<string | null>(
    sessionStorage.getItem("code_name")
  );
  const idleTimeout = 300000; // 10 minutes in milliseconds
  const navigate = useNavigate(); // Hook for navigation
  let idleTimer: NodeJS.Timeout;

  const resetTimer = () => {
    if (idleTimer) {
      clearTimeout(idleTimer);
    }
    idleTimer = setTimeout(logout, idleTimeout);
  };

  const handleUserActivity = () => {
    resetTimer();
  };

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");
    if (access_token) {
      setToken(access_token);
      setIsAuthenticated(true);
      resetTimer();
    }

    // Add event listeners to detect user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
    };
  }, []);

  const login = (id: string) => {
    setToken(id);
    setIsAuthenticated(true);
    sessionStorage.setItem("access_token", id);
    resetTimer();
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem("access_token");

    // Clear idle timer on logout
    if (idleTimer) {
      clearTimeout(idleTimer);
    }

    // Navigate to login page
    navigate(`/auth/login/${code_name}`);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, setToken, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
