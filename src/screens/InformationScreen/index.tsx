import React, { useCallback, useState } from "react";
import { StyleSheet, View, RefreshControl } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";

import BottomMessage from "components/BottomMessage";
import CommentFeeds from "./Feeds/CommentFeeds";
import CommentVideos from "./Videos/CommentVideos";
import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import Favorite from "./Favorite";
import FeedItemSkeleton from "components/skeletons/FeedItemSkeleton";
import LikeFeeds from "./Feeds/LikeFeeds";
import LikeVideos from "./Videos/LikeVideos";
import Loading from "components/Loading";
import MasonrySkeleton from "components/skeletons/MasonrySkeleton";
import MomentHeaderSkeleton from "components/skeletons/MomentHeaderSkeleton";
import NoCacheMessage from "features/sectionList/components/NoCacheMessage";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../zustand/userStore";
import { translationStore } from "../../zustand/translationStore";
import SystemAnnouncement from "./SystemAnnoucement";

const Tab = createMaterialTopTabNavigator();

// ** START: WORKS AND VLOGS
const WorksVlogs = ({ route }) => {
  // ** global state
  const { api_token } = userStore((store) => store);
  const { translations } = translationStore((store) => store);
  // ** state
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshingId, setRefreshingId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [startScroll, setStartScroll] = useState(true);
  // ** api
  const { getCustomerWorkFeeds } = CustomerService();

  const { isLoading, isRefetching } = useQuery({
    queryKey: [
      "Chat-Information-Category-Videos",
      route?.params.postMessage,
      page,
      refreshingId,
    ],
    queryFn: () =>
      getCustomerWorkFeeds({
        token: api_token,
        category: route?.params.postMessage,
        data: { type: "works" },
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
  });

  const reachEnd = () => {
    if (startScroll) return null;
    if (!isLoading) {
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

  if ((isLoading || isRefetching) && page === 1) {
    if (route.params.postMessage === "likes") {
      return (
        <Container>
          <MasonrySkeleton />
        </Container>
      );
    }
    if (route.params.postMessage === "comments") {
      return (
        <Container>
          <MomentHeaderSkeleton />
          <FeedItemSkeleton />
        </Container>
      );
    }
  }

  return (
    <View style={styles.container}>
      <FlashList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[GLOBAL_COLORS.secondaryColor]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
        onTouchStart={() => setStartScroll(false)}
        onEndReached={reachEnd}
        data={!!data.length ? [1] : []}
        keyExtractor={(item, index) => "" + index}
        renderItem={({ item, index }) => (
          <>
            {route?.params.postMessage === "likes" && (
              <LikeVideos data={data} />
            )}
            {route?.params.postMessage === "comments" && (
              <CommentVideos data={data} />
            )}
          </>
        )}
        ListEmptyComponent={!!data.length ? null : <NoCacheMessage />}
        ListFooterComponent={() => (
          <>
            {/* the gap will be remove if the lastpage is been fetch */}
            {lastPage !== page || (lastPage === page && isLoading) ? (
              <View style={{ marginBottom: 60 }}>
                {/* to have a gap in bottom part of section to see the loading icon */}
                {isLoading ? <Loading /> : null}
              </View>
            ) : null}
            {lastPage === page && !isLoading && data.length ? (
              <BottomMessage />
            ) : null}
          </>
        )}
      />
    </View>
  );
};
// ** END: WORKS AND VLOGS

// ** ------------------------------------------ ** //

// ** START: FEEDS
const Feeds = ({ route }) => {
  // ** global state
  const { api_token } = userStore((store) => store);
  const { translations } = translationStore((store) => store);
  // ** state
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshingId, setRefreshingId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [startScroll, setStartScroll] = useState(true);
  // ** api
  const { getCustomerWorkFeeds } = CustomerService();

  const { isLoading, isRefetching } = useQuery({
    queryKey: [
      "Chat-Information-Category-Feeds",
      route?.params.postMessage,
      page,
      refreshingId,
    ],
    queryFn: () =>
      getCustomerWorkFeeds({
        token: api_token,
        category: route?.params.postMessage,
        data: { type: "feeds" },
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
  });

  const reachEnd = () => {
    if (startScroll) return null;
    if (!isLoading) {
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

  if ((isLoading || isRefetching) && page === 1) {
    if (route.params.postMessage === "likes") {
      return (
        <Container>
          <MasonrySkeleton />
        </Container>
      );
    }
    if (route.params.postMessage === "comments") {
      return (
        <Container>
          <FeedItemSkeleton />
        </Container>
      );
    }
  }
  return (
    <View style={styles.container}>
      <FlashList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[GLOBAL_COLORS.secondaryColor]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
        onTouchStart={() => setStartScroll(false)}
        onEndReached={reachEnd}
        data={!!data.length ? [1] : []}
        keyExtractor={(item, index) => "" + index}
        renderItem={({ item, index }) => (
          <React.Fragment key={index}>
            {route?.params.postMessage === "likes" && <LikeFeeds data={data} />}
            {route?.params.postMessage === "comments" && (
              <CommentFeeds data={data} />
            )}
          </React.Fragment>
        )}
        ListEmptyComponent={!!data.length ? null : <NoCacheMessage />}
        ListFooterComponent={() => (
          <>
            {/* the gap will be remove if the lastpage is been fetch */}
            {lastPage !== page || (lastPage === page && isLoading) ? (
              <View style={{ marginBottom: 60 }}>
                {/* to have a gap in bottom part of section to see the loading icon */}
                {isLoading ? <Loading /> : null}
              </View>
            ) : null}
            {lastPage === page && !isLoading && data.length ? (
              <BottomMessage />
            ) : null}
          </>
        )}
      />
    </View>
  );
};
// ** END: FEEDS

// ** ------------------------------------------ ** //

// ** START: MENU TAB COMPONENT
const MenuTabs = ({ postMessage }) => {
  // ** GLOBAL STORE
  const { translations } = translationStore((store) => store);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: GLOBAL_COLORS.primaryColor },
        tabBarActiveTintColor: GLOBAL_COLORS.secondaryColor,
        tabBarInactiveTintColor: "#C6C1C1",
        tabBarIndicatorStyle: { backgroundColor: GLOBAL_COLORS.secondaryColor },
        tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
      }}
    >
      <Tab.Screen
        name="Videos"
        component={WorksVlogs}
        initialParams={{ postMessage }}
      />
      <Tab.Screen
        name="Feeds"
        component={Feeds}
        initialParams={{ postMessage }}
      />
    </Tab.Navigator>
  );
};
// ** END: MENU TAB COMPONENT

const InformationScreen = () => {
  const route = useRoute<any>();

  if (route?.params.postMessage === "favorites") {
    return <Favorite />;
  } else if (route?.params.postMessage === "systemAnnouncement") {
    return <SystemAnnouncement />;
  }

  return <MenuTabs postMessage={route.params.postMessage} />;
};

export default InformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
  cardContainer: {
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    alignItems: "center",
    padding: 16,
    borderRadius: 4,
  },
  whiteText: {
    color: "white",
    fontWeight: "600",
  },
  subtext: {
    color: "#8F9399",
  },
  orangeButton: {
    width: 64,
    height: 28,
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  blackButton: {
    width: 64,
    height: 28,
    backgroundColor: GLOBAL_COLORS.primaryColor,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
  },
  goldIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  goldText: {
    color: GLOBAL_COLORS.secondaryColor,
  },
  systemIcon: {
    height: 38,
    width: 38,
    resizeMode: "contain",
  },
  emptyResult: {
    textAlign: "center",
    fontSize: 30,
    marginVertical: 15,
    color: GLOBAL_COLORS.secondaryColor,
  },
});
