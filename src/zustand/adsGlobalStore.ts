import { create } from 'zustand'

interface Advertisement {
  photoURL: string
  adsURL: string
  startDate: string
  endDate: string
  updatePhotoURL: (newPhotoURL: Advertisement['photoURL']) => void
  updateAdsURL: (newAdsURL: Advertisement['adsURL']) => void
  updateStartDate: (newStartDate: Advertisement['startDate']) => void
  updateEndDate: (newEndDate: Advertisement['endDate']) => void
}

// only 1 per site
export const useFullScreenBannerStore = create<Advertisement>((set) => ({
  photoURL: "",
  adsURL: "",
  startDate: "",
  endDate: "",
  updatePhotoURL: (newPhotoURL) => set(() => ({ photoURL: newPhotoURL })),
  updateAdsURL: (newAdsURL) => set(() => ({ adsURL: newAdsURL })),
  updateStartDate: (newStartDate) => set(() => ({ startDate: newStartDate })),
  updateEndDate: (newEndDate) => set(() => ({ endDate: newEndDate })),
}))

// only 1 per site
export const usePopUpBannerStore = create<Advertisement>((set) => ({
  photoURL: "",
  adsURL: "",
  startDate: "",
  endDate: "",
  updatePhotoURL: (newPhotoURL) => set(() => ({ photoURL: newPhotoURL })),
  updateAdsURL: (newAdsURL) => set(() => ({ adsURL: newAdsURL })),
  updateStartDate: (newStartDate) => set(() => ({ startDate: newStartDate })),
  updateEndDate: (newEndDate) => set(() => ({ endDate: newEndDate })),
}))

// multiple per site
export const useCarouselBannerStore = create<Advertisement>((set) => ({
  photoURL: "",
  adsURL: "",
  startDate: "",
  endDate: "",
  updatePhotoURL: (newPhotoURL) => set(() => ({ photoURL: newPhotoURL })),
  updateAdsURL: (newAdsURL) => set(() => ({ adsURL: newAdsURL })),
  updateStartDate: (newStartDate) => set(() => ({ startDate: newStartDate })),
  updateEndDate: (newEndDate) => set(() => ({ endDate: newEndDate })),
}))

// only 1 per site
export const useSingleBannerStore = create<Advertisement>((set) => ({
  photoURL: "",
  adsURL: "",
  startDate: "",
  endDate: "",
  updatePhotoURL: (newPhotoURL) => set(() => ({ photoURL: newPhotoURL })),
  updateAdsURL: (newAdsURL) => set(() => ({ adsURL: newAdsURL })),
  updateStartDate: (newStartDate) => set(() => ({ startDate: newStartDate })),
  updateEndDate: (newEndDate) => set(() => ({ endDate: newEndDate })),
}))

// multiple per site
export const useMultipleRandomGIFStore = create<Advertisement>((set) => ({
  photoURL: "",
  adsURL: "",
  startDate: "",
  endDate: "",
  updatePhotoURL: (newPhotoURL) => set(() => ({ photoURL: newPhotoURL })),
  updateAdsURL: (newAdsURL) => set(() => ({ adsURL: newAdsURL })),
  updateStartDate: (newStartDate) => set(() => ({ startDate: newStartDate })),
  updateEndDate: (newEndDate) => set(() => ({ endDate: newEndDate })),
}))