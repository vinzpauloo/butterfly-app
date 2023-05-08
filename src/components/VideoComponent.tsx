import { Image, StyleSheet } from "react-native";
import React from "react";

import { HStack, Text } from "native-base";

import VIPTag from "./VIPTag";
import VideoIcon from "assets/images/videoIcon.png";

const VideoComponent = ({ item }) => {
  return (
    <>
      <VIPTag isAbsolute={true} />
      <HStack
        space={1}
        style={[styles.videoComponents, { left: 5, bottom: 5 }]}
        alignItems="center"
      >
        <Image source={VideoIcon} style={styles.videoIcon} />
        <Text color="#fff" fontSize="md">
          {/* if the statistic value is null the watch count will be 0 */}
          {!!item.statistic ? item.statistic.watched : 0}w
        </Text>
      </HStack>
      <HStack
        space={2}
        style={[styles.videoComponents, { right: 5, bottom: 5 }]}
      >
        <Text color="#fff" fontSize="md">
          {item.duration}
        </Text>
      </HStack>
    </>
  );
};

export default VideoComponent;

const styles = StyleSheet.create({
  videoComponents: {
    position: "absolute",
    zIndex: 10,
  },
  videoIcon: {
    width: 15,
    height: 15,
  },
});
