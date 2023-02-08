import { StyleSheet, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

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

const LayoutContainer = ({ title, children }) => {
  return (
    <>
      <SectionHeader title={title} />
      {children}
    </>
  );
};

export function DynamicScreen ({ title }) {
  const navigation = useNavigation();
  const screenData = homeMainSubNav?.filter((screen) => screen.name === title);
  const finalScreenData = screenData[0].data;

  const [videoListIsLoaded, setVideoListIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setVideoListIsLoaded(true), 1000);
  });

  const SectionLayouts = {
    videoSlider: (
      <LayoutContainer title={"Horizontal Videos"}>
        <HorizontalSlider navigation={navigation} />
      </LayoutContainer>
    ),
    reelSlider: (
      <LayoutContainer title={"Reels Slider Videos"}>
        <VerticalSlider navigation={navigation} />
      </LayoutContainer>
    ),
    grid: (
      <LayoutContainer title={"Grid Videos"}>
        <View style={{ paddingHorizontal: 10 }}>
          <GridVideos videos={multipleImages} />
        </View>
      </LayoutContainer>
    ),
    singleVideo: (
      <LayoutContainer title={"SingleVideo"}>
        <SingleVideo />
      </LayoutContainer>
    ),
    singleVideoWithGrid: (
      <LayoutContainer title={"SingleVideo"}>
        <SingleVideo />
        <DividerContainer />
        <GridVideos videos={multipleImages} />
      </LayoutContainer>
    ),
    singleVideoList: (
      <View style={{ marginVertical: 15 }}>
        <SingleVideo />
      </View>
    ),
    sectionHeader: <SectionHeader title="Single Videos" />,
  };
  return (
    <ScrollView style={[styles.container,styles.verticalSpacer]}>
      { videoListIsLoaded ? 
        <>
          {finalScreenData.map((item, index) => {
            return (
              <>
                {SectionLayouts[item.layout]}
                {finalScreenData.length - 1 !== index && <DividerContainer />}
              </>
            );
          })}
          <BottomMessage />
        </>
      :
        <>
          <CarouselSkeleton />
          <VideoListSkeleton />
        </>
      }
    </ScrollView>
  );
};

const Home = ({ navigation }) => {
  return (
    <Container>
      <StickyTabs scrollEnabled data={topSubNav} />
    </Container>
  )
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.primaryColor,
  },
  verticalSpacer : {
    paddingTop:15
  }
});
