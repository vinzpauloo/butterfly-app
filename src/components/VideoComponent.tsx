import { Image, StyleSheet, useWindowDimensions } from "react-native";
import React from "react";

import { HStack, Text } from "native-base";

import VideoIcon from "assets/images/videoIcon.png";
import VIPTag from "./VIPTag";
import { GLOBAL_COLORS, GLOBAL_SCREEN_SIZE } from "global";

const VideoComponent = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <>
      <VIPTag isAbsolute={true} />
      <HStack
        space={1}
        style={[styles.videoComponents, { left: 5, bottom: 5 }]}
        alignItems="center"
      >
        <Image source={VideoIcon} style={styles.videoIcon} />
        <Text
          color={GLOBAL_COLORS.primaryTextColor}
          fontSize={width < GLOBAL_SCREEN_SIZE.mobile ? "xs" : "md"}
        >
          {/* if the statistic value is null the watch count will be 0 */}
          {!!item.statistic ? item.statistic.watched : 0}w
        </Text>
      </HStack>
      <HStack
        space={2}
        style={[styles.videoComponents, { right: 5, bottom: 5 }]}
      >
        <Text
          color={GLOBAL_COLORS.primaryTextColor}
          fontSize={width < GLOBAL_SCREEN_SIZE.mobile ? "xs" : "md"}
        >
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
