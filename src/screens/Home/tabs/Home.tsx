import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import Container from "components/Container";
import DynamicTabContent from "layouts/DynamicTabContent";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import CarouselSkeleton from "components/skeletons/CarouselSkeleton";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import SiteSettingsService from "services/api/SiteSettingsService";
import { translationStore } from "../../../zustand/translationStore";

const Home = () => {
  const lang = translationStore((state) => state.lang);
  const [tabItems, setTabItems] = useState({ initialRoute: "", screens: [] });
  const { getNavbar } = SiteSettingsService();

  const { isLoading, isRefetching } = useQuery({
    queryKey: ["navbar", lang],
    queryFn: () => getNavbar({ Locale: lang }),
    onSuccess: (data) => {
      const homeMainTab = data.filter((item) => item.title === "Home");
      const { subs, site_id } = homeMainTab[0];
      setTabItems(() => {
        const initialRoute = subs[0].title; // get the title in return array of object for the initialRoute
        const tabs = subs.map((item, index) => {
          return {
            name: item.title,
            component: () => (
              <DynamicTabContent key={index} tabTitle={item.slug} />
            ),
          };
        });
        return { initialRoute, screens: tabs };
      });
    },
    onError: (error) => {
      //error handler
      console.log("Error", error);
    },
  });

  if (isLoading || isRefetching) {
    return (
      <>
        <CarouselSkeleton />
        <VideoListSkeleton />
      </>
    );
  }

  return (
    <Container>
      <MaterialTopTabs data={tabItems} />
    </Container>
  );
};

export default Home;
