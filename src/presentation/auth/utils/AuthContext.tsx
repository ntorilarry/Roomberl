import React, { createContext, useState, useEffect } from "react";

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

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");
    if (access_token) {
      setToken(access_token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (id: string) => {
    setToken(id);
    setIsAuthenticated(true);
    sessionStorage.setItem('access_token', id);
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem("access_token");
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
