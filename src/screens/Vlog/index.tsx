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
  const { getWorks } = WorkService();
  const [data, setData] = useState([]);

  // FETCH RANDOM PORTRAIT WORKS
  const { isLoading, refetch } = useQuery({
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
      setData((prev) => [...prev].concat(data?.data[0]));
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  const onUserScrollDown = () => { refetch() }

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
      reelsVideos={data}
      bottomTabHeight={bottomTabHeight}
      onUserScrollDown={onUserScrollDown}
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
