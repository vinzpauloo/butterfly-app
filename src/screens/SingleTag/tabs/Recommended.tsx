import { StyleSheet } from "react-native";
import React from "react";

import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import GridVideos from "features/sectionList/components/GridVideos";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import { Work } from "hooks/useWork";

const Recommended = ({ tag, userId }) => {
  const { getWorkRecommended } = Work();

  const { data, isLoading } = useQuery({
    queryKey: ["recommendedSingleTag", tag],
    queryFn: () =>
      getWorkRecommended({
        tag,
        with: "user",
        ads: false,
        page: 1, // will code later for the pagination
        user_id: userId,
      }),
    onSuccess: (data) => {
      console.log("@@@Success", data.data);
    },
    onError: (error) => {
      //error handler
      console.log("Error", error);
    },
  });

  if (isLoading) {
    return (
      <Container>
        <VideoListSkeleton />
      </Container>
    );
  }

  return (
    <ScrollView>
      <Container>
        <GridVideos data={data.data} />
        <BottomMessage />
      </Container>
    </ScrollView>
  );
};

export default Recommended;

const styles = StyleSheet.create({});
