import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useSettings } from '../hooks/useSettings';

const AuthContext = createContext(null);
const KEY = 'sarAdmin';

export function AuthProvider({ children }) {
  const { settings } = useSettings();
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem(KEY) === 'ok');

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEY) setIsAuthed(e.newValue === 'ok');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = useCallback((password) => {
    const target = settings?.adminPassword ?? '';
    if (password && password === target) {
      sessionStorage.setItem(KEY, 'ok');
      setIsAuthed(true);
      return true;
    }
    return false;
  }, [settings?.adminPassword]);

  const logout = useCallback(() => {
    sessionStorage.removeItem(KEY);
    setIsAuthed(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
