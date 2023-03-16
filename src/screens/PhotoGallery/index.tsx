import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
} from "react-native";

import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";

import BottomMessage from "components/BottomMessage";
import Loading from "components/Loading";
import { GLOBAL_COLORS } from "global";
import AlbumsService from "services/api/AlbumsService";
import { userStore } from "../../zustand/userStore";
import { Text } from "native-base";

const { width } = Dimensions.get("window");

const PhotoGallery = () => {
  const token = userStore((state) => state.api_token);
  const route = useRoute<any>();
  const { imageList, index, albumId } = route.params;
  // const [isQueryEnable, setIsQueryEnable] = useState(!!albumId);
  const { getAlbumById } = AlbumsService();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [startScroll, setStartScroll] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(0);

  const { isLoading } = useQuery({
    queryKey: ["singleAlbum", albumId, page, refreshingId],
    queryFn: () => getAlbumById({ albumId, token }),
    onSuccess: (data) => {
      console.log(`getAlbumById(${albumId})`, data.data);
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
    onError: (error) => {
      console.log("getAds Error", error);
    },
    enabled: !!albumId,
  });

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

  return (
    <View style={styles.container}>
      {!!route?.params.fromFeedItem ? (
        <FlatList
          data={imageList}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={index}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                style={styles.postImage}
                source={{ uri: item.url, cache: "only-if-cached" }}
              />
            </View>
          )}
        />
      ) : (
        <FlashList
          refreshControl={
            <RefreshControl
              colors={[GLOBAL_COLORS.secondaryColor]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={data}
          onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
          onMomentumScrollBegin={() => setStartScroll(false)}
          onEndReached={reachEnd}
          renderItem={({ item }: any) => (
            <View style={styles.imageContainer}>
              <Image
                style={{ aspectRatio: item.width / item.height }}
                source={{ uri: item.photo, cache: "only-if-cached" }}
              />
            </View>
          )}
          estimatedItemSize={width}
          keyExtractor={(item, index) => "" + index}
          initialScrollIndex={index}
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
    </View>
  );
};

export default PhotoGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBAL_COLORS.primaryColor,
    minHeight: 100,
  },
  imageContainer: {
    justifyContent: "center",
    alignContent: "center",
  },
  postImage: {
    width: width,
    resizeMode: "contain",
    height: "100%",
  },
});
