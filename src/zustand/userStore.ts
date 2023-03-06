import { create } from "zustand";

interface IUser {
  _id: string;
  site_id: string;
  api_token: string;
  alias?: string;
  gender?: string;
  mobile?: string;
  photo?: string;
}

interface IUserStore extends IUser {
  setUserData: (user_object: IUser) => void;
}

export const userStore = create<IUserStore>((set) => ({
  _id: "",
  site_id: "",
  api_token: "",
  alias: "",
  gender: "",
  mobile: "",
  photo: "",
  setUserData: (user_object) => set(() => user_object),
}));
