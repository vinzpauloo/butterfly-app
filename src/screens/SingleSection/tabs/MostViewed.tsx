import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { useDisclose } from "native-base";
import { useQuery } from "@tanstack/react-query";

import Loading from "components/Loading";
import MasonrySkeleton from "components/skeletons/MasonrySkeleton";
import Modal from "components/BottomModal";
import WorkgroupService from "services/api/WorkgroupService";
import { GLOBAL_COLORS } from "global";
import { MasonryFlashList } from "@shopify/flash-list";
import { Video } from "features/sectionList/components/GridVideos";

const BottomMessage = () => {
  return (
    <View>
      <Text style={styles.bottomText}>人家也是有底线的啦！</Text>
    </View>
  );
};

const MostViewed = ({ id: selectionId }) => {
  const { getMostViewed } = WorkgroupService();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [id, setId] = useState<number | null>(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [startScroll, setStartScroll] = useState(true);

  const { isLoading } = useQuery({
    queryKey: ["most-viewed", selectionId, page],
    queryFn: () =>
      getMostViewed({
        id: selectionId,
        most_viewed: true,
        with: "user",
        paginate: 10,
        page: page,
      }),
    onError: (error) => {
      console.log("most-viewed", error);
    },
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

  return (
    <View style={styles.gridVideoContainer}>
      {isLoading && page === 1 ? (
        <MasonrySkeleton />
      ) : (
        <MasonryFlashList
          data={[]} // will change tomorrow to data since the api have a problem
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
              isFollowingScreen={false}
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

export default MostViewed;

const styles = StyleSheet.create({
  gridVideoContainer: {
    flex: 1,
    minHeight: 100,
    paddingHorizontal: 10,
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
  bottomText: {
    textAlign: "center",
    color: "#999",
    marginTop: 15,
    marginBottom: 20,
    fontSize: 14,
  },
});
