import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useQuery } from "@tanstack/react-query";

import Container from "components/Container";
import PortraitVideo from "layouts/PortraitVideo";
import WorkService from "services/api/WorkService";
import { userStore } from "../../zustand/userStore";

type Props = {};

const Vlog = (props: Props) => {
  const token = userStore((state) => state.api_token);
  const bottomTabHeight = useBottomTabBarHeight();
  const { getWorks, getWorksPortrait } = WorkService();
  const [localStoredVlog, setLocalStoredVlog] = useState([]);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["portraitWorks"],
    queryFn: () =>
      getWorksPortrait({
        data: {
          orientation: "Portrait",
        },
        token: token,
      }),
    onSuccess: (data) => {
      console.log("=== random portrait video fetched from backend! ===");
      console.log(data);
      let newElement = {
        // workID of the video (which is also the foreignID to refer to)
        workID: data._id,
        userID: data.user.id,
        userName: data.user.username,
        videoURL: data.video_url,
        thumbnailURL: data.thumbnail_url,
        title: data.title,
        tags: data.tags,
        amountOflikes: data.like.total_likes,
        amountOfComments: data.comment.total_comments,
        userPhoto: data.user.photo,
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
      workId={data?._id}
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
