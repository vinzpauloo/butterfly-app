import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import { useDisclose } from "native-base";
import { useQuery } from "@tanstack/react-query";
import { MasonryFlashList } from "@shopify/flash-list";

import BottomMessage from "components/BottomMessage";
import Modal from "components/BottomModal";
import Loading from "components/Loading";
import MasonrySkeleton from "components/skeletons/MasonrySkeleton";
import { Video } from "features/sectionList/components/GridVideos";
import { GLOBAL_COLORS } from "global";
import { Work } from "hooks/useWork";

const Recommended = ({ tag, userId, isFollowingScreen = false }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [id, setId] = useState<number | null>(null);
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
        paginate: 20,
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
    <View style={styles.gridVideoContainer}>
      {isLoading && page === 1 ? (
        <MasonrySkeleton />
      ) : (
        <MasonryFlashList
          data={data}
          numColumns={2}
          onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
          onMomentumScrollBegin={() => setStartScroll(false)}
          onEndReached={reachEnd}
          estimatedItemSize={200}
          keyExtractor={(_, index) => "" + index}
          renderItem={({ item, index }) => (
            <Video
              key={index}
              item={item}
              isFollowingScreen={isFollowingScreen}
              onOpen={onOpen}
              setId={setId}
            />
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
      )}
      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} id={id} />
    </View>
  );
};

export default Recommended;

const styles = StyleSheet.create({
  gridVideoContainer: {
    flex: 1,
    minHeight: 100,
    paddingHorizontal: 10,
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
});
