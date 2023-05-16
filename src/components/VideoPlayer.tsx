import { StyleSheet, useWindowDimensions } from "react-native";
import React, { memo } from "react";

import * as ScreenOrientation from "expo-screen-orientation";
import { BASE_URL_STREAMING_SERVER } from "react-native-dotenv";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";

const setOrientation = () => {
  const { height, width } = useWindowDimensions();
  if (height > width) {
    //Device is in portrait mode, rotate to landscape mode.
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  } else {
    //Device is in landscape mode, rotate to portrait mode.
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
};

const VideoPlayer = ({ url, isFocus }) => {
  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    video: {
      alignSelf: "center",
      width: width,
      height: 200,
    },
  });

  return (
    <Video
      style={styles.video}
      source={{
        uri: BASE_URL_STREAMING_SERVER + url,
      }}
      shouldPlay={isFocus}
      useNativeControls
      resizeMode={ResizeMode.CONTAIN}
      isLooping
      onFullscreenUpdate={setOrientation}
    />
  );
};

export default memo(VideoPlayer);
