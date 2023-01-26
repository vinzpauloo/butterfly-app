import { StyleSheet, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import BottomMessage from "features/sectionList/components/BottomMessage";
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

const LayoutContainer = ({ title, children }) => {
  return (
    <>
      <SectionHeader title={title} />
      {children}
      <DividerContainer />
    </>
  );
};

export const DynamicScreen = ({ title, navigation }) => {
  const screenData = homeMainSubNav?.filter((screen) => screen.name === title);

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
  };
  return (
    <ScrollView style={styles.container}>
      <CarouselContainer images={bannerImage} />
      {screenData.map((screen, index) =>
        screen.data.map((item) => SectionLayouts[item.layout])
      )}
      <BottomMessage />
    </ScrollView>
  );
};

const Home = ({ navigation }) => {
  return <MaterialTopTabs data={topSubNav} />;
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.primaryColor,
  },
});
