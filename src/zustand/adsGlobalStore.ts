import { create } from "zustand";

interface ISingleAds {
  photo_url: string;
  url: string;
}

interface Advertisement {
  fullscreen_banner: ISingleAds;
  popup_banner: ISingleAds;
  carousel_banner: [];
  single_banner: ISingleAds;
  setAdvertisement: (
    newFullscreen_banner: ISingleAds,
    newPopup_banner: ISingleAds,
    newCarousel_banner: [],
    newSingle_banner: ISingleAds
  ) => void;
}

const defaultSingleAd = {
  photo_url: "",
  url: "",
};

export const adsGlobalStore = create<Advertisement>((set) => ({
  fullscreen_banner: defaultSingleAd,
  popup_banner: defaultSingleAd,
  carousel_banner: [],
  single_banner: defaultSingleAd,
  setAdvertisement: (
    newFullscreen_banner,
    newPopup_banner,
    newCarousel_banner,
    newSingle_banner
  ) =>
    set(() => ({
      fullscreen_banner: newFullscreen_banner,
      popup_banner: newPopup_banner,
      carousel_banner: newCarousel_banner,
      single_banner: newSingle_banner,
    })),
}));
