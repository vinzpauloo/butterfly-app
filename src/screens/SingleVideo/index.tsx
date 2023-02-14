import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { useQuery } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";

import { globalStyle } from "globalStyles";
import { SubNav } from "hooks/useSubNav";
import SingleVideoTab from "screens/SingleVideo/tabs/SingleVideoTabs";
// import VideoPlayer from "components/VideoPlayer";
import VideoPlayer from "react-native-video-player";

const { width, height } = Dimensions.get("window");

const SingleVideoScreen = () => {
  const { getWork } = SubNav();
  const route = useRoute<any>();

  const { data, isLoading } = useQuery({
    queryKey: ["work", route.params.id],
    queryFn: () => getWork(route.params.id),
    onError: () => {
      //error handler
    },
  });

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
        <VideoPlayer url={data?.url} />
      </View>
      <SingleVideoTab />
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
});
