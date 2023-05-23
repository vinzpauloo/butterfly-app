import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import GridVideos from "features/sectionList/components/GridVideos";
import StickyTabsGridVideos from "features/sectionList/components/StickyTabsGridVideos";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import WorkService from "services/api/WorkService";
import { userStore } from "../../../zustand/userStore";

type Props = {};

const Work = (props: Props) => {
  const token = userStore((state) => state.api_token);
  const route = useRoute<any>();
  const userID = route?.params?.userID;

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(0);

  const { getWorks } = WorkService();
  const { isLoading, isRefetching } = useQuery({
    queryKey: ["SingleUserWork", userID, page, refreshingId],
    queryFn: () =>
      getWorks({
        data: {
          user_id: userID,
          with: "user",
          creator_only: true,
          ads: true,
          page: page,
        },
        token: token,
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
    onError: (error) => {
      //error handler
      console.log("Error", error);
    },
  });

  return (
    <StickyTabsGridVideos
      isLoading={isLoading}
      page={page}
      refreshing={refreshing}
      setData={setData}
      setRefreshing={setRefreshing}
      setRefreshingId={setRefreshingId}
      setPage={setPage}
      lastPage={lastPage}
      layout={<GridVideos data={data} />}
      isRefetching={isRefetching}
    />
  );
};

export default Work;

const styles = StyleSheet.create({});
