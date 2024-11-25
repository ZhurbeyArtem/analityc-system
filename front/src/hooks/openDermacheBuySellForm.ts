import { BuySellType } from '@/enums/dermache.enum';
import { create } from 'zustand'



type BuySellDermacheState = {
  isOpen: boolean;
  setOpen: () => void;
  type: BuySellType;
  setType: (data: BuySellType) => void;

  ticker: string;
  setTicker: (data: string) => void;
};

export const useBuySellDermacheForm = create<BuySellDermacheState>((set) => ({
  isOpen: false,
  setOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  type: BuySellType.buy,
  setType: (data: BuySellType) => set(() => ({ type: data })),
  ticker: '',
  setTicker: (data: string) => set(() => ({ ticker: data }))
}));

