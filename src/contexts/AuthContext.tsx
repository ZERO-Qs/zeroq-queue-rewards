import React, { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userType: 'user' | 'globalAdmin' | 'orgAdmin' | null;
  organizationId: string | null;
  isAdmin: boolean;
  login: (type: 'user' | 'globalAdmin' | 'orgAdmin', organizationId?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });
  const [userType, setUserType] = useState<'user' | 'globalAdmin' | 'orgAdmin' | null>(() => {
    const storedUserType = localStorage.getItem('userType');
    return storedUserType as 'user' | 'globalAdmin' | 'orgAdmin' | null;
  });
  const [organizationId, setOrganizationId] = useState<string | null>(() => {
    const storedOrganizationId = localStorage.getItem('organizationId');
    return storedOrganizationId || null;
  });

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

  useEffect(() => {
    if (organizationId) {
      localStorage.setItem('organizationId', organizationId);
    } else {
      localStorage.removeItem('organizationId');
    }
  }, [organizationId]);

  const login = (type: 'user' | 'globalAdmin' | 'orgAdmin', orgId?: string) => {
    setIsLoggedIn(true);
    setUserType(type);
    if (orgId) {
      setOrganizationId(orgId);
    }
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("organizationId");
    setIsLoggedIn(false);
    setUserType(null);
    setOrganizationId(null);
    // Call backend logout endpoint
    fetch("/api/logout", { method: "POST" }).catch((error) =>
      console.error("Error logging out on backend:", error)
    );
  };

  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      userType,
      organizationId,
      isAdmin: userType === 'globalAdmin' || userType === 'orgAdmin',
      login,
      logout,
    }),
    [isLoggedIn, userType, organizationId]
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