import {
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";

import Entypo from "react-native-vector-icons/Entypo";
import moment from "moment";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { FlashList } from "@shopify/flash-list";
import { HStack, VStack, useDisclose } from "native-base";
import { useQuery } from "@tanstack/react-query";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import Loading from "components/Loading";
import Modal from "components/BottomModal";
import VideoComponent from "components/VideoComponent";
import WorkService from "services/api/WorkService";
import { GLOBAL_COLORS, GLOBAL_SCREEN_SIZE } from "global";
import { translationStore } from "../../zustand/translationStore";
import { userStore } from "../../zustand/userStore";
import { useNavigation } from "@react-navigation/native";
import VideoHistorySkeleton from "components/skeletons/VidoeHistorySkeleton";

// **** START: COMPONENTS **** //
const Layout = ({ children, style = null }) => {
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      backgroundColor: GLOBAL_COLORS.primaryColor,
      ...style,
    },
  });
  return <View style={styles.container}>{children}</View>;
};
// **** END: COMPONENTS **** //

const Video = ({ item, onOpen, setId }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const translations = translationStore((state) => state.translations);
  const WIDTH_IMG = width < GLOBAL_SCREEN_SIZE.mobileMedium ? "40%" : "30%";
  const WIDTH_CONTENT = width < GLOBAL_SCREEN_SIZE.mobileMedium ? "60%" : "70%";

  const handlePressDots = (event) => {
    setId(item._id);
    onOpen(event);
  };

  const handlePress = () => {
    navigation.navigate("SingleVideo", {
      id: item._id,
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <HStack width="full" height="20" my="1.5">
        <VStack width={WIDTH_IMG} height="full" position="relative">
          <VideoComponent item={item} />
          <Image
            source={{ uri: BASE_URL_FILE_SERVER + item.thumbnail_url }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%", borderRadius: 4 }}
          />
        </VStack>
        <VStack
          width={WIDTH_CONTENT}
          height="full"
          py="0.5"
          pl="2"
          justifyContent="space-between"
        >
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.subtitle}>
            {translations.duration}: {item.duration}
          </Text>
          <HStack alignItems="center" justifyContent="space-between">
            <Text style={styles.subtitle}>{item.user.username}</Text>
            <Pressable onPress={handlePressDots}>
              <Entypo
                name="dots-three-vertical"
                color={GLOBAL_COLORS.inactiveTextColor}
              />
            </Pressable>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};

// **** START: CONTENT **** //
const Content = ({ title, data, onOpen, setId }) => {
  return (
    <Layout>
      <VStack my={1}>
        <Text style={styles.contentTitle}>{title}</Text>
        {data.map((item, index) => (
          <Video key={index} item={item} onOpen={onOpen} setId={setId} />
        ))}
      </VStack>
    </Layout>
  );
};
// **** END: CONTENT **** //

const index = () => {
  const translation = translationStore((state) => state.translations);
  const { isOpen, onOpen, onClose } = useDisclose();
  // **** GLOBAL STATE
  const { api_token } = userStore((store) => store);
  const translations = translationStore((state) => state.translations);
  // **** STATE
  const [id, setId] = useState<String>("");
  const [history, setHistory] = useState({
    today: [],
    yesterday: [],
    earlier: [],
  });
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshingId, setRefreshingId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [startScroll, setStartScroll] = useState(true);
  // **** API
  const { getWorks } = WorkService();

  const { isLoading, data } = useQuery({
    queryKey: ["work-history", page, refreshingId],
    queryFn: () =>
      getWorks({
        data: {
          history: true,
          with: "user,statistic",
          page: page,
        },
        token: api_token,
      }),
    onSuccess: (data) => {
      data.data.map((item) => {
        // check if the date is TODAY
        if (moment(item.view_at).calendar().includes("Today")) {
          setHistory((prev) => {
            return { ...prev, today: [...prev.today, item] };
          });
        }
        // check if the date is YESTERDAY
        else if (moment(item.view_at).calendar().includes("Yesterday")) {
          setHistory((prev) => {
            return { ...prev, yesterday: [...prev.yesterday, item] };
          });
          // check if the date is EARLIER
        } else {
          setHistory((prev) => {
            return { ...prev, earlier: [...prev.earlier, item] };
          });
        }
      });
      setLastPage(data.last_page);
    },
    onError: (error) => {
      console.log("ERROR IN WORK HISTORY", error);
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
      setHistory({
        today: [],
        yesterday: [],
        earlier: [],
      });
      setPage(1);
      setRefreshingId((prev) => prev + 1);
      setRefreshing(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <VideoHistorySkeleton />;
  }

  return (
    <Container>
      <FlashList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[GLOBAL_COLORS.secondaryColor]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onTouchStart={() => setStartScroll(false)}
        onEndReached={reachEnd}
        data={[0]}
        renderItem={({ item, index }) => (
          <Layout>
            {!!history.today.length ? (
              <Content
                title={translations.today}
                data={history.today}
                onOpen={onOpen}
                setId={setId}
              />
            ) : null}
            {!!history.yesterday.length ? (
              <Content
                title={translations.yesterday}
                data={history.yesterday}
                onOpen={onOpen}
                setId={setId}
              />
            ) : null}
            {!!history.earlier.length ? (
              <Content
                title={translations.earlier}
                data={history.earlier}
                onOpen={onOpen}
                setId={setId}
              />
            ) : null}
          </Layout>
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
            {lastPage === page && !isLoading && !!data?.data.length ? (
              <BottomMessage />
            ) : null}
            {!!data?.data.length ? null : (
              <Text style={styles.emptyResult}>{translation.noData}</Text>
            )}
          </>
        )}
      />
      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} id={id} />
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  contentTitle: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  title: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  subtitle: {
    color: GLOBAL_COLORS.inactiveTextColor,
  },
  emptyResult: {
    textAlign: "center",
    fontSize: 30,
    marginVertical: 15,
    color: GLOBAL_COLORS.secondaryColor,
  },
});
