import { IPortfolio } from '@/interfaces/IPortfolio';
import { create } from 'zustand';

type PortfolioFormState = {
  isOpen: boolean;
  setOpen: () => void;

  data: IPortfolio;
  setData: (data: IPortfolio) => void;


  type: 'create' | 'edit';
  setType: (data: "create" | 'edit') => void;
};

export const usePortfolioForm = create<PortfolioFormState>((set) => ({
  isOpen: false,
  setOpen: () => set((state) => ({ isOpen: !state.isOpen })),

  data: {
    id: 0,
    title: '',
    description: ''
  },
  setData: (data: IPortfolio) => set(() => ({ data })),

  type: 'create',
  setType: (data: 'create' | 'edit') => set(() => ({ type: data }))
}));
