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

  // FETCH RANDOM PORTRAIT WORKS
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["portraitWorks"],
    queryFn: () =>
      getWorks({
        data: {
          orientation: "Portrait",
          paginate: 1,
          with: "user,like,comment",
          random: true,
        },
        token: token,
      }),
    onSuccess: (data) => {
      console.log("=== random portrait video fetched from backend! ===");

      let newElement = {
        // workID of the video (which is also the foreignID to refer to)
        workID: data.data[0]._id,
        userID: data.data[0].user.id,
        userName: data.data[0].user.username,
        videoURL: data.data[0].video_url,
        thumbnailURL: data.data[0].thumbnail_url,
        title: data.data[0].title,
        tags: data.data[0].tags,
        amountOflikes: data.data[0].like.total_likes,
        amountOfComments: data.data[0].comment.total_comments,
        userPhoto: data.data[0].user.photo,
        isFollowed: data?.data[0]?.is_followed,
        isLiked: data?.data[0]?.is_liked,
        isFavorite: data?.data[0]?.is_favorite,
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
      reelsVideos={localStoredVlog}
      bottomTabHeight={bottomTabHeight}
      onUserScrollDown={onUserScrollDown}
      workId={data.data[0]._id}
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
