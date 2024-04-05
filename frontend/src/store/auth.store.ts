import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile } from '@/types/auth.types';

type State = {
  token: string | null;
  profile: Profile | null;
};

type Actions = {
  setToken: (token: string) => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    set => ({
      token: null,
      profile: null,
      setToken: (token: string) =>
        set(() => ({
          token,
        })),
    }),
    {
      name: 'auth',
    }
  )
);
