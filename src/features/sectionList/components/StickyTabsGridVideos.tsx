import { RefreshControl, View } from "react-native";
import React, { useCallback, useState } from "react";

import { Tabs } from "react-native-collapsible-tab-view";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import Loading from "components/Loading";
import MasonrySkeleton from "components/skeletons/MasonrySkeleton";
import { GLOBAL_COLORS } from "global";

const StickyTabsGridVideos = ({
  isLoading,
  page,
  refreshing,
  setData,
  setRefreshing,
  setRefreshingId,
  setPage,
  lastPage,
  layout,
  isRefetching,
}) => {
  const [startScroll, setStartScroll] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setData([]);
      setPage(1);
      setRefreshingId((prev) => prev + 1);
      setRefreshing(false);
    }, 2000);
  }, []);

  const reachEnd = () => {
    if (startScroll) return null;
    if (!isLoading) {
      if (lastPage !== page) {
        setPage((prev) => prev + 1);
        setStartScroll(true);
      }
    }
  };

  if ((isLoading || isRefetching) && page === 1) {
    return (
      <Container>
        <Tabs.ScrollView
          accessibilityComponentType={undefined}
          accessibilityTraits={undefined}
          scrollEnabled={false}
        >
          <MasonrySkeleton />
        </Tabs.ScrollView>
      </Container>
    );
  }

  return (
    <Container>
      <Tabs.FlatList
        refreshControl={
          <RefreshControl
            colors={[GLOBAL_COLORS.secondaryColor]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={[1]}
        nestedScrollEnabled={true}
        onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
        onTouchStart={() => setStartScroll(false)}
        onEndReached={reachEnd}
        keyExtractor={(item, index) => "" + index}
        renderItem={() => layout}
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

export default StickyTabsGridVideos;
