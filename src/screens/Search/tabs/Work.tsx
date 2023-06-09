import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import { MasonryFlashList } from "@shopify/flash-list";
import { useDisclose } from "native-base";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import GeneralSearch from "services/api/GeneralSearch";
import Loading from "components/Loading";
import NoCacheMessage from "features/sectionList/components/NoCacheMessage";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../../zustand/userStore";
import { Video } from "features/sectionList/components/GridVideos";
import { translationStore } from "../../../zustand/translationStore";

const Work = ({ searchText, fetchChecker, setFetchChecker, page, setPage }) => {
  const token = userStore((state) => state.api_token);
  const translation = translationStore((state) => state.translations);
  const { isOpen, onOpen, onClose } = useDisclose();
  const { getSearchPage } = GeneralSearch();
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [startScroll, setStartScroll] = useState(true);
  const [id, setId] = useState<number | null>(null);
  const isFocused = useIsFocused();
  const [prevSearch, setPrevSearch] = useState("");

  const { isLoading } = useQuery({
    queryKey: ["search-work", searchText, page],
    queryFn: () =>
      getSearchPage({
        data: { work_only: true, keyword: searchText, page: page },
        token: token,
      }),
    onError: (error) => {
      console.log("search-work", error);
    },
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setFetchChecker((prev) => {
        return { ...prev, work: false };
      });
      if (prevSearch !== searchText) {
        setPrevSearch(searchText);
        setData(data.data);
      } else {
        setData((prev) => [...prev].concat(data.data));
      }
    },
    enabled: fetchChecker.work && isFocused,
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

  useEffect(() => {
    setData([]);
  }, [searchText]);

  useEffect(() => {
    setFetchChecker((prev) => {
      return { ...prev, work: true };
    });
  }, [page, searchText]);

  if (
    (isLoading && page === 1 && prevSearch !== searchText) ||
    (data.length === 0 && fetchChecker.work)
  ) {
    return (
      <Container>
        <View style={{ height: "100%" }}>
          <VideoListSkeleton />
        </View>
      </Container>
    );
  }

  return (
    <Container>
      {data.length === 0 && !isLoading ? (
        <NoCacheMessage />
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
              isFollowingScreen={true}
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
