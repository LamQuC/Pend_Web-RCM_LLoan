import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const auth = localStorage.getItem('auth');
    if (username && userId && auth) {
      setUser({ username, userId });
    }
  }, []);

  const login = (username, userId, auth) => {
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
    localStorage.setItem('auth', auth);
    setUser({ username, userId });
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('auth');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};