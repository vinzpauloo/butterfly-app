import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import GridVideos from "features/sectionList/components/GridVideos";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import { Work } from "hooks/useWork";
import Loading from "components/Loading";
import { FlashList } from "@shopify/flash-list";

const Recommended = ({ tag, userId }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [startScroll, setStartScroll] = useState(true);
  const { getWorkRecommended } = Work();

  const { isLoading } = useQuery({
    queryKey: ["recommendedSingleTag", tag, page],
    queryFn: () =>
      getWorkRecommended({
        tag,
        with: "user",
        ads: false,
        page: page,
        user_id: userId,
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
    onError: (error) => {
      //error handler
      console.log("Error", error);
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

  return (
    <Container>
      {isLoading && page === 1 ? (
        <VideoListSkeleton />
      ) : (
        <FlashList
          data={[0]}
          onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
          onMomentumScrollBegin={() => setStartScroll(false)}
          onEndReached={reachEnd}
          bounces={false}
          estimatedItemSize={200}
          keyExtractor={(item, index) => "" + index}
          renderItem={() => {
            return <GridVideos data={data} />;
          }}
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

export default Recommended;

const styles = StyleSheet.create({});
