import { useState } from "react";
import { Text, View } from "react-native";

import { useQuery } from "@tanstack/react-query";

import Container from "components/Container";
import DynamicTabContent from "layouts/DynamicTabContent";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { useSiteSettings } from "hooks/useSiteSettings";

const Home = () => {
  const [tabItems, setTabItems] = useState({ initialRoute: "", screens: [] });
  const { getNavbar } = useSiteSettings();

  const { isLoading } = useQuery({
    queryKey: ["navbar"],
    queryFn: () => getNavbar(),
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
      //error handler
      console.log("Error", error);
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
