import { create } from "zustand";
import localizations from "i18n/localizations";

interface ITranslationStore {
  lang: string;
  translations: any;
  setLang: (lang: string) => void;
  setTranslations: (translations: string) => void;
}

/* Default language on initial load */
const defaultLang = "en";

export const translationStore = create<ITranslationStore>((set) => ({
  lang: defaultLang,
  translations: localizations[defaultLang],
  setLang: (lang) => set(() => ({ lang })),
  setTranslations: (translations) => set(() => ({ translations })),
}));
