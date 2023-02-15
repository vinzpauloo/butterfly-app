import { ScrollView } from "react-native-gesture-handler";

import Container from "components/Container";
import GridVideos from "features/sectionList/components/GridVideos";
import { followImages } from "./gridImages";
import { GLOBAL_COLORS } from "global";

export const singleSectionSubNav = {
  initialRoute: "最近更新",
  screens: [
    {
      name: "最近更新",
      component: () => (
        <ScrollView
          style={{ flex: 1, backgroundColor: GLOBAL_COLORS.primaryColor }}
        >
          <Container>
            <GridVideos data={followImages} isFollowingScreen={true} />
          </Container>
        </ScrollView>
      ),
    },
    {
      name: "最多观看",
      component: () => (
        <ScrollView
          style={{ flex: 1, backgroundColor: GLOBAL_COLORS.primaryColor }}
        >
          <Container>
            <GridVideos data={followImages} isFollowingScreen={true} />
          </Container>
        </ScrollView>
      ),
    },
    {
      name: "最多收藏",
      component: () => (
        <ScrollView
          style={{ flex: 1, backgroundColor: GLOBAL_COLORS.primaryColor }}
        >
          <Container>
            <GridVideos data={followImages} isFollowingScreen={true} />
          </Container>
        </ScrollView>
      ),
    },
  ],
};
