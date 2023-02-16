import { create } from 'zustand'

interface Advertisement {
  fullscreen_banner: [],
  popup_banner: [],
  carousel_banner: [],
  single_banner: [],
  multiple_random_gif: []
  setAdvertisement: (
    newFullscreen_banner: [],
    newPopup_banner: [],
    newCarousel_banner: [],
    newSingle_banner: [],
    newMultiple_random_gif: []
  ) => void
}

export const adsGlobalStore = create<Advertisement>((set) => ({
    fullscreen_banner: [],
    popup_banner: [],
    carousel_banner: [],
    single_banner: [],
    multiple_random_gif: [],
    setAdvertisement: (
      newFullscreen_banner,
      newPopup_banner,
      newCarousel_banner,
      newSingle_banner,
      newMultiple_random_gif
    ) =>
      set(() => ({
        fullscreen_banner: newFullscreen_banner,
        popup_banner: newPopup_banner,
        carousel_banner: newCarousel_banner,
        single_banner: newSingle_banner,
        multiple_random_gif: newMultiple_random_gif
      }))
}))