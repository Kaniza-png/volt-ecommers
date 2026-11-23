import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('volt_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('volt_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('volt_user');
    }
  }, [user]);

  const login = async (email, password) => {
    // Jika Supabase sudah dikonfigurasi di .env
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      const loggedUser = {
        id: data.user.id,
        email: data.user.email,
        fullName: profile?.full_name || email.split('@')[0],
        role: profile?.role || (email.includes('admin') ? 'admin' : 'customer'),
      };
      setUser(loggedUser);
      return loggedUser;
    }

    // Fallback Lokal agar langsung bisa diuji tanpa menunggu .env
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'customer';
    const localUser = {
      id: `user-${Date.now()}`,
      email,
      fullName: role === 'admin' ? 'Admin VOLT' : email.split('@')[0],
      role,
    };
    setUser(localUser);
    return localUser;
  };

  const register = async (fullName, email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          full_name: fullName,
          email,
          role: email.toLowerCase().includes('admin') ? 'admin' : 'customer',
        });
      }
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email,
      fullName,
      role: email.toLowerCase().includes('admin') ? 'admin' : 'customer',
    };
    setUser(newUser);
    return newUser;
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);