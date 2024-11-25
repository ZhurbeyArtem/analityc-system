"use client"

import { create } from 'zustand'
import { useEffect } from 'react';

type AuthFormState = {
  isAuth: boolean;
  email: string;
  setAuth: (data: boolean) => void;
  setEmail: (data: string) => void;
};


export const useAuthUser = create<AuthFormState>((set) => ({
  isAuth: false,
  email: '',
  setAuth: (data: boolean) => set(() => ({ isAuth: data })),
  setEmail: (data: string) => set(() => ({ email: data })),
}));


export const useInitializeAuthUser = () => {
  const setAuth = useAuthUser((state) => state.setAuth);
  const setEmail = useAuthUser((state) => state.setEmail);

  useEffect(() => {
    // ініциалізація після рендеренгу на клієнті
    const tokens = localStorage.getItem('tokens');
    const email = localStorage.getItem('email') || '';

    setAuth(!!tokens);
    setEmail(email);
  }, [setAuth, setEmail]);
};
