import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import Container from "components/Container";
import GeneralSearch from "services/api/GeneralSearch";
import GridVideos, { Video } from "features/sectionList/components/GridVideos";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import { userStore } from "../../../zustand/userStore";
import { GLOBAL_COLORS } from "global";
import { MasonryFlashList } from "@shopify/flash-list";
import { useDisclose } from "native-base";
import Loading from "components/Loading";
import BottomMessage from "components/BottomMessage";

const Work = ({ searchText }) => {
  const token = userStore((state) => state.api_token);
  const { isOpen, onOpen, onClose } = useDisclose();
  const { getSearchPage } = GeneralSearch();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [startScroll, setStartScroll] = useState(true);
  const [id, setId] = useState<number | null>(null);

  const { isLoading } = useQuery({
    queryKey: ["search-work", searchText, page],
    queryFn: () =>
      getSearchPage(
        { work_only: true, keyword: searchText, page: page },
        token
      ),
    onError: (error) => {
      console.log("search-work", error);
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

  if (data.length === 0) {
    return (
      <Container>
        <Text style={styles.emptyResult}>No Data</Text>
      </Container>
    );
  }

  return (
    <Container>
      {isLoading && page === 1 ? (
        <VideoListSkeleton />
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
    </Container>
  );
};

export default Work;

const styles = StyleSheet.create({
  emptyResult: {
    textAlign: "center",
    fontSize: 30,
    marginVertical: 15,
    color: GLOBAL_COLORS.secondaryColor,
  },
});
