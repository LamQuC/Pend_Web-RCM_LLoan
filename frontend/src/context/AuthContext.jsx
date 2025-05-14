import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Khởi tạo user từ localStorage ngay lập tức
  const initialUser = (() => {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const auth = localStorage.getItem('auth');
    console.log('AuthContext loaded:', { username, userId, auth });
    return username && userId && auth ? { username, userId } : null;
  })();

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    // Kiểm tra lại localStorage khi mount hoặc thay đổi
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const auth = localStorage.getItem('auth');
    if (username && userId && auth && (!user || user.username !== username)) {
      setUser({ username, userId });
    }
  }, []);

  const login = (username, userId, auth) => {
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
    localStorage.setItem('auth', auth);
    setUser({ username, userId });
    console.log('User logged in:', { username, userId, auth });
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('auth');
    setUser(null);
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};