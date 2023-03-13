import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Pressable,
  RefreshControl,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { VStack, HStack, Text } from "native-base";
import { MasonryFlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useQuery } from "@tanstack/react-query";

import { photoGalleryImages } from "data/photoGalleryImages";
import Container from "components/Container";
import { GLOBAL_COLORS } from "global";
import VIPTag from "components/VIPTag";
import CustomModal from "components/CustomModal";
import MasonrySkeleton from "components/skeletons/MasonrySkeleton";
import VIPModalContent from "components/VIPModalContent";
import AlbumsService from "services/api/AlbumsService";

type SingleImageProp = {
  idx: number;
  url: string;
  postTitle: string;
  totalViews: string;
  height: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SingleImage = (props: SingleImageProp) => {
  const navigation = useNavigation<any>();

  const openVIPModal = () => {
    props.setOpen(true);
  };

  const handlePress = () => {
    navigation.navigate("PhotoGallery", {
      postTitle: props.postTitle,
      imageList: photoGalleryImages,
    });
  };

  return (
    <Pressable onPress={props.idx === 0 ? openVIPModal : handlePress}>
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
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [startScroll, setStartScroll] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(0);
  const { getAlbums } = AlbumsService();

  const { isLoading } = useQuery({
    queryKey: ["albums", filter, refreshingId],
    queryFn: () =>
      getAlbums({
        filter,
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

  if (isLoading) return <MasonrySkeleton />;

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
            renderItem={({ item, index }) => (
              <SingleImage
                idx={index}
                url={item.cover_photo}
                postTitle={item.title}
                totalViews={item.views}
                height={200}
                setOpen={setOpen}
              />
            )}
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
