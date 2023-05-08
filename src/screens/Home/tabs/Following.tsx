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

import { Center, HStack, VStack, useDisclose } from "native-base";
import MasonryList from "@react-native-seoul/masonry-list";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";

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
import {
  FollowingBottomContent,
  GridVideosBottomContent,
} from "features/sectionList/components/GridVideos";
import { userStore } from "../../../zustand/userStore";
import { translationStore } from "../../../zustand/translationStore";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import VideoComponent from "components/VideoComponent";
import Entypo from "react-native-vector-icons/Entypo";

const { width, height } = Dimensions.get("window");

const Video = ({
  userId,
  username,
  photo,
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
        id: item._id,
      });
    } else {
      navigation.navigate("VlogScreen", {
        id: item?._id,
      });
    }
  };

  console.log("@@", item);

  const handleThreeDots = (e) => {
    onOpen(e);
    setId(item._id);
  };

  return (
    <Pressable
      style={[
        styles.videoContainer,
        index % 2 === 0 ? { marginRight: 8 } : { marginLeft: 8 },
      ]}
      onPress={handlePress}
    >
      <View style={styles.thumbnailContainer}>
        <VideoComponent item={item} />
        <Image
          source={{ uri: BASE_URL_FILE_SERVER + item.thumbnail_url }}
          style={[styles.video, { height: videoHeight }]}
        />
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.titleContent}>
          <Text style={[styles.text, styles.title]} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
        {isFollowingScreen ? (
          <FollowingBottomContent item={item} />
        ) : (
          <GridVideosBottomContent
            username={username}
            onOpen={onOpen}
            setId={setId}
            id={item._id}
          />
        )}
      </View>
    </Pressable>
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
  const translations = translationStore((state) => state.translations);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setData([]);
      setRefreshingId((prev) => prev + 1);
      setRefreshing(false);
    }, 2000);
  }, []);

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
      <Image source={NoFollowingImg} style={styles.image} />
      <Text style={styles.popular}>{translations.popularUsers}</Text>
      {data.map((info, index) => (
        <>
          <SectionContent
            key={index}
            index={index}
            info={info}
            onOpen={onOpen}
            setId={setId}
            data={data}
          />
          {data.length - 1 === index && <BottomMessage />}
        </>
      ))}
    </ScrollView>
  );
};

const SectionContent = ({ index, info, onOpen, setId, data }) => {
  console.log("@@", info);

  const translations = translationStore((state) => state.translations);
  const navigation = useNavigation<any>();
  const { followCreator } = CustomerService();
  const token = userStore((store) => store.api_token);
  const [isFollow, setIsFollow] = useState(false);

  //for follow
  const { mutate: mutateFollow } = useMutation(followCreator, {
    onSuccess: (data) => {
      console.log("followingFollowCreator-success", data);
    },
    onError: (error) => {
      console.log("followingFollowCreator-error", error);
    },
  });

  const navigateSingleUser = (userId) => {
    navigation.navigate("SingleUser", {
      userID: userId,
    });
  };

  const handleFollow = (userId) => {
    mutateFollow({
      user_id: { user_id: userId },
      token: token,
    });
    setIsFollow(true);
  };
  return (
    // <>
    <View style={styles.usersCategoryContainer}>
      <View style={styles.headerContent}>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigateSingleUser(info.id)}
        >
          <Image
            source={{ uri: BASE_URL_FILE_SERVER + info.photo }}
            style={styles.modelImg}
          />
          <VStack>
            <Text style={styles.modelName}>{info.username}</Text>
            <Text style={styles.workCount}>
              {translations.numberOfWorks}: {info.total_works}
            </Text>
          </VStack>
        </Pressable>
        {isFollow ? null : (
          <Pressable
            style={styles.followBtn}
            onPress={() => handleFollow(info.id)}
          >
            <HStack alignItems="center">
              <Entypo
                name="plus"
                size={12}
                color={GLOBAL_COLORS.primaryTextColor}
              />
              <Text style={styles.followText}>{translations.follow}</Text>
            </HStack>
          </Pressable>
        )}
      </View>
      <MasonryList
        numColumns={2}
        data={info.work}
        renderItem={({ item, index }: any) => (
          <Video
            userId={info.id}
            username={info.username}
            photo={info.photo}
            item={item}
            index={index}
            onOpen={onOpen}
            setId={setId}
          />
        )}
        keyExtractor={(_, index) => "" + index}
        /* BFLYAPP-281 - Adjusted estimatedSize to avoid flickering of container */
        // estimatedItemSize={202}
      />
    </View>
    //    {data.length - 1 !== index ? <DividerContainer /> : null}
    // </>
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
      <MasonryList
        // refreshControl={
        //   <RefreshControl
        //     colors={[GLOBAL_COLORS.secondaryColor]}
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //   />
        // }
        data={data}
        numColumns={2}
        onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
        onMomentumScrollBegin={() => setStartScroll(false)}
        onEndReached={reachEnd}
        refreshing={refreshing}
        onRefresh={onRefresh}
        // estimatedItemSize={200}
        renderItem={({ item, index }: any) => (
          <Video
            userId={item.user.id}
            username={item.user.username}
            photo={item.user.photo}
            item={item}
            index={index}
            onOpen={onOpen}
            setId={setId}
            isFollowingScreen={true}
          />
        )}
        keyExtractor={(_, index) => "" + index}
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
  );
};

const Following = () => {
  const token = userStore((state) => state.api_token);
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
        data: {
          following_only: true,
          page: page,
        },
        token: token,
      }),
    onSuccess: (data) => {
      if (!!data[0]?.work) {
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
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
  thumbnailContainer: {
    position: "relative",
    borderRadius: 4,
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
    marginHorizontal: 5,
    marginVertical: 10,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  modelImg: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  modelName: {
    color: "#fff",
    marginHorizontal: 5,
    fontSize: 16,
  },
  workCount: {
    color: GLOBAL_COLORS.inactiveTextColor,
    marginHorizontal: 5,
  },
  followBtn: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  followText: {
    color: "#fff",
    textAlign: "center",
  },
  videoContainer: {
    marginTop: 15,
    borderRadius: 4,
  },
  video: {
    width: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  bottomContent: {
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
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
