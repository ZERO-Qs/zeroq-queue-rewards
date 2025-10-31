import React, { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userType: 'user' | 'globalAdmin' | 'orgAdmin' | null;
  isAdmin: boolean;
  login: (type: 'user' | 'globalAdmin' | 'orgAdmin') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userType, setUserType] = useState<'user' | 'globalAdmin' | 'orgAdmin' | null>(null);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (userType) {
      localStorage.setItem('userType', userType);
    } else {
      localStorage.removeItem('userType');
    }
  }, [userType]);

  const login = (type: 'user' | 'globalAdmin' | 'orgAdmin') => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    setUserType(null);
    // Call backend logout endpoint
    fetch("/api/logout", { method: "POST" }).catch((error) =>
      console.error("Error logging out on backend:", error)
    );
  };

  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      userType,
      isAdmin: userType === 'globalAdmin' || userType === 'orgAdmin',
      login,
      logout,
    }),
    [isLoggedIn, userType]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};