import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import Container from "components/Container";
import FeedList from "layouts/FeedList";
import FeedItemSkeleton from "components/skeletons/FeedItemSkeleton";
import GeneralSearch from "services/api/GeneralSearch";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../../zustand/userStore";
import { useQuery } from "@tanstack/react-query";

const Feeds = ({ searchText }) => {
  const token = userStore((state) => state.api_token);
  const { getSearchPage } = GeneralSearch();
  const [data, setData] = useState([]);
  const { isLoading } = useQuery({
    queryKey: ["feed-user", searchText],
    queryFn: () =>
      getSearchPage({ feed_only: true, keyword: searchText }, token),
    onError: (error) => {
      console.log("feed-work", error);
    },
    onSuccess: (data) => {
      setData(data.data);
    },
  });

  if (isLoading) {
    return (
      <Container>
        <View style={{ height: "100%" }}>
          <FeedItemSkeleton />
        </View>
      </Container>
    );
  }

  return (
    <Container>
      {data.length === 0 ? (
        <Text style={styles.emptyResult}>No Data</Text>
      ) : (
        <FeedList data={data} />
      )}
    </Container>
  );
};

export default Feeds;

const styles = StyleSheet.create({
  emptyResult: {
    textAlign: "center",
    fontSize: 30,
    marginVertical: 15,
    color: GLOBAL_COLORS.secondaryColor,
  },
});
