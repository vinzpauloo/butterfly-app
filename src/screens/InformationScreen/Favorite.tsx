import {
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";

import Entypo from "react-native-vector-icons/Entypo";
import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "@react-navigation/native";
import { useDisclose } from "native-base";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import Loading from "components/Loading";
import MasonrySkeleton from "components/skeletons/MasonrySkeleton";
import Modal from "components/BottomModal";
import NoCacheMessage from "features/sectionList/components/NoCacheMessage";
import VideoComponent from "components/VideoComponent";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../zustand/userStore";
import { translationStore } from "../../zustand/translationStore";

export const GridVideosBottomContent = ({ onOpen, username, setId, id }) => {
  const handlePress = (event) => {
    setId(id);
    onOpen(event);
  };
  return (
    <View style={styles.textContent}>
      <Text style={styles.username} numberOfLines={1}>
        {username}
      </Text>
      <Pressable style={{ padding: 4 }} onPress={handlePress}>
        <Entypo
          name="dots-three-vertical"
          color={GLOBAL_COLORS.inactiveTextColor}
        />
      </Pressable>
    </View>
  );
};

export const Video = ({ item, onOpen, setId }: any) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const videoHeight =
    item.work.orientation === "Landscape" ? width * 0.3 : width * 0.5;
  const handlePress = () => {
    if (item.work.orientation === "Landscape") {
      navigation.navigate("SingleVideo", {
        id: item.work?._id,
      });
    } else {
      navigation.navigate("VlogScreen", {
        id: item.work?._id,
      });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.videoContainer}
      onPress={handlePress}
    >
      <View style={styles.thumbnailContainer}>
        <VideoComponent item={{ ...item.work, ...item }} />
        <Image
          source={{ uri: BASE_URL_FILE_SERVER + item.work.thumbnail_url }}
          style={[styles.video, { height: videoHeight }]}
        />
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.titleContent}>
          <Text style={[styles.text, styles.title]} numberOfLines={2}>
            {item?.work.title}
          </Text>
        </View>
        <GridVideosBottomContent
          username={item?.creator.username}
          onOpen={onOpen}
          setId={setId}
          id={item._id}
        />
      </View>
    </TouchableOpacity>
  );
};

// ** START: CONTENTS
const Contents = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [id, setId] = useState<number | null>(null);

  return (
    <View style={styles.gridVideoContainer}>
      <MasonryList
        // estimatedItemSize={166}
        numColumns={2}
        data={data}
        renderItem={({ item }: any) => (
          <Video item={item} onOpen={onOpen} setId={setId} />
        )}
        keyExtractor={(_, index) => "" + index}
      />

      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} id={id} />
    </View>
  );
};
// ** END: CONTENTS

export default function Favorite() {
  // ** global state
  const { api_token } = userStore((store) => store);
  const { translations } = translationStore((store) => store);
  // ** state
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshingId, setRefreshingId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [startScroll, setStartScroll] = useState(true);
  // ** api
  const { getCustomerWorkFeeds } = CustomerService();

  const { isLoading, isRefetching } = useQuery({
    queryKey: ["Chat-Information-Category-Favorites", page, refreshingId],
    queryFn: () =>
      getCustomerWorkFeeds({
        token: api_token,
        category: "favorites",
        data: { type: "works" },
      }),
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

  if (isLoading || isRefetching) {
    return (
      <Container>
        <MasonrySkeleton />
      </Container>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[GLOBAL_COLORS.secondaryColor]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
        onTouchStart={() => setStartScroll(false)}
        onEndReached={reachEnd}
        data={[1]}
        keyExtractor={(item, index) => "" + index}
        renderItem={({ item, index }) => <Contents key={index} data={data} />}
        ListEmptyComponent={!!data.length ? null : <NoCacheMessage />}
        ListFooterComponent={() => (
          <>
            {/* the gap will be remove if the lastpage is been fetch */}
            {lastPage !== page || (lastPage === page && isLoading) ? (
              <View style={{ marginBottom: 60 }}>
                {/* to have a gap in bottom part of section to see the loading icon */}
                {isLoading ? <Loading /> : null}
              </View>
            ) : null}
            {lastPage === page && !isLoading && data.length ? (
              <BottomMessage />
            ) : null}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
  gridVideoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  thumbnailContainer: {
    position: "relative",
  },
  videoContainer: {
    margin: 5,
  },
  video: {
    width: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  textContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  bottomContent: {
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  titleContent: {
    height: 40,
    marginBottom: 3,
  },
  title: {
    paddingHorizontal: 5,
    fontSize: 15,
  },
  text: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  username: {
    color: GLOBAL_COLORS.usernameTextColor,
    fontSize: 13,
  },
  modelImg: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  modelText: {
    fontSize: 12,
    color: GLOBAL_COLORS.usernameTextColor,
    paddingHorizontal: 5,
  },
  modelLikeCount: {
    fontSize: 12,
    color: GLOBAL_COLORS.primaryTextColor,
    paddingHorizontal: 5,
  },
  videoComponents: {
    position: "absolute",
    zIndex: 10,
  },
  videoIcon: {
    width: 15,
    height: 15,
  },
  emptyResult: {
    textAlign: "center",
    fontSize: 30,
    marginVertical: 15,
    color: GLOBAL_COLORS.secondaryColor,
  },
});
