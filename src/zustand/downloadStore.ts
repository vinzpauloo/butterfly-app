import { create } from "zustand";

interface IDownload {
  downloaded: string[];
  downloading: string[];
  setDownloaded: (videoIDS: string[]) => void;
  setDownloading: (videoIDS: string[]) => void;
}

export const downloadStore = create<IDownload>((set) => ({
  downloaded: [],
  downloading: [],
  setDownloaded: (videoIDS) => set(() => ({ downloaded: videoIDS })),
  setDownloading: (videoIDS) => set(() => ({ downloading: videoIDS })),
}));
