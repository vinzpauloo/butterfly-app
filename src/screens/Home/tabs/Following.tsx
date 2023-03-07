import {
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";

import { TEMPORARY_CUSTOMER_ID } from "react-native-dotenv";
import { Center, useDisclose } from "native-base";
import { MasonryFlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import DividerContainer from "features/sectionList/components/DividerContainer";
import Loading from "components/Loading";
import Modal from "components/BottomModal";
import NoFollowingImg from "assets/images/nofollowing.png";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import VIPTag from "components/VIPTag";
import WorkService from "services/api/WorkService";
import { GLOBAL_COLORS } from "global";
import { reelsVideos } from "data/reelsVideos";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FollowingBottomContent,
  GridVideosBottomContent,
} from "features/sectionList/components/GridVideos";

const { width, height } = Dimensions.get("window");

const Video = ({
  item,
  index,
  onOpen,
  setId,
  isFollowingScreen = false,
}: any) => {
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

  const handleThreeDots = (e) => {
    onOpen(e);
    setId(item._id);
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
      {isFollowingScreen ? (
        <FollowingBottomContent item={item} />
      ) : (
        <GridVideosBottomContent
          username={item?.user?.username}
          onOpen={onOpen}
          setId={setId}
          id={item._id}
        />
      )}
    </TouchableOpacity>
  );
};

const NoFollowing = ({
  data,
  onOpen,
  isLoading,
  refreshing,
  setId,
  setRefreshing,
  setData,
  setRefreshingId,
}) => {
  const navigation = useNavigation<any>();
  const { followCreator } = CustomerService();
  // for follow
  const { mutate: mutateFollow } = useMutation(followCreator, {
    onSuccess: (data) => {
      console.log("followingFollowCreator", data);
    },
    onError: (error) => {
      console.log("followingFollowCreator", error);
    },
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setData([]);
      setRefreshingId((prev) => prev + 1);
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleFollow = (userId) => {
    mutateFollow({
      site_id: 1,
      user_id: userId,
      customer_id: TEMPORARY_CUSTOMER_ID,
    });
  };

  const navigateSingleUser = (userId) => {
    navigation.navigate("SingleUser", {
      userID: userId,
    });
  };

  if (isLoading || refreshing) {
    return (
      <View style={{ height }}>
        <VideoListSkeleton />
      </View>
    );
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={[GLOBAL_COLORS.secondaryColor]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Container>
        <Image source={NoFollowingImg} style={styles.image} />
        <Text style={styles.popular}>近期热门用户</Text>
        {data.map((item, index) => (
          <View key={index}>
            <View style={styles.usersCategoryContainer}>
              <View style={styles.headerContent}>
                <Pressable
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => navigateSingleUser(item[0].user_id)}
                >
                  <Image
                    source={{ uri: item[0].user.photo }}
                    style={styles.modelImg}
                  />
                  <Text style={styles.modelName}>{item[0].user.username}</Text>
                </Pressable>
                <Pressable
                  style={styles.followBtn}
                  onPress={() => handleFollow(item[0].user_id)}
                >
                  <Text style={styles.followText}>关注</Text>
                </Pressable>
              </View>
              <MasonryFlashList
                numColumns={2}
                data={item}
                renderItem={({ item, index }: any) => (
                  <Video
                    item={item}
                    index={index}
                    onOpen={onOpen}
                    setId={setId}
                  />
                )}
                keyExtractor={(_, index) => "" + index}
                estimatedItemSize={2}
              />
            </View>
            {data.length - 1 !== index ? <DividerContainer /> : null}
          </View>
        ))}
        <BottomMessage />
      </Container>
    </ScrollView>
  );
};

const Follow = ({
  data,
  onOpen,
  isLoading,
  lastPage,
  page,
  refreshing,
  setData,
  setPage,
  setId,
  setRefreshing,
  setRefreshingId,
}) => {
  const [startScroll, setStartScroll] = useState(true);

  console.log("refresh");

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

  if ((isLoading || refreshing) && page === 1) {
    return (
      <View style={{ height }}>
        <VideoListSkeleton />
      </View>
    );
  }

  return (
    <View style={styles.gridVideoContainer}>
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
        renderItem={({ item, index }: any) => (
          <Video
            item={item}
            index={index}
            onOpen={onOpen}
            setId={setId}
            isFollowingScreen={true}
          />
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
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [id, setId] = useState(null);

  const { isLoading } = useQuery({
    queryKey: ["getWorkFollowing", page, refreshingId],
    queryFn: () =>
      getWorkFollowing({
        following_only: true,
        customer_id: "9896c8d2-81c1-4d38-8049-ecf2401bde0d", //id for no following -> 98914c9b-294b-4fa2-a593-06f1ec8a0c7b
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
          setData={setData}
          setPage={setPage}
          setId={setId}
          refreshing={refreshing}
          setRefreshing={setRefreshing}
          setRefreshingId={setRefreshingId}
        />
      ) : (
        <NoFollowing
          data={data}
          onOpen={onOpen}
          isLoading={isLoading}
          refreshing={refreshing}
          setId={setId}
          setRefreshing={setRefreshing}
          setData={setData}
          setRefreshingId={setRefreshingId}
        />
      )}
      <Center flex={1} px="3">
        <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} id={id} />
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
