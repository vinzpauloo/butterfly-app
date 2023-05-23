import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  Image,
  View,
  RefreshControl,
} from "react-native";

import { Avatar, HStack, VStack } from "native-base";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";

import BottomMessage from "components/BottomMessage";
import CommentFeeds from "./Feeds/CommentFeeds";
import CommentVideos from "./Videos/CommentVideos";
import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import FeedItemSkeleton from "components/skeletons/FeedItemSkeleton";
import gold from "assets/images/gold.png";
import LikeFeeds from "./Feeds/LikeFeeds";
import LikeVideos from "./Videos/LikeVideos";
import Loading from "components/Loading";
import MasonrySkeleton from "components/skeletons/MasonrySkeleton";
import MomentHeaderSkeleton from "components/skeletons/MomentHeaderSkeleton";
import SystemIcon from "assets/images/SystemIcon.png";
import vincent from "assets/images/vincent-avatar.png";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../zustand/userStore";
import { translationStore } from "../../zustand/translationStore";

const Tab = createMaterialTopTabNavigator();

const FanCard = ({ data }) => {
  return (
    <HStack style={styles.cardContainer} space={2}>
      <Avatar size={12} source={vincent} />
      <VStack space={1} flexShrink={1}>
        <Text style={styles.whiteText}>Vincent@CC</Text>
        <Text style={styles.subtext}>04/05 关注了你</Text>
      </VStack>
      <HStack marginLeft="auto" flexDirection="row" space={2}>
        <Pressable style={styles.blackButton}>
          <Text style={styles.whiteText}>回关</Text>
        </Pressable>
        <Pressable style={styles.orangeButton}>
          <Text style={styles.whiteText}>聊天</Text>
        </Pressable>
      </HStack>
    </HStack>
  );
};

const IncomeCard = ({ data }) => {
  return (
    <HStack style={styles.cardContainer} space={2}>
      <Avatar size={12} source={vincent} />
      <Text style={styles.whiteText}>Vincent@CC</Text>
      <HStack ml="auto" space={2}>
        <Image source={gold} style={styles.goldIcon} />
        <Text style={styles.subtext}>
          打赏 <Text style={styles.goldText}>20</Text> 金币
        </Text>
      </HStack>
    </HStack>
  );
};

const SystemCard = ({ data }) => {
  return (
    <HStack style={styles.cardContainer} space={2}>
      <Image source={SystemIcon} style={styles.systemIcon} />
      <VStack space={2} flexShrink={1}>
        <Text style={styles.whiteText}>系统公告</Text>
        <Text style={styles.subtext}>
          您的视频“xxxxxxx”涉嫌违规，被强制下架，请及时查看
        </Text>
      </VStack>
    </HStack>
  );
};

// ** START: WORKS AND VLOGS
const WorksVlogs = ({ route }) => {
  // ** global state
  const { api_token } = userStore((store) => store);
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
        data={[1]}
        keyExtractor={(item, index) => "" + index}
        renderItem={({ item, index }) => (
          <>
            {route?.params.postMessage === "likes" && (
              <LikeVideos data={data} />
            )}
            {route?.params.postMessage === "FanCard" && <FanCard data={data} />}
            {route?.params.postMessage === "comments" && (
              <CommentVideos data={data} />
            )}
            {route?.params.postMessage === "IncomeCard" && (
              <IncomeCard data={data} />
            )}
            {route?.params.postMessage === "SystemCard" && (
              <SystemCard data={data} />
            )}
          </>
        )}
        ListFooterComponent={() => (
          <>
            {/* the gap will be remove if the lastpage is been fetch */}
            {lastPage !== page || (lastPage === page && isLoading) ? (
              <View style={{ marginBottom: 60 }}>
                {/* to have a gap in bottom part of section to see the loading icon */}
                {isLoading ? <Loading /> : null}
              </View>
            ) : null}
            {lastPage === page && !isLoading ? <BottomMessage /> : null}
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
        data={[1]}
        keyExtractor={(item, index) => "" + index}
        renderItem={({ item, index }) => (
          <React.Fragment key={index}>
            {route?.params.postMessage === "likes" && <LikeFeeds data={data} />}
            {route?.params.postMessage === "FanCard" && <FanCard data={data} />}
            {route?.params.postMessage === "comments" && (
              <CommentFeeds data={data} />
            )}
            {route?.params.postMessage === "IncomeCard" && (
              <IncomeCard data={data} />
            )}
            {route?.params.postMessage === "SystemCard" && (
              <SystemCard data={data} />
            )}
          </React.Fragment>
        )}
        ListFooterComponent={() => (
          <>
            {/* the gap will be remove if the lastpage is been fetch */}
            {lastPage !== page || (lastPage === page && isLoading) ? (
              <View style={{ marginBottom: 60 }}>
                {/* to have a gap in bottom part of section to see the loading icon */}
                {isLoading ? <Loading /> : null}
              </View>
            ) : null}
            {lastPage === page && !isLoading ? <BottomMessage /> : null}
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
});
