import { StyleSheet } from "react-native";
import React, { useState } from "react";

import CommentListSkeleton from "components/skeletons/CommentListSkeleton";
import Feeds from "components/feed/Feeds";
import { Feeds as FeedsAPI } from "hooks/useFeeds";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import Container from "components/Container";

const Moment = ({ userId }) => {
  const { getFeedsByTag } = FeedsAPI();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const isFocus = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(0);
  const [lastPage, setLastPage] = useState(1);

  const { isLoading } = useQuery({
    queryKey: [`feedTab${isFocus}`, userId, page, refreshingId],
    queryFn: () =>
      getFeedsByTag({
        tag: "Asian", // will change later the Asian have the only one that have data for now
        with: "user,comment,like",
        page: page,
      }),
    onError: (error) => {
      console.log("SingleTag-FeedTab", error);
    },
    onSuccess: (data) => {
      setData((prev) => [...prev].concat(data.data));
      setLastPage(data?.last_page);
    },
    enabled: isFocus,
  });

  if ((isLoading || refreshing) && page === 1) {
    return (
      <Container>
        <CommentListSkeleton />
      </Container>
    );
  }

  return (
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
  );
};

export default Moment;

const styles = StyleSheet.create({});
