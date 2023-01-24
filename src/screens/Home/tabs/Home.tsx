import { Image, Text, View } from "react-native";

import { bannerImage } from "data/bannerImages";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { topSubNav } from "data/topSubNav";
import CarouselContainer from "features/ads/components/CarouselContainer";

export const DynamicScreen = ({ title }) => {
  return (
    <View style={{ flex: 1 }}>
      <CarouselContainer images={bannerImage} />
      <Text>{title}</Text>
    </View>
  );
};

const Home = () => {
  return <MaterialTopTabs data={topSubNav} />;
};

export default Home;
