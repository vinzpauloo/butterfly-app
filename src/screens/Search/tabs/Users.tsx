import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import GeneralSearch from "services/api/GeneralSearch";
import Loading from "components/Loading";
import NoCacheMessage from "features/sectionList/components/NoCacheMessage";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import VIPTag from "components/VIPTag";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../../zustand/userStore";
import { translationStore } from "../../../zustand/translationStore";

const { width } = Dimensions.get("window");

const HeaderComponent = ({ data }) => {
  const translations = translationStore((state) => state.translations);
  const [isFollowed, setIsFollowed] = useState(false);
  const token = userStore((state) => state.api_token);
  const navigation = useNavigation<any>();
  const { followCreator } = CustomerService();
  const { mutate } = useMutation(followCreator, {
    onError: (error) => {
      console.log("user-tab-search", error);
    },
  });

  const navigateToSingleUser = () => {
    navigation.navigate("SingleUser", { userID: data?.id });
  };

  const followBtn = () => {
    setIsFollowed(true);
    mutate({
      user_id: { user_id: data?.id },
      token: token,
    });
  };

  useEffect(() => {
    setIsFollowed(data.is_followed);
  }, []);

  return (
    <View style={styles.headerContainer}>
      <Pressable style={styles.headerLeft} onPress={navigateToSingleUser}>
        <Image
          source={{ uri: BASE_URL_FILE_SERVER + data.photo }}
          style={styles.modelImg}
        />
        <View style={styles.headerTextContent}>
          <Text style={styles.headerTitle}>{data.username}</Text>
          <Text style={styles.headerSubTitle}>
            {translations.followers}: {data.total_followers}{" "}
            {translations.videos}: {data.total_work}
          </Text>
        </View>
      </Pressable>
      {isFollowed ? null : (
        <Pressable style={styles.followBtn} onPress={followBtn}>
          <Feather name="plus" color={GLOBAL_COLORS.primaryTextColor} />
          <Text style={styles.followText}>{translations.follow}</Text>
        </Pressable>
      )}
    </View>
  );
};

const VideoContainer = ({ data, user }) => {
  const navigation = useNavigation<any>();

  const navigateToSingleVideo = () => {
    navigation.navigate("SingleVideo", {
      image: user?.photo,
      username: user?.username,
      followers: "123456789",
      id: data?._id,
      userId: data?.user_id,
    });
  };

  return (
    <Pressable style={styles.videoContainer} onPress={navigateToSingleVideo}>
      <View style={styles.videoContent}>
        <View style={styles.thumbnailContainer}>
          <VIPTag item={data} isAbsolute={true} />
          <Image
            source={{ uri: BASE_URL_FILE_SERVER + data.thumbnail_url }}
            style={styles.video}
          />
        </View>
        <View style={styles.watchCount}>
          <Octicons name="video" size={15} color="#fff" />
          <Text style={styles.watchCountText}>{data.statistic.watched}w</Text>
        </View>
        <Text style={styles.watchDurationText}>{data.duration}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {data.title}
      </Text>
    </Pressable>
  );
};

const ModelVideosContainer = ({ data }) => {
  const translations = translationStore((state) => state.translations);
  const navigation = useNavigation<any>();

  const navigateToSingleUser = () => {
    navigation.navigate("SingleUser", { userID: data.id });
  };
  return (
    <View style={{ marginHorizontal: 10 }}>
      <HeaderComponent data={data} />
      <View style={styles.modelVideosContainer}>
        {data.work.map((item, index) => (
          <VideoContainer key={index} data={item} user={data} />
        ))}
      </View>
      <View style={styles.btnContainer}>
        <Pressable onPress={navigateToSingleUser}>
          <Text style={styles.seeMoreBtn}>{translations.seeMoreVideos}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Users = ({
  searchText,
  fetchChecker,
  setFetchChecker,
  page,
  setPage,
}) => {
  const token = userStore((state) => state.api_token);
  const translation = translationStore((state) => state.translations);
  const { getSearchPage } = GeneralSearch();
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [startScroll, setStartScroll] = useState(true);
  const isFocused = useIsFocused();
  const [prevSearch, setPrevSearch] = useState("");

  const { isLoading } = useQuery({
    queryKey: ["search-user", searchText, page],
    queryFn: () =>
      getSearchPage({
        data: { creator_only: true, keyword: searchText, page: page },
        token: token,
      }),
    onError: (error) => {
      console.log("search-work", error);
    },
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setFetchChecker((prev) => {
        return { ...prev, users: false };
      });
      if (prevSearch !== searchText) {
        setPrevSearch(searchText);
        setData(data.data);
      } else {
        setData((prev) => [...prev].concat(data.data));
      }
    },
    enabled: fetchChecker.users && isFocused,
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
      return { ...prev, users: true };
    });
  }, [page, searchText]);

  if (
    (isLoading && page === 1 && prevSearch !== searchText) ||
    (data.length === 0 && fetchChecker.users)
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
        <FlashList
          data={data}
          onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
          onMomentumScrollBegin={() => setStartScroll(false)}
          onEndReached={reachEnd}
          keyExtractor={(_, index) => "" + index}
          renderItem={({ item, index }) => (
            <ModelVideosContainer key={index} data={item} />
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

export default Users;

const styles = StyleSheet.create({
  thumbnailContainer: {
    position: "relative",
  },

  //Header component
  headerContainer: {
    flexDirection: "row",
    marginVertical: 10,

    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
  },
  modelImg: {
    marginRight: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  headerTextContent: {
    justifyContent: "space-evenly",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
  },
  headerSubTitle: {
    color: "#aaa",
    fontSize: 12,
  },
  followBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: GLOBAL_COLORS.secondaryColor,
  },
  followText: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  //Video Container
  videoContainer: {
    // marginHorizontal: 5,
  },
  videoContent: {
    position: "relative",
  },
  watchCount: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 5,
    left: 5,
    zIndex: 5,
  },
  watchDurationText: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 7,
    right: 5,
    zIndex: 5,
    color: "#fff",
    fontSize: 10,
  },
  watchCountText: {
    color: "#fff",
    fontSize: 10,
    marginHorizontal: 5,
  },
  video: {
    borderRadius: 5,
    width: width * 0.3,
    height: 80,
    resizeMode: "cover",
  },
  //Model Videos Container
  modelVideosContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title: {
    color: "#aaa",
    marginVertical: 2,
    width: width * 0.3,
  },
  btnContainer: { alignItems: "center", justifyContent: "center" },
  seeMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    color: GLOBAL_COLORS.secondaryColor,
    textAlign: "center",
    borderWidth: 1,
    borderColor: GLOBAL_COLORS.secondaryColor,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  emptyResult: {
    textAlign: "center",
    fontSize: 30,
    marginVertical: 15,
    color: GLOBAL_COLORS.secondaryColor,
  },
});
