import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth from localStorage
  useEffect(() => {
    const initAuth = async () => {
      let token = null;
      let savedUser = null;
      try {
        token = localStorage.getItem('smartnotes_token');
        savedUser = localStorage.getItem('smartnotes_user');
      } catch (e) {}
      if (token && savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          setIsAuthenticated(true);
          // Verify token is still valid
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
            try {
              localStorage.setItem('smartnotes_user', JSON.stringify(res.data.user));
            } catch (e) {}
          }
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, user: userData } = res.data;
    try {
      localStorage.setItem('smartnotes_token', token);
      localStorage.setItem('smartnotes_user', JSON.stringify(userData));
    } catch (e) {}
    setUser(userData);
    setIsAuthenticated(true);
    return res.data;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token, user: userData } = res.data;
    try {
      localStorage.setItem('smartnotes_token', token);
      localStorage.setItem('smartnotes_user', JSON.stringify(userData));
    } catch (e) {}
    setUser(userData);
    setIsAuthenticated(true);
    return res.data;
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('smartnotes_token');
      localStorage.removeItem('smartnotes_user');
    } catch (e) {}
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;

