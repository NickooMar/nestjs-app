import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile } from '@/types/auth.types';

type State = {
  token: string | null;
  profile: Profile | null;
  isAuth: boolean;
};

type Actions = {
  setToken: (token: string) => void;
  setProfile: (profile: Profile) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    set => ({
      token: null,
      profile: null,
      isAuth: false,
      setToken: (token: string) =>
        set(() => ({
          token,
          isAuth: true,
        })),
      setProfile: (profile: Profile) => set(() => ({ profile })),
      logout: () =>
        set(() => ({
          token: null,
          profile: null,
          isAuth: false,
        })),
    }),
    {
      name: 'auth',
    }
  )
);
