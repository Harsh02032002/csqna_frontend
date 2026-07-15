import React, { createContext, useContext, useState } from 'react';
import api from '../utils/api';
import { UserDetails } from '../types';

interface AuthContextType {
  user: UserDetails | null;
  token: string | null;
  loading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateUser: (data: Partial<UserDetails>) => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDetails | null>(() => {
    try {
      const u = localStorage.getItem('userDetails');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  const login = async (emailOrUsername: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email: emailOrUsername, password });
      if (res.data && res.data.status) {
        const t = res.data.token;
        const u = res.data.data;
        const mappedUser: UserDetails = {
          id: u.id || u._id,
          name: u.name || u.fullname || u.username,
          email: u.email,
          username: u.username,
          role: u.role || 'user',
        };
        localStorage.setItem('token', t);
        localStorage.setItem('userDetails', JSON.stringify(mappedUser));
        setToken(t);
        setUser(mappedUser);
        return { success: true };
      } else {
        return { success: false, message: res.data?.message || 'Login failed' };
      }
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    setToken(null);
    setUser(null);
  };

  const updateUser = (data: Partial<UserDetails>) => {
    if (!user) return;
    const updated = { ...user, ...data } as UserDetails;
    setUser(updated);
    localStorage.setItem('userDetails', JSON.stringify(updated));
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
