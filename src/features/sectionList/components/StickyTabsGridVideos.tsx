import { View } from "react-native";
import React, { useState } from "react";
import Container from "components/Container";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import Loading from "components/Loading";
import BottomMessage from "components/BottomMessage";

import { Tabs } from "react-native-collapsible-tab-view";

const StickyTabsGridVideos = ({
  isLoading,
  page,
  setPage,
  lastPage,
  layout,
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

  return (
    <Container>
      {isLoading && page === 1 ? (
        <VideoListSkeleton />
      ) : (
        <Tabs.FlatList
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
      )}
    </Container>
  );
};

export default StickyTabsGridVideos;
