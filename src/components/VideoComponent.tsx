import { StyleSheet } from "react-native";
import React from "react";
import { HStack, Text } from "native-base";
import Foundation from "react-native-vector-icons/Foundation";
import VIPTag from "./VIPTag";

const VideoComponent = ({ item }) => {
  return (
    <>
      <VIPTag isAbsolute={true} />
      <HStack
        space={2}
        style={[styles.videoComponents, { left: 5, bottom: 5 }]}
      >
        <Foundation name="play-video" size={20} color="#fff" />
        <Text color="#fff" fontSize="md">
          {/* {wanConverter(item.views)}w */}
          {item.statistics[0].watched}w
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
});
