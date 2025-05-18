import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  email: string | null;
  isLoggedIn: boolean;
  setEmail: (email: string) => void;
  clearEmail: () => void;
  login: (email: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      isLoggedIn: false,
      setEmail: (email) => set({ email }),
      clearEmail: () => set({ email: null }),
      login: (email) => set({ email, isLoggedIn: true }),
      logout: () => set({ email: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 키 이름
    }
  )
);