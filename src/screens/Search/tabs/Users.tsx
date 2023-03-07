import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import { FlashList } from "@shopify/flash-list";

import Container from "components/Container";
import GeneralSearch from "services/api/GeneralSearch";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import VIPTag from "components/VIPTag";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../../zustand/userStore";
import { useQuery } from "@tanstack/react-query";

const { width } = Dimensions.get("window");

const HeaderComponent = ({ data }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Image source={{ uri: data.user.photo }} style={styles.modelImg} />
        <View>
          <Text style={styles.headerTitle}>{data.user.username}</Text>
          <Text style={styles.headerSubTitle}>SubTitle</Text>
          <Text style={styles.headerSubTitle}>Description</Text>
        </View>
      </View>
      <Pressable style={styles.followBtn}>
        <Feather name="plus" color="#fff" />
        <Text style={styles.followText}>关注</Text>
      </Pressable>
    </View>
  );
};

const VideoContainer = ({ data }) => {
  return (
    <View style={styles.videoContainer}>
      <View style={styles.videoContent}>
        <View style={styles.thumbnailContainer}>
          <VIPTag isAbsolute={true} />
          <Image source={{ uri: data.thumbnail_url }} style={styles.video} />
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
    </View>
  );
};

const ModelVideosContainer = ({ data }) => {
  return (
    <View style={{ marginHorizontal: 10 }}>
      <HeaderComponent data={data[0]} />
      <View style={styles.modelVideosContainer}>
        {data.map((item, index) => (
          <VideoContainer key={index} data={item} />
        ))}
      </View>
      <Text style={styles.seeMoreBtn}>See more videos button</Text>
    </View>
  );
};

const Users = ({ searchText }) => {
  const token = userStore((state) => state.api_token);
  const { getSearchPage } = GeneralSearch();
  const [data, setData] = useState([]);
  const { isLoading } = useQuery({
    queryKey: ["search-user", searchText],
    queryFn: () =>
      getSearchPage({ creator_only: true, keyword: searchText }, token),
    onError: (error) => {
      console.log("search-work", error);
    },
    onSuccess: (data) => {
      setData(data.data);
    },
  });

  if (isLoading) {
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
      {data.length === 0 ? (
        <Text style={styles.emptyResult}>No Data</Text>
      ) : (
        <FlashList
          data={data}
          keyExtractor={(_, index) => "" + index}
          renderItem={({ item, index }) => (
            <ModelVideosContainer key={index} data={item} />
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
    height: 50,
    width: 50,
    borderRadius: 25,
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
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: GLOBAL_COLORS.secondaryColor,
  },
  followText: {
    color: "#fff",
    marginHorizontal: 5,
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#aaa",
    marginVertical: 2,
    width: width * 0.3,
  },
  seeMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    color: GLOBAL_COLORS.secondaryColor,
    textAlign: "center",
  },
  emptyResult: {
    textAlign: "center",
    fontSize: 30,
    marginVertical: 15,
    color: GLOBAL_COLORS.secondaryColor,
  },
});
