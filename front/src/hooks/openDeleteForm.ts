import { EDeleteFormState } from '@/enums/deleteForm.enum';
import { create } from 'zustand'


type FormState = {
  isOpen: boolean;
  setOpen: () => void;

  id: number;
  setId: (data: number) => void;

  type: EDeleteFormState;
  setType: (data: EDeleteFormState) => void;
};

export const useDeleteForm = create<FormState>((set) => ({
  isOpen: false,
  setOpen: () => set((state) => ({ isOpen: !state.isOpen })),

  id: 0,
  setId: (data) => set(() => ({ id: data })),

  type: EDeleteFormState.portfolio,
  setType: (data: EDeleteFormState) => set(() => ({ type: data }))
}));

