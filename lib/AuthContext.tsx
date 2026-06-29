'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/v1';
const ACCESS_TOKEN_KEY = 'access_token';
const CURRENT_USER_KEY = 'uh-current-user';

export interface User {
  id: string;
  fullName: string;
  email: string;
  accountNumber: string;
  serviceType: 'ELECTRIC' | 'GAS' | 'WATER';
  accountType: 'RESIDENTIAL' | 'COMMERCIAL';
  serviceAddress: string;
  createdAt: string;
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  serviceType: 'ELECTRIC' | 'GAS' | 'WATER';
  accountType: 'RESIDENTIAL' | 'COMMERCIAL';
  serviceAddress: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface AuthResponse {
  accessToken: string;
  user: User;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  const handleAuthSuccess = (data: AuthResponse) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg =
          body?.error?.message ??
          (res.status === 401 ? 'Invalid email or password.' : 'Login failed. Please try again.');
        return { success: false, error: msg };
      }
      const data: AuthResponse = await res.json();
      handleAuthSuccess(data);
      return { success: true };
    } catch {
      return { success: false, error: 'Unable to reach the server. Please check your connection.' };
    }
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg =
          body?.error?.message ??
          (res.status === 409
            ? 'An account with this email already exists.'
            : 'Sign up failed. Please try again.');
        return { success: false, error: msg };
      }
      const authData: AuthResponse = await res.json();
      handleAuthSuccess(authData);
      return { success: true };
    } catch {
      return { success: false, error: 'Unable to reach the server. Please check your connection.' };
    }
  };

  const logout = () => {
    fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {});
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export function getInitials(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}
