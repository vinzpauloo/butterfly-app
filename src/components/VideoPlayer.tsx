import { Dimensions, StyleSheet } from "react-native";
import React, { memo } from "react";

import * as ScreenOrientation from "expo-screen-orientation";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";

const { width, height } = Dimensions.get("window");

const setOrientation = () => {
  if (Dimensions.get("window").height > Dimensions.get("window").width) {
    //Device is in portrait mode, rotate to landscape mode.
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  } else {
    //Device is in landscape mode, rotate to portrait mode.
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
};

const VideoPlayer = ({ url }) => {
  return (
    <Video
      style={styles.video}
      source={{
        uri: url,
      }}
      useNativeControls
      resizeMode={ResizeMode.CONTAIN}
      isLooping
      onFullscreenUpdate={setOrientation}
    />
  );
};

export default memo(VideoPlayer);

const styles = StyleSheet.create({
  video: {
    alignSelf: "center",
    width: width,
    height: 200,
  },
});
