import {
  RefreshControl,
  StyleSheet,
  View,
  VirtualizedList,
} from "react-native";
import React, { useCallback, useState } from "react";
import FeedContent from "./FeedContent";
import Container from "components/Container";
import { GLOBAL_COLORS } from "global";
import Loading from "components/Loading";
import BottomMessage from "components/BottomMessage";

const Feeds = ({
  data,
  isLoading,
  lastPage,
  page,
  refreshing,
  setData,
  setPage,
  setRefreshing,
  setRefreshingId,
}) => {
  const [startScroll, setStartScroll] = useState(true);

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

  return (
    <Container>
      <VirtualizedList
        refreshControl={
          <RefreshControl
            colors={[GLOBAL_COLORS.secondaryColor]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
        onMomentumScrollBegin={() => setStartScroll(false)}
        onEndReached={reachEnd}
        data={data}
        initialNumToRender={data.length}
        getItem={(_data: unknown, index: number) => ({
          id: index,
          item: data[index],
        })}
        getItemCount={() => data.length}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item, index }) => (
          <FeedContent key={index} data={item} />
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

export default Feeds;

const styles = StyleSheet.create({});
