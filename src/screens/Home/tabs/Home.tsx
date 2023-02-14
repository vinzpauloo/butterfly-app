import { useState } from "react";
import { Text, View } from "react-native";

import { useQuery } from "@tanstack/react-query";

import CarouselContainer from "features/ads/components/CarouselContainer";
import Container from "components/Container";
import { SubNav } from "hooks/useSubNav";
import DynamicTabContent from "layouts/DynamicTabContent";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";

const Home = () => {
  const [tabItems, setTabItems] = useState({ initialRoute: "", screens: [] });
  const { getSubNav } = SubNav();

  const { isLoading } = useQuery({
    queryKey: ["subnav"],
    queryFn: getSubNav,
    onSuccess: (data) => {
      const homeMainTab = data.filter((item) => item.title === "Home");
      const { subs, site_id } = homeMainTab[0];
      setTabItems(() => {
        const initialRoute = subs[0].title; // get the title in return array of object for the initialRoute
        const tabs = subs.map((item, index) => {
          return {
            name: item.title,
            component: () => (
              <DynamicTabContent
                key={index}
                tabTitle={item.slug}
                site_id={site_id}
              />
            ),
          };
        });
        return { initialRoute, screens: tabs };
      });
    },
    onError: (error) => {
      console.log("have an Error");
    },
  });

  if (isLoading && !!tabItems) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Container>
      <MaterialTopTabs data={tabItems} />
    </Container>
  );
};

export default Home;
