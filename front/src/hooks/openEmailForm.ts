import { create } from 'zustand'

type AuthFormState = {
  isOpen: boolean;
  setOpen: () => void;
};

export const useEmailForm = create<AuthFormState>((set) => ({
  isOpen: false,
  setOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

