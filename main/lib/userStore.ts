import { create } from "zustand";
import { UserSignInType, UserSignUpType, UserType } from "./types";

type UserDataStoreType = {
  setUserData: (data: UserType) => void;
  setEmailPassword: (data: { email: string; password: string }) => void;
} & UserType;

export const useUserStore = create<UserDataStoreType>()((set) => ({
  name: "",
  email: "",
  password: "",
  age: 10,
  gender: "female",
  emailVerified: false,
  role: "viewer",
  image: "",
  interests: [""],
  createdAt: new Date(),
  updatedAt: new Date(),
  setUserData: (data) => set(data),
  setEmailPassword: (data) =>
    set({ email: data.email, password: data.password }),
}));
