import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import FeedService from "services/api/FeedService";
import { useQuery } from "@tanstack/react-query";
import { userStore } from "../../../zustand/userStore";
import Feeds from "components/feed/Feeds";
import { Tabs } from "react-native-collapsible-tab-view";

type Props = {};

const Moment = (props: Props) => {
  const route = useRoute<any>();
  const userID = route?.params?.userID;
  const token = userStore((store) => store.api_token);

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(0);
  const { getFeeds } = FeedService();
  const { isLoading } = useQuery({
    queryKey: ["specificContentCreatorFeeds", userID, page, refreshingId],
    queryFn: () =>
      getFeeds({
        data: {
          user_id: userID,
          with: [`user`, `comment`, `like`].toString(),
          page: page,
          approval: "Approved",
        },
        token: token,
      }),
    onSuccess: (data) => {
      setLastPage(data?.last_page);
      setData((prev) => [...prev].concat(data?.data));
    },
    onError: (error) => {
      console.log(`Error`, error);
    },
  });

  return (
    <Tabs.FlatList
      data={null}
      renderItem={null}
      ListEmptyComponent={
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
      }
    />
  );
};

export default Moment;

const styles = StyleSheet.create({});
