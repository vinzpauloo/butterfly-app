import React from "react";

import FeedService from "services/api/FeedService";
import Container from "components/Container";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import StickyTabFeeds from "features/feedsList/components/StickyTabFeeds";
import { useQuery } from "@tanstack/react-query";
import { userStore } from "../../../zustand/userStore";

const Moment = () => {
  const token = userStore((state) => state.api_token);
  const { getFeaturedFeeds } = FeedService();
  const { data, isLoading } = useQuery({
    queryKey: ["featuredFeeds"],
    queryFn: () => getFeaturedFeeds(token),
  });

  const tabsData = [
    {
      // name: "recommended",
      name: "推荐",
      component: () => (
        <StickyTabFeeds
          key="recommendedFeeds"
          category="recommended"
          headerData={data}
          headerLoading={isLoading}
          token={token}
        />
      ),
    },
    {
      // name: "latest",
      name: "最新",
      component: () => (
        <StickyTabFeeds
          key="latestFeeds"
          category="latest"
          headerData={data}
          headerLoading={isLoading}
          token={token}
        />
      ),
    },
    {
      // name: "videos",
      name: "视频",
      component: () => (
        <StickyTabFeeds
          key="videoFeeds"
          category="video_only"
          headerData={data}
          headerLoading={isLoading}
          token={token}
        />
      ),
    },
    {
      // name: "photo",
      name: "图片",
      component: () => (
        <StickyTabFeeds
          key="photoFeeds"
          category="images_only"
          headerData={data}
          headerLoading={isLoading}
          token={token}
        />
      ),
    },
    {
      // name: "services",
      name: "服务",
      component: () => (
        <StickyTabFeeds
          key="servicesFeeds"
          category="services_only"
          headerData={data}
          headerLoading={isLoading}
          token={token}
        />
      ),
    },
  ];

  const tabItems = {
    initialRoute: "推荐",
    screens: tabsData,
  };

  return (
    <Container>
      <MaterialTopTabs data={tabItems} isEqualWidth />
    </Container>
  );
};

export default Moment;
