import React from "react";

import FeedService from "services/api/FeedService";
import Container from "components/Container";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import StickyTabFeeds from "features/feedsList/components/StickyTabFeeds";
import { translationStore } from "../../../zustand/translationStore";
import { useQuery } from "@tanstack/react-query";
import { userStore } from "../../../zustand/userStore";

const Moment = () => {
  const token = userStore((state) => state.api_token);
  const translations = translationStore((state) => state.translations);
  const { getFeaturedFeeds } = FeedService();
  const { data, isLoading } = useQuery({
    queryKey: ["featuredFeeds"],
    queryFn: () => getFeaturedFeeds(token),
  });

  const tabsData = [
    {
      name: translations.recommend,
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
      name: translations.latest,
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
      name: translations.video,
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
      name: translations.photo,
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
      name: translations.service,
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
    initialRoute: translations.recommend,
    screens: tabsData,
  };

  return (
    <Container>
      <MaterialTopTabs data={tabItems} isEqualWidth />
    </Container>
  );
};

export default Moment;
