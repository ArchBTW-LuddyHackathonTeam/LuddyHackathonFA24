import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  sessionToken: string | null;
  setSessionToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  sessionToken: null,
  setSessionToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionToken, setSessionToken] = useState<string | null>(
    localStorage.getItem('sessionToken')
  );

  const handleSetSessionToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('sessionToken', token);
    } else {
      localStorage.removeItem('sessionToken');
    }
    setSessionToken(token);
  };

  return (
    <AuthContext.Provider value={{ sessionToken, setSessionToken: handleSetSessionToken }}>
      {children}
    </AuthContext.Provider>
  );
};