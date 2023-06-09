import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { HStack, Spinner } from "native-base";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

import CarouselSkeleton from "components/skeletons/CarouselSkeleton";
import CustomerService from "services/api/CustomerService";
import SingleVideoTab from "screens/SingleVideo/tabs/SingleVideoTabs";
import VideoPlayer from "components/VideoPlayer";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import WorkService from "services/api/WorkService";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../zustand/translationStore";
import { userStore } from "../../zustand/userStore";

const HeaderTitle = ({ data }) => {
  const token = userStore((store) => store.api_token);
  const translations = translationStore((state) => state.translations);
  const { followCreator } = CustomerService();
  const navigation = useNavigation<any>();
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    setIsFollowed(data.is_followed);
  }, [data]);

  const { mutate: mutateFollow, isLoading: isFollowLoading } = useMutation(
    followCreator,
    {
      onSuccess: (data) => {
        if (data.isFollowed) {
          setIsFollowed(true);
        }
      },
      onError: (error) => {
        console.log("followCreator", error);
      },
    }
  );

  const handleFollow = () => {
    mutateFollow({
      user_id: { user_id: data?.user.id },
      token: token,
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
        <Pressable
          onPress={() =>
            navigation.navigate("SingleUser", { userID: data?.user.id })
          }
        >
          <Image
            source={{ uri: BASE_URL_FILE_SERVER + data?.user?.photo }}
            style={styles.image}
          />
        </Pressable>
        <View>
          <Text style={styles.title}>{data?.user?.username}</Text>
          <Text style={styles.followers}>
            {data?.followers} {translations.fan}
          </Text>
        </View>
      </View>
      {isFollowed ? null : (
        <Pressable
          style={styles.followBtn}
          onPress={handleFollow}
          disabled={isFollowLoading}
        >
          <HStack alignItems="center" justifyContent="space-between" space={2}>
            <Text style={styles.followText}>+{translations.follow}</Text>
            {isFollowLoading ? (
              <Spinner
                size="sm"
                style={styles.spinner}
                color={GLOBAL_COLORS.primaryTextColor}
              />
            ) : null}
          </HStack>
        </Pressable>
      )}
    </View>
  );
};

const SingleVideoScreen = () => {
  const navigation = useNavigation<any>();
  const [token, isVip] = userStore((state) => [state.api_token, state.is_Vip]);
  const translations = translationStore((state) => state.translations);
  const { getWorkById } = WorkService();
  const route = useRoute<any>();
  const isFocus = useIsFocused();
  const [like, setLike] = useState({ isAlreadyLike: false, likeCount: 0 });
  const [isAlreadyFavorite, setIsAlreadyFavorite] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["workSingleVideoScreen", route.params.id],
    queryFn: () => getWorkById({ workId: route.params.id, token: token }),
    onError: (error) => {
      //error handler
      console.log("workSingleVideo", error);
    },
    onSuccess: (data) => {
      setLike({
        isAlreadyLike: data.is_liked,
        likeCount: data?.like?.total_likes || 0,
      });
      setIsAlreadyFavorite(data.is_favorite);
    },
  });

  const navigateVIPScreen = () => {
    navigation.navigate("VIPScreen", { postTitle: "会员中心" });
  };

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
      <HeaderTitle data={data} />
      <View style={styles.videoContent}>
        {!isVip && (
          <Pressable
            style={styles.watermarkContainer}
            onPress={navigateVIPScreen}
          >
            <Text style={styles.watermarkText}>{translations.buyTheVideo}</Text>
          </Pressable>
        )}
        <VideoPlayer url={data?.video_url} isFocus={isFocus} />
      </View>
      <SingleVideoTab
        data={data}
        like={like}
        setLike={setLike}
        isAlreadyFavorite={isAlreadyFavorite}
        setIsAlreadyFavorite={setIsAlreadyFavorite}
      />
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
    backgroundColor: GLOBAL_COLORS.videoContentBG,
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
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  followText: {
    color: "#fff",
    fontSize: 14,
  },
  spinner: {
    marginHorizontal: 3,
    height: 10,
    width: 10,
    resizeMode: "contain",
  },
});
