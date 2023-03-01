import { StyleSheet } from "react-native";
import React, { useState } from "react";

import FeedList from "layouts/FeedList";
import { feedListData } from "data/feedListData";
import { Feeds as FeedsAPI } from "hooks/useFeeds";
import Feeds from "components/feed/Feeds";
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
  // return <FeedList feedListData={feedListData} />;
  if (isLoading) null;
  return <Feeds data={data} />;
};

export default Moment;

const styles = StyleSheet.create({});
