import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

//set is from zustand
export const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
