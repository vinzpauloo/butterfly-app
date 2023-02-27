import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import Entypo from "react-native-vector-icons/Entypo";
import { MasonryFlashList } from "@shopify/flash-list";
import { Center, useDisclose } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import DividerContainer from "features/sectionList/components/DividerContainer";
import GridVideos from "features/sectionList/components/GridVideos";
import MasonrySkeleton from "components/skeletons/MasonrySkeleton";
import Modal from "components/BottomModal";
import NoFollowingImg from "assets/images/nofollowing.png";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import VIPTag from "components/VIPTag";
import WorkService from "services/api/WorkService";
import { GLOBAL_COLORS } from "global";
import { useQuery } from "@tanstack/react-query";
import { reelsVideos } from "data/reelsVideos";
import Loading from "components/Loading";

const { width, height } = Dimensions.get("window");

const Video = ({ item, index, onOpen }: any) => {
  const navigation = useNavigation<any>();
  const videoHeight =
    item.orientation === "Landscape" ? width * 0.3 : width * 0.5;
  const handlePress = () => {
    if (item.orientation === "Landscape") {
      navigation.navigate("SingleVideo", {
        image: item.user.photo,
        username: item.user.username,
        followers: "123456789",
        id: item._id,
        userId: item.user.id,
      });
    } else {
      navigation.navigate("VlogScreen", {
        reelsVideos: reelsVideos,
      });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.videoContainer,
        index % 2 === 0 ? { marginRight: 5 } : { marginLeft: 5 },
      ]}
      onPress={handlePress}
    >
      <View style={styles.thumbnailContainer}>
        <VIPTag isAbsolute={true} />
        <Image
          source={{ uri: item.thumbnail_url }}
          style={(styles.video, { height: videoHeight })}
        />
      </View>
      <View style={styles.titleContent}>
        <Text style={[styles.text, styles.title]} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
      <View style={styles.textContent}>
        <Text style={styles.text}>{item.user.username}</Text>
        <Pressable
          style={{
            height: 15,
            width: 15,
            alignItems: "center",
          }}
          onPress={onOpen}
        >
          <Entypo name="dots-three-vertical" color={"#fff"} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

const NoFollowing = ({ data, onOpen, isLoading }) => {
  if (isLoading) {
    return <VideoListSkeleton />;
  }
  return (
    <>
      <Image source={NoFollowingImg} style={styles.image} />
      <Text style={styles.popular}>近期热门用户</Text>
      {data.map((item, index) => (
        <View key={index}>
          <View style={styles.usersCategoryContainer}>
            <View style={styles.headerContent}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: item[0].user.photo }}
                  style={styles.modelImg}
                />
                <Text style={styles.modelName}>{item[0].user.username}</Text>
              </View>
              <TouchableOpacity activeOpacity={1} style={styles.followBtn}>
                <Text style={styles.followText}>关注</Text>
              </TouchableOpacity>
            </View>
            <MasonryFlashList
              numColumns={2}
              data={item}
              renderItem={({ item, index }: any) => (
                <Video item={item} index={index} onOpen={onOpen} />
              )}
              keyExtractor={(_, index) => "" + index}
              estimatedItemSize={12}
            />
          </View>
          {data.length - 1 !== index ? <DividerContainer /> : null}
        </View>
      ))}
      <BottomMessage />
    </>
  );
};

const Follow = ({ data, onOpen, isLoading, lastPage, page, setPage }) => {
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

  if (isLoading) {
    <MasonrySkeleton />;
  }
  return (
    <View style={styles.gridVideoContainer}>
      <MasonryFlashList
        data={data}
        numColumns={2}
        onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
        onMomentumScrollBegin={() => setStartScroll(false)}
        onEndReached={reachEnd}
        estimatedItemSize={200}
        renderItem={({ item, index }: any) => (
          <Video item={item} index={index} onOpen={onOpen} />
        )}
        keyExtractor={(_, index) => "" + index}
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
    </View>
  );
};

const Following = () => {
  const { getWorkFollowing } = WorkService();
  const [haveFollowing, setHaveFollowing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [followingDataIsLoaded, setFollowingDataIsLoaded] = useState(false);

  const { isLoading } = useQuery({
    queryKey: ["getWorkFollowing", page],
    queryFn: () =>
      getWorkFollowing({
        following_only: true,
        customer_id: "9890d6fe-650a-4733-8c30-75cba415d08b", //id for no following -> 9890d6fe-64b8-4584-9de5-9fad47c0fc69
        page: page,
        paginate: 8,
      }),
    onSuccess: (data) => {
      if (Array.isArray(data)) {
        setHaveFollowing(false);
        setData(data);
      } else {
        setHaveFollowing(true);
        setData((prev) => [...prev].concat(data.data));
        setLastPage(data?.last_page);
      }
    },
    onError: (error) => {
      console.log("getWorkFollowing", error);
    },
  });

  return (
    <View style={styles.container}>
      {haveFollowing ? (
        <Follow
          data={data}
          onOpen={onOpen}
          isLoading={isLoading}
          lastPage={lastPage}
          page={page}
          setPage={setPage}
        />
      ) : (
        <ScrollView>
          <Container>
            <NoFollowing data={data} onOpen={onOpen} isLoading={isLoading} />
          </Container>
        </ScrollView>
      )}
      <Center flex={1} px="3">
        <Modal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          id={undefined}
        />
      </Center>
    </View>
  );
};

export default Following;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbnailContainer: {
    position: "relative",
  },
  image: {
    width: width,
    height: 150,
    resizeMode: "cover",
  },
  popular: {
    color: "#fff",
    borderLeftColor: GLOBAL_COLORS.secondaryColor,
    borderLeftWidth: 3,
    paddingHorizontal: 12,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  usersCategoryContainer: {
    flex: 1,
    minHeight: 100,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modelImg: {
    height: 26,
    width: 26,
    borderRadius: 13,
  },
  modelName: {
    color: "#fff",
    marginHorizontal: 5,
  },
  followBtn: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 2,
  },
  followText: {
    color: "#fff",
    textAlign: "center",
  },
  videoContainer: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#fff",
  },
  video: {
    width: "100%",
  },
  textContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  titleContent: {
    height: 35,
    marginBottom: 5,
  },
  title: {
    paddingHorizontal: 5,
    fontSize: 16,
  },
  text: {
    color: "#fff",
  },
  gridVideoContainer: {
    flex: 1,
    minHeight: "100%",
    paddingHorizontal: 10,
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
});
