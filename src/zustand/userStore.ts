import { create } from "zustand";

interface IUser {
  _id: string;
  site_id: string;
  api_token: string;
  alias?: string;
  coins?: number;
  gender?: string;
  mobile?: string;
  photo?: string;
  is_Vip?: boolean;
  referral_code?: string | null;
  recline?: string | null;
}

interface IUserStore extends IUser {
  setUserData: (user_object: IUser) => void;
  setVip: (vip: boolean) => void;
}

export const userStore = create<IUserStore>((set) => ({
  _id: "",
  site_id: "",
  api_token: "",
  alias: "",
  gender: "",
  mobile: "",
  photo: "",
  is_Vip: false,
  referral_code: "",
  recline: "",
  setUserData: (user_object) => set(() => user_object),
  setVip: (vip) => set(() => ({ is_Vip: vip })),
}));
