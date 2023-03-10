import { StyleSheet } from "react-native";
import React, { useState } from "react";

import CommentListSkeleton from "components/skeletons/CommentListSkeleton";
import Feeds from "components/feed/Feeds";
import FeedService from "services/api/FeedService";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import Container from "components/Container";
import { userStore } from "../../../zustand/userStore";

const Moment = ({ userId, tag }) => {
  const token = userStore((state) => state.api_token);
  const { getFeeds } = FeedService();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const isFocus = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(0);
  const [lastPage, setLastPage] = useState(1);

  const { isLoading } = useQuery({
    queryKey: [`feedTab${isFocus}`, userId, page, refreshingId],
    queryFn: () =>
      getFeeds({
        data: {
          tag: tag,
          with: "user,comment,like",
          page: page,
        },
        token: token,
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
