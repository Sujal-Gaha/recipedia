import { User } from '@prisma/client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type TUserType = Pick<User, 'id' | 'email' | 'name' | 'is_email_verified' | 'image' | 'user_type'>;

type TState = {
  user: TUserType | null;
};

type TAction = {
  setUser: (user: TUserType | null) => void;
};

export const useUserStore = create<TState & TAction>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
