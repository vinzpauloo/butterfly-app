import { RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";

import moment from "moment";
import { FlashList } from "@shopify/flash-list";
import { VStack, useDisclose } from "native-base";
import { useQuery } from "@tanstack/react-query";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import Loading from "components/Loading";
import Modal from "components/BottomModal";
import NoCacheMessage from "features/sectionList/components/NoCacheMessage";
import Video from "screens/MainProfile/components/Video";
import VideoHistorySkeleton from "components/skeletons/VidoeHistorySkeleton";
import WorkService from "services/api/WorkService";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../../../zustand/translationStore";
import { userStore } from "../../../../zustand/userStore";

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

export default function index() {
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
            {lastPage === page && !isLoading && !!data?.data.length ? (
              <BottomMessage />
            ) : null}
          </>
        )}
      />
      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} id={id} />
    </Container>
  );
}

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
