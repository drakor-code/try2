import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockLogin, mockRegister, mockGoogleLogin, type User } from './mock-auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  initialize: () => Promise<void>;
}

const TOKEN_KEY = 'auth-token';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      initialize: async () => {
        set({ isLoading: true });
        try {
          const token = localStorage.getItem(TOKEN_KEY);
          const storedUser = localStorage.getItem('auth-user');
          if (token && storedUser) {
            const user: User = JSON.parse(storedUser);
            set({ user, isAuthenticated: true, isLoading: false });
          } else {
            set({ isLoading: false });
          }
        } catch (e) {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const res = await mockLogin(email, password);
          localStorage.setItem(TOKEN_KEY, res.data.token);
          localStorage.setItem('auth-user', JSON.stringify(res.data.user));
          set({ user: res.data.user, isAuthenticated: true, isLoading: false });
        } catch (err: any) {
          set({ isLoading: false });
          throw new Error(err?.message || 'فشل في تسجيل الدخول');
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          const res = await mockRegister(userData);
          localStorage.setItem(TOKEN_KEY, res.data.token);
          localStorage.setItem('auth-user', JSON.stringify(res.data.user));
          set({ user: res.data.user, isAuthenticated: true, isLoading: false });
        } catch (err: any) {
          set({ isLoading: false });
          throw new Error(err?.message || 'فشل في التسجيل');
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true });
        try {
          const res = await mockGoogleLogin('mock-google-token');
          localStorage.setItem(TOKEN_KEY, res.data.token);
          localStorage.setItem('auth-user', JSON.stringify(res.data.user));
          set({ user: res.data.user, isAuthenticated: true, isLoading: false });
        } catch (err: any) {
          set({ isLoading: false });
          throw new Error(err?.message || 'فشل في تسجيل الدخول بـ Google');
        }
      },

      logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem('auth-user');
        set({ user: null, isAuthenticated: false, isLoading: false });
      },

      setUser: (user: User) => set({ user, isAuthenticated: true }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const initializeAuth = async () => {
  const { initialize } = useAuthStore.getState();
  await initialize();
};
