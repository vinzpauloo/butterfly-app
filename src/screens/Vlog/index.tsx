import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import Container from "components/Container";
import PortraitVideo from "layouts/PortraitVideo";
import WorkService from "services/api/WorkService";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const Vlog = (props: Props) => {
  const bottomTabHeight = useBottomTabBarHeight();
  const { getWorks } = WorkService();
  const [localStoredVlog, setLocalStoredVlog] = useState([]);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["portraitWorks"],
    queryFn: () =>
      getWorks({
        orientation: "Portrait",
      }),
    onSuccess: (data) => {
      console.log("=== random portrait video fetched from backend! ===");
      let newElement = {
        // workID of the video (which is also the foreignID to refer to)
        workID: data[0]._id,
        userID: data[0].user.id,
        userName: data[0].user.username,
        videoURL: data[0].video_url,
        thumbnailURL: data[0].thumbnail_url,
        title: data[0].title,
        tags: data[0].tags,
        amountOflikes: data[0].like.total_likes,
        amountOfComments: data[0].comment.total_comments,
        userPhoto: data[0].user.photo,
      };
      setLocalStoredVlog((oldArray) => [...oldArray, newElement]);
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  // if reelsVideos props is passed, use that data list, else use a temporary array with randomly fetch videos
  function onUserScrollDown() {
    refetch();
    console.log("total vids in VLOG: ", localStoredVlog.length);
  }

  if (isLoading) {
    return (
      <Container>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </Container>
    );
  }

  return (
    <PortraitVideo
      // optional prop if it came from a specified list of video from a user
      reelsVideos={localStoredVlog}
      bottomTabHeight={bottomTabHeight}
      onUserScrollDown={onUserScrollDown}
      workId={data[0]?._id}
    />
  );
};

export default Vlog;

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
