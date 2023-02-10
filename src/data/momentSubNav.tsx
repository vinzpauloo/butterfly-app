import { feedListData } from "data/feedListData";
import FeedList from "layouts/FeedList";
import MomentHeader from "components/headers/MomentHeader";

export const momentSubNav = {
  Header: MomentHeader,
  tabItems: [
    {
      name: "recommended",
      label: "推荐",
      Content: <FeedList feedListData={feedListData} />,
    },
    {
      name: "latest",
      label: "最新",
      Content: <FeedList feedListData={feedListData} />,
    },
    {
      name: "videos",
      label: "视频",
      Content: <FeedList feedListData={feedListData} />,
    },
    {
      name: "photo",
      label: "图片",
      Content: <FeedList feedListData={feedListData} />,
    },
    {
      name: "services",
      label: "服务",
      Content: <FeedList feedListData={feedListData} />,
    },
  ],
};