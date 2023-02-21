import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";

import Container from "components/Container";
import GridVideos from "features/sectionList/components/GridVideos";
import { Work } from "hooks/useWork";
import BottomMessage from "components/BottomMessage";

const Recommended = ({ tag, userId }) => {
  const { getWorkRecommended } = Work();

  const { data, isLoading } = useQuery({
    queryKey: ["recommendedSingleTag", userId],
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
      <View>
        <Text>Loading....</Text>
      </View>
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
