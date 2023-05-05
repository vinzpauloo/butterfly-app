import { RefreshControl, View } from "react-native";
import React, { useCallback, useState } from "react";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import FeedContent from "components/feed/FeedContent";
import FeedItemSkeleton from "components/skeletons/FeedItemSkeleton";
import FeedService from "services/api/FeedService";
import Loading from "components/Loading";
import MomentHeader from "components/headers/MomentHeader";
import MomentHeaderSkeleton from "components/skeletons/MomentHeaderSkeleton";
import { FlashList } from "@shopify/flash-list";
import { GLOBAL_COLORS } from "global";
import { useQuery } from "@tanstack/react-query";

const StickyTabFeeds = ({
  category,
  key,
  headerData,
  headerLoading,
  token,
}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshingId, setRefreshingId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [startScroll, setStartScroll] = useState(true);
  const { getFeeds } = FeedService();

  const { isLoading, isRefetching } = useQuery({
    queryKey: [key, page, refreshingId],
    queryFn: () =>
      getFeeds({
        data: {
          [category]: true,
          with: "user,comment,like",
          page: page,
          approval: "Approved",
        },
        token,
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
    onError: (error) => {
      console.log(`Error`, error);
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
    return (
      <Container>
        <MomentHeaderSkeleton />
        <FeedItemSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <FlashList
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
        data={data}
        keyExtractor={(item, index) => "" + index}
        renderItem={({ item, index }) => (
          <>
            {index === 0 && (
              <MomentHeader data={headerData} isLoading={headerLoading} />
            )}
            <FeedContent key={index} data={item} singleFeedPadding={10} />
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
    </Container>
  );
};

export default StickyTabFeeds;
