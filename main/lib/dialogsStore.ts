import { create } from "zustand";

interface DialogsStoreState {
  signUpFormOpen: boolean;
  signInFormOpen: boolean;
  setSignInForm: (value: boolean) => void;
  setSignUpForm: (value: boolean) => void;
}

const useDialogsStore = create<DialogsStoreState>()((set) => ({
  signUpFormOpen: false,
  signInFormOpen: false,
  setSignUpForm: (value: boolean) => set({ signUpFormOpen: value }),
  setSignInForm: (value: boolean) => set({ signInFormOpen: value }),
}));

export default useDialogsStore;
