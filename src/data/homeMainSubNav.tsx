/*
  Layout patterns:
    - videoSlider
    - reelSlider
    - grid
    - singleVideoWithGrid
    - singleVideoList
*/

const data = {
  selections: [
    {
      layout: "videoSlider",
      items: ["INSERT SAMPLES HERE"],
    },
    {
      layout: "reelSlider",
      items: ["INSERT SAMPLES HERE"],
    },
    {
      layout: "grid",
      items: ["INSERT SAMPLES HERE"],
    },
    {
      layout: "singleVideoWithGrid",
      items: ["INSRT SAMPLE HERE"],
      single: "INSERT SAMPLE HERE",
    },
    {
      layout: "singleVideoList",
      items: ["INSERT SAMPLES HERE"],
    },
  ],
  latest: [],
  original: [],
  homeMade: [],
  hot: [],
  local: [],
  pornStars: [],
  loli: [],
  avModels: [],
  hentai: [],
};

export const homeMainSubNav = [
  {
    name: "Selections",
    label: "精选",
    data: data.selections,
  },
  {
    name: "Latest",
    label: "最新",
    data: data.latest,
  },
  {
    name: "Original",
    label: "原创",
    data: data.original,
  },
  {
    name: "HomeMade",
    label: "自制",
    data: data.homeMade,
  },
  {
    name: "Hot",
    label: "热门",
    data: data.hot,
  },
  {
    name: "Local",
    label: "国产",
    data: data.local,
  },
  {
    name: "PornStars",
    label: "网黄",
    data: data.pornStars,
  },
  {
    name: "Loli",
    label: "萝莉",
    data: data.loli,
  },
  {
    name: "AVModels",
    label: "AV",
    data: data.avModels,
  },
  {
    name: "Hentai",
    label: "动漫",
    data: data.hentai,
  },
];
