import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import * as ScreenOrientation from "expo-screen-orientation";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";

import StickyTabs from "layouts/StickyTabs";
import { globalStyle } from "globalStyles";
import {
  ContentTemplate,
  Header,
  singleVideoSubNav,
} from "data/singleVideoSubNav";
import { SubNav } from "hooks/useSubNav";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";
import CommentList from "features/commentList";

const { width, height } = Dimensions.get("window");

const SingleVideoScreen = () => {
  const { getWork } = SubNav();
  const video = React.useRef(null);
  const route = useRoute<any>();
  const [status, setStatus] = React.useState({});

  const { data, isLoading, isError, isSuccess } = useQuery(
    [`work-${route.params.id}`],
    () => getWork(route.params.id)
  );

  console.log("!!!", data);

  const setOrientation = () => {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  const stickyTabsData = {
    Header: () => <Header data={data} />,
    tabItems: [
      {
        name: "TabOthers",
        label: "TA的视频",
        Content: <ContentTemplate />,
      },
      {
        name: "TabRecommended",
        label: "更多推荐",
        Content: <ContentTemplate />,
      },
      {
        name: "TabComments",
        label: "评论",
        Content: <CommentList />,
      },
    ],
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.videoContent}>
        <Pressable style={styles.watermarkContainer}>
          <Text style={styles.watermarkText}>购买视频观看完整版</Text>
        </Pressable>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: data?.video_url,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          onFullscreenUpdate={setOrientation}
        />
      </View>
      <StickyTabs data={stickyTabsData} />
    </View>
  );
};

export default SingleVideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.primaryColor,
  },
  videoContent: {
    position: "relative",
    height: 200,

    // Make the video on top of the sticky tab bar
    zIndex: 2,
    backgroundColor: "black",
  },
  watermarkContainer: {
    backgroundColor: globalStyle.secondaryColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    position: "absolute",
    zIndex: 10,
    top: 10,
    right: 30,
  },
  watermarkText: {
    color: "#fff",
  },
  video: {
    alignSelf: "center",
    width: width,
    height: 200,
  },
});
