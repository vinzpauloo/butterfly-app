import { RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";

import { FlashList } from "@shopify/flash-list";
import { useDisclose } from "native-base";
import { useQuery } from "@tanstack/react-query";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import Loading from "components/Loading";
import Modal from "components/BottomModal";
import NoCacheMessage from "features/sectionList/components/NoCacheMessage";
import Video from "screens/MainProfile/components/Video";
import VideoHistorySkeleton from "components/skeletons/VidoeHistorySkeleton";
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

export default function index() {
  const { isOpen, onOpen, onClose } = useDisclose();
  // **** GLOBAL STATE
  const { api_token } = userStore((store) => store);
  const translations = translationStore((state) => state.translations);
  // **** STATE
  const [id, setId] = useState<String>("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshingId, setRefreshingId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [startScroll, setStartScroll] = useState(true);
  // **** API
  const { getBoughtVideos } = CustomerService();

  const { isLoading } = useQuery({
    queryKey: ["work-purchased", page, refreshingId],
    queryFn: () =>
      getBoughtVideos({
        token: api_token,
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
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
      setData([]);
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
        data={data}
        renderItem={({ item, index }) => (
          <Layout>
            <Video item={item} onOpen={onOpen} setId={setId} />
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
            {lastPage === page && !isLoading && !!data.length ? (
              <BottomMessage />
            ) : null}
          </>
        )}
      />
      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} id={id} />
    </Container>
  );
}
