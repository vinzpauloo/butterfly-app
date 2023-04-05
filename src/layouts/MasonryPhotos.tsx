import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Pressable,
  RefreshControl,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { VStack, HStack, Text } from "native-base";
import { MasonryFlashList } from "@shopify/flash-list";
import MasonryList from "@react-native-seoul/masonry-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useQuery } from "@tanstack/react-query";

import { photoGalleryImages } from "data/photoGalleryImages";
import Container from "components/Container";
import { GLOBAL_COLORS } from "global";
import BottomMessage from "components/BottomMessage";
import Loading from "components/Loading";
import VIPTag from "components/VIPTag";
import CustomModal from "components/CustomModal";
import MasonrySkeleton from "components/skeletons/MasonrySkeleton";
import VIPModalContent from "components/VIPModalContent";
import AlbumsService from "services/api/AlbumsService";
import { captureSuccess, captureError } from "services/sentry";
import { userStore } from "../zustand/userStore";

type SingleImageProp = {
  idx: number;
  albumId: number;
  url: string;
  postTitle: string;
  totalViews: string;
  height: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SingleImage = (props: SingleImageProp) => {
  const navigation = useNavigation<any>();
  const isVip = userStore((state) => state.is_Vip);

  const openVIPModal = () => {
    props.setOpen(true);
  };

  const handlePress = () => {
    navigation.navigate("PhotoGallery", {
      albumId: props.albumId,
      postTitle: props.postTitle,
    });
  };

  return (
    <Pressable onPress={!isVip ? openVIPModal : handlePress}>
      <ImageBackground
        source={{ uri: props.url, cache: "only-if-cached" }}
        style={[styles.singleImage, { height: props.height }]}
        resizeMode="cover"
      >
        <VIPTag />
        <VStack style={styles.blackContainer}>
          <Text style={styles.whiteText} numberOfLines={1}>
            {props.postTitle}
          </Text>
          <HStack space={1}>
            <MaterialCommunityIcons
              name="heart"
              color={GLOBAL_COLORS.secondaryColor}
              size={20}
            />
            <Text style={styles.whiteText}>{props.totalViews}</Text>
          </HStack>
        </VStack>
      </ImageBackground>
    </Pressable>
  );
};

const MasonryPhotos = ({ filter }) => {
  const token = userStore((state) => state.api_token);
  const [open, setOpen] = useState(false);
  const route = useRoute<any>();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [startScroll, setStartScroll] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(0);
  const { getAlbums } = AlbumsService();

  const { isLoading } = useQuery({
    queryKey: ["albums", filter, page, refreshingId],
    queryFn: () =>
      getAlbums({
        data: { filter, page },
        token: token,
      }),
    onSuccess: (data) => {
      console.log("getAlbums()", data);
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));

      captureSuccess(route.name, `getAlbums() ${JSON.stringify(data)}`);
    },
    onError: (error) => {
      //error handler
      console.log("getAlbums()", error);
      captureError(error, route.name, "queryFn: () => getAlbums()");
    },
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

  if (isLoading && page === 1) return <MasonrySkeleton />;

  return (
    <>
      <Container>
        <View style={styles.masonryContainer}>
          <MasonryFlashList
            refreshControl={
              <RefreshControl
                colors={[GLOBAL_COLORS.secondaryColor]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            data={data}
            numColumns={2}
            onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
            onMomentumScrollBegin={() => setStartScroll(false)}
            onEndReached={reachEnd}
            estimatedItemSize={200}
            keyExtractor={(_, index) => "" + index}
            renderItem={({ item, index }: any) => (
              <SingleImage
                idx={index}
                albumId={item._id}
                url={item.cover.cover_photo}
                postTitle={item.title}
                totalViews={item.views}
                /* height ratio of the cover photo */
                height={item.cover.cover_height / 2}
                setOpen={setOpen}
              />
            )}
            ListFooterComponent={
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
            }
          />
        </View>
      </Container>
      <CustomModal open={open} setOpen={setOpen}>
        <VIPModalContent setOpen={setOpen} />
      </CustomModal>
    </>
  );
};

export default MasonryPhotos;

const styles = StyleSheet.create({
  masonryContainer: {
    flex: 1,
    minHeight: 100,
  },
  singleImage: {
    margin: 4,
  },
  blackContainer: {
    marginTop: "auto",
    backgroundColor: "rgba(0,0,0, 0.5)",
    paddingHorizontal: 6,
  },
  whiteText: {
    color: "white",
  },
});
