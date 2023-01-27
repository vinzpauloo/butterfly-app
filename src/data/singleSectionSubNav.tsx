import { ScrollView } from "react-native-gesture-handler";

import Container from "components/Container";
import GridVideos from "features/sectionList/components/GridVideos";
import { followImages } from "./gridImages";

export const singleSectionSubNav = {
  initialRoute: "最近更新",
  screens: [
    {
      name: "最近更新",
      component: () => (
        <ScrollView>
          <Container>
            <GridVideos videos={followImages} isFollowingScreen={true} />
          </Container>
        </ScrollView>
      ),
    },
    {
      name: "最多观看",
      component: () => (
        <ScrollView>
          <Container>
            <GridVideos videos={followImages} isFollowingScreen={true} />
          </Container>
        </ScrollView>
      ),
    },
    {
      name: "最多收藏",
      component: () => (
        <ScrollView>
          <Container>
            <GridVideos videos={followImages} isFollowingScreen={true} />
          </Container>
        </ScrollView>
      ),
    },
  ],
};
