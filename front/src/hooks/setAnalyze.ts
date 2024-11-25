import { IAnalyze } from '@/interfaces/IAnalyze';
import { create } from 'zustand'

type AnalyzeFormState = {
  isOpen: boolean;
  setOpen: () => void;

  result: IAnalyze | null;
  setResult: (data: IAnalyze) => void;
};

export const useAnalyze = create<AnalyzeFormState>((set) => ({
  isOpen: false,
  setOpen: () => set((state) => ({ isOpen: !state.isOpen })),

  result: null,
  setResult: (data: IAnalyze) => set(() => ({ result: data }))
}));

