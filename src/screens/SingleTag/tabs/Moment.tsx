import { StyleSheet } from "react-native";
import React, { useState } from "react";

import CommentListSkeleton from "components/skeletons/CommentListSkeleton";
import Feeds from "components/feed/Feeds";
import { Feeds as FeedsAPI } from "hooks/useFeeds";
import { useQuery } from "@tanstack/react-query";

const Moment = ({ userId }) => {
  const { getFeedsByTag } = FeedsAPI();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const { isLoading } = useQuery({
    queryKey: ["feedTab", userId],
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
      setData(data.data);
    },
  });

  if (isLoading) {
    return <CommentListSkeleton />;
  }

  return <Feeds data={data} />;
};

export default Moment;

const styles = StyleSheet.create({});
