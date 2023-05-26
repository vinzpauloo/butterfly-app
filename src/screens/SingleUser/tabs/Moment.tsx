import React, { useCallback, useState } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import FeedService from "services/api/FeedService";
import { useQuery } from "@tanstack/react-query";
import { userStore } from "../../../zustand/userStore";
import { Tabs } from "react-native-collapsible-tab-view";
import FeedContent from "components/feed/FeedContent";
import { GLOBAL_COLORS } from "global";
import Loading from "components/Loading";
import BottomMessage from "components/BottomMessage";
import { Divider } from "native-base";

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
  const { isFetching, isLoading } = useQuery({
    queryKey: ["specificContentCreatorFeeds", userID, page, refreshingId],
    queryFn: () =>
      getFeeds({
        data: {
          user_id: userID,
          with: [`user`, `comment`, `like`].toString(),
          page: page,
          approval: "Approved",
          sort_by: "created_at",
          sort: "desc",
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

  const [startScroll, setStartScroll] = useState(true);

  const reachEnd = () => {
    // if (startScroll) return null;
    if (!isFetching || !isLoading) {
      if (lastPage !== page) {
        setPage((prev) => prev + 1);
        setStartScroll(true);
      }
    }
  };

  const onRefresh = useCallback(() => {
    setStartScroll(true);
    setRefreshing(true);
    setTimeout(() => {
      setData([]);
      setPage(1);
      setRefreshingId((prev) => prev + 1);
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <Tabs.FlatList
      refreshControl={
        <RefreshControl
          colors={[GLOBAL_COLORS.secondaryColor]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      onEndReachedThreshold={0.01}
      // onMomentumScrollBegin{() => setStartScroll(false)}
      onEndReached={reachEnd}
      data={data}
      initialNumToRender={data.length}
      // getItem={(_data: unknown, index: number) => ({
      //   id: index,
      //   item: data[index],
      // })}
      // getItemCount={() => data.length}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }) => (
        <FeedContent data={item} isFromSingleUserScreen />
      )}
      ListFooterComponent={() => (
        <View style={{ height: 60 }}>
          {isFetching || isLoading ? (
            <Loading />
          ) : (
            page === lastPage && <BottomMessage />
          )}
        </View>
      )}
      ItemSeparatorComponent={() => (
        <Divider
          style={{ height: 8, backgroundColor: GLOBAL_COLORS.videoContentBG }}
        />
      )}
    />
  );
};

export default Moment;

const styles = StyleSheet.create({});
