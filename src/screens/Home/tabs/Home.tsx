import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { useQuery } from "@tanstack/react-query";

import CarouselContainer from "features/ads/components/CarouselContainer";
import { bannerImage } from "data/bannerImages";
import Container from "components/Container";
import StickyTabs from "layouts/StickyTabs";
import { SubNav } from "hooks/useSubNav";
import DynamicTabContent from "layouts/DynamicTabContent";

const Header = () => {
  return <CarouselContainer />;
};

const Home = () => {
  const [tabItems, setTabItems] = useState([]);
  const { getSubNav } = SubNav();

  const { isLoading } = useQuery({
    queryKey: ["subnav"],
    queryFn: getSubNav,
    onSuccess: (data) => {
      const homeMainTab = data.filter((item) => item.title === "Home");
      const { subs } = homeMainTab[0];
      setTabItems(() => {
        const tabs = subs.map((item, index) => {
          return {
            name: item.slug,
            label: item.title,
            Content: <DynamicTabContent key={index} tabTitle={item.slug} />,
          };
        });
        return tabs;
      });
    },
    onError: (error) => {
      console.log("have an Error");
    },
  });

  const stickyTabsData = {
    Header,
    tabItems,
  };

  if (isLoading && !!tabItems) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Container>
      <StickyTabs scrollEnabled data={stickyTabsData} />
    </Container>
  );
};

export default Home;
