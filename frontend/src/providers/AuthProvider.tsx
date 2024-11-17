import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkSession } from '../services/api'; // We'll implement this function.

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if the session is valid on app load
    const verifySession = async () => {
      try {
        const response = await checkSession();
        if (response.isValid) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifySession();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};