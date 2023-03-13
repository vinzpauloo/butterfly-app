import React from "react";

import MomentHeader from "components/headers/MomentHeader";
import StickyTabs from "layouts/StickyTabs";
import StickyTabFeeds from "features/feedsList/components/StickyTabFeeds";
import { userStore } from "../../../zustand/userStore";

const Moment = () => {
  const token = userStore((state) => state.api_token);

  const tabsData = {
    Header: MomentHeader,
    tabItems: [
      {
        name: "recommended",
        label: "推荐",
        Content: (
          <StickyTabFeeds
            key="recommendedFeeds"
            category="recommended"
            token={token}
          />
        ),
      },
      {
        name: "latest",
        label: "最新",
        Content: (
          <StickyTabFeeds key="latestFeeds" category="latest" token={token} />
        ),
      },
      {
        name: "videos",
        label: "视频",
        Content: (
          <StickyTabFeeds
            key="videoFeeds"
            category="video_only"
            token={token}
          />
        ),
      },
      {
        name: "photo",
        label: "图片",
        Content: (
          <StickyTabFeeds
            key="photoFeeds"
            category="images_only"
            token={token}
          />
        ),
      },
      {
        name: "services",
        label: "服务",
        Content: (
          <StickyTabFeeds
            key="servicesFeeds"
            category="services_only"
            token={token}
          />
        ),
      },
    ],
  };
  return <StickyTabs data={tabsData} />;
};

export default Moment;
