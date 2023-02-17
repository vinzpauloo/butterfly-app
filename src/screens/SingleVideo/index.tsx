import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import SingleVideoTab from "screens/SingleVideo/tabs/SingleVideoTabs";
import VideoPlayer from "components/VideoPlayer";
import { GLOBAL_COLORS } from "global";
import { Follow } from "hooks/commonActoins/useFollow";
import { SubNav } from "hooks/useSubNav";
import { TEMPORARY_CUSTOMER_ID } from "react-native-dotenv";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import CarouselSkeleton from "components/skeletons/CarouselSkeleton";

const HeaderTitle = () => {
  const { postFollowCreator, postFollowChecker } = Follow();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const [isFollowed, setIsFollowed] = useState(false);

  const { isLoading } = useQuery({
    queryKey: ["follow", route.params.userId],
    queryFn: () =>
      postFollowChecker({
        customer_id: TEMPORARY_CUSTOMER_ID, // CHANGE LATER
        user_id: route.params.userId,
      }),
    onSuccess: (data) => {
      if (data) {
        setIsFollowed(data);
      }
    },
    onError: (error) => {
      console.log("postFollowChecker", error);
    },
  });

  const { mutate } = useMutation(postFollowCreator, {
    onSuccess: (data) => {
      if (data.isFollowed) {
        setIsFollowed(true);
      }
    },
    onError: (error) => {
      console.log("postFollowCreator", error);
    },
  });

  const handleFollow = () => {
    mutate({
      user_id: route.params.userId,
      customer_id: TEMPORARY_CUSTOMER_ID,
    });
  };
  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="chevron-back-sharp"
          color="#fff"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Image source={{ uri: route.params?.image }} style={styles.image} />
        <View>
          <Text style={styles.title}>{route.params?.username}</Text>
          <Text style={styles.followers}>{route.params?.followers}粉丝</Text>
        </View>
      </View>
      {isFollowed ? null : (
        <Pressable style={styles.followBtn} onPress={handleFollow}>
          <Text style={styles.followText}>+关注</Text>
        </Pressable>
      )}
    </View>
  );
};

const SingleVideoScreen = () => {
  const { getWork } = SubNav();
  const route = useRoute<any>();

  const { data, isLoading } = useQuery({
    queryKey: ["workSingleVideoScreen", route.params.id],
    queryFn: () => getWork(route.params.id),
    onError: (error) => {
      //error handler
      console.log("workSingleVideo", error);
    },
  });

  if (isLoading) {
    return (
      <>
        <CarouselSkeleton />
        <VideoListSkeleton />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderTitle />
      <View style={styles.videoContent}>
        <Pressable style={styles.watermarkContainer}>
          <Text style={styles.watermarkText}>购买视频观看完整版</Text>
        </Pressable>
        <VideoPlayer url={data?.video_url} />
      </View>
      <SingleVideoTab data={data} />
    </View>
  );
};

export default SingleVideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
  videoContent: {
    position: "relative",
    height: 200,

    // Make the video on top of the sticky tab bar
    zIndex: 2,
    backgroundColor: "black",
  },
  watermarkContainer: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    position: "absolute",
    zIndex: 10,
    top: 10,
    right: 30,
  },
  watermarkText: {
    color: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 16,
    zIndex: 2,
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    color: "#fff",
  },
  followers: {
    color: "#999",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 250,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 6,
  },
  input: {
    width: 180,
  },
  followBtn: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "crimson",
  },
  followText: {
    color: "#fff",
    fontSize: 14,
  },
});
