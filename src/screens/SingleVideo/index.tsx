import React, { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import { Video, ResizeMode } from "expo-av";

import { globalStyle } from "globalStyles";

import StickyTabs from "layouts/StickyTabs";
import { singleVideoSubNav } from "data/singleVideoSubNav";

const { width, height } = Dimensions.get("window");

const SingleVideoScreen = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [videoOrientation, setVideoOrientation] = useState("")

  const setOrientation = () => {
    height > width ? ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      : ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
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
          source={{uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
          useNativeControls
          resizeMode={videoOrientation === "portrait" ? ResizeMode.STRETCH : ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          onFullscreenUpdate={setOrientation}
          onReadyForDisplay={event => {
            setVideoOrientation(event.naturalSize.orientation)
          }}
        />
      </View>
      <StickyTabs data={singleVideoSubNav} />
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
    zIndex: 1,
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
