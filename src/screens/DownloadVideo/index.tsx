import { StyleSheet, View } from "react-native";
import React from "react";

import { useRoute } from "@react-navigation/native";

import Container from "components/Container";
import VideoPlayer from "components/VideoPlayer";

const DownloadVideo = () => {
  const route = useRoute<any>();
  return (
    <Container>
      <View style={styles.container}>
        <VideoPlayer url={route.params.url} isFocus={false} />
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
