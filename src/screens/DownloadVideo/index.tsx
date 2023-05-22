import { StyleSheet, View, useWindowDimensions } from "react-native";
import React from "react";

import * as ScreenOrientation from "expo-screen-orientation";
import { useRoute } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";

import Container from "components/Container";

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

const VideoPlayer = ({ url }) => {
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
      source={{ uri: url }}
      useNativeControls
      resizeMode={ResizeMode.CONTAIN}
      isLooping
      onFullscreenUpdate={setOrientation}
    />
  );
};

const DownloadVideo = () => {
  const route = useRoute<any>();

  return (
    <Container>
      <View style={styles.container}>
        <VideoPlayer url={route.params.url} />
      </View>
    </Container>
  );
};

export default DownloadVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
