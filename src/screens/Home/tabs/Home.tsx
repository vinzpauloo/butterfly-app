import { StyleSheet, Text, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import BottomMessage from "components/BottomMessage";
import CarouselContainer from "features/ads/components/CarouselContainer";
import DividerContainer from "features/sectionList/components/DividerContainer";
import GridVideos from "features/sectionList/components/GridVideos";
import HorizontalSlider from "features/sectionList/components/HorizontalSlider";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import SectionHeader from "features/sectionList/components/SectionHeader";
import SingleVideo from "features/sectionList/components/SingleVideo";
import VerticalSlider from "features/sectionList/components/VerticalSlider";
import { bannerImage } from "data/bannerImages";
import { globalStyle } from "globalStyles";
import { homeMainSubNav } from "data/homeMainSubNav";
import { multipleImages } from "data/gridImages";
import { topSubNav } from "data/topSubNav";
import { useEffect, useState } from "react";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import CarouselSkeleton from "components/skeletons/CarouselSkeleton";
import Container from "components/Container";
import StickyTabs from "layouts/StickyTabs";
import { useQuery } from "@tanstack/react-query";
import SubNav from "hooks/useSabNav";
import DynamicTabContent from "layouts/DynamicTabContent";

const Header = () => {
  return <CarouselContainer images={bannerImage} />;
};

const Home = () => {
  const [tabItems, setTabItems] = useState([]);

  const { data, isLoading, isSuccess, isError } = useQuery(
    ["subnav"],
    SubNav.getSubNav
  );

  useEffect(() => {
    if (isSuccess) {
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
    }
  }, [isSuccess]);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.primaryColor,
  },
  verticalSpacer: {
    paddingTop: 15,
  },
});
