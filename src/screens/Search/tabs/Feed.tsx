import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import Container from "components/Container";
import Feeds from "components/feed/Feeds";
import FeedItemSkeleton from "components/skeletons/FeedItemSkeleton";
import GeneralSearch from "services/api/GeneralSearch";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../../zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { useIsFocused } from "@react-navigation/native";

const Feed = ({ searchText, fetchChecker, setFetchChecker, page, setPage }) => {
  const token = userStore((state) => state.api_token);
  const { getSearchPage } = GeneralSearch();
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(0);
  const [prevSearch, setPrevSearch] = useState("");
  const isFocused = useIsFocused();

  const { isLoading } = useQuery({
    queryKey: ["feed-user", searchText, page, refreshingId],
    queryFn: () =>
      getSearchPage({
        data: { feed_only: true, keyword: searchText, page: page },
        token: token,
      }),
    onError: (error) => {
      console.log("feed-work", error);
    },
    onSuccess: (data) => {
      setLastPage(data?.last_page);
      setFetchChecker((prev) => {
        return { ...prev, feed: false };
      });
      if (prevSearch !== searchText) {
        setPrevSearch(searchText);
        setData(data.data);
      } else {
        setData((prev) => [...prev].concat(data.data));
      }
    },
    enabled: fetchChecker.feed && isFocused,
  });

  useEffect(() => {
    setData([]);
  }, [searchText]);

  useEffect(() => {
    setFetchChecker((prev) => {
      return { ...prev, feed: true };
    });
  }, [page, searchText]);

  if (
    ((isLoading || refreshing) && page === 1 && prevSearch !== searchText) ||
    (data.length === 0 && fetch)
  ) {
    return (
      <Container>
        <FeedItemSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      {data.length === 0 && !isLoading ? (
        <Text style={styles.emptyResult}>No Data</Text>
      ) : (
        <Feeds
          data={data}
          isLoading={isLoading}
          lastPage={lastPage}
          page={page}
          refreshing={refreshing}
          setData={setData}
          setPage={setPage}
          setRefreshing={setRefreshing}
          setRefreshingId={setRefreshingId}
        />
      )}
    </Container>
  );
};

export default Feed;

const styles = StyleSheet.create({
  emptyResult: {
    textAlign: "center",
    fontSize: 30,
    marginVertical: 15,
    color: GLOBAL_COLORS.secondaryColor,
  },
});
