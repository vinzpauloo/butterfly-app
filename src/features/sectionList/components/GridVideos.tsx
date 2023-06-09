import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";

import Entypo from "react-native-vector-icons/Entypo";
import Foundation from "react-native-vector-icons/Foundation";
import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "@react-navigation/native";
import { useDisclose } from "native-base";

import Modal from "components/BottomModal";
import VideoComponent from "components/VideoComponent";
import VIPTag from "components/VIPTag";
import { GLOBAL_COLORS, GLOBAL_SCREEN_SIZE } from "global";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

export const FollowingBottomContent = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.textContent}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: BASE_URL_FILE_SERVER + item.user.photo }}
          style={styles.modelImg}
        />
        <Text
          numberOfLines={1}
          style={[
            styles.modelText,
            { width: width < GLOBAL_SCREEN_SIZE.mobile ? 60 : null },
          ]}
        >
          {item.user.username}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Foundation
          name="heart"
          size={18}
          color={GLOBAL_COLORS.secondaryColor}
        />
        <Text style={styles.modelLikeCount}>
          {!!item?.like?.total_likes ? item?.like?.total_likes : 0}w
        </Text>
      </View>
    </View>
  );
};

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

const AdsContainer = ({ item, isFollowingScreen, onOpen, setId }: any) => {
  const { width } = useWindowDimensions();
  const handlePress = () => {};

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.videoContainer}
      onPress={handlePress}
    >
      <View style={styles.thumbnailContainer}>
        <VIPTag item={item} isAbsolute={true} />
        <Image
          source={{ uri: BASE_URL_FILE_SERVER + item.photo_url }}
          style={[styles.video, { height: width * 0.3 }]}
        />
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.titleContent}>
          <Text style={[styles.text, styles.title]} numberOfLines={2}>
            {item?.title}
          </Text>
        </View>
        {/* {isFollowingScreen ? (
          <FollowingBottomContent item={item} />
        ) : (
          <GridVideosBottomContent
            username={item?.username}
            onOpen={onOpen}
            setId={setId}
            id={item._id}
          />
        )} */}
      </View>
    </TouchableOpacity>
  );
};

export const Video = ({ item, isFollowingScreen, onOpen, setId }: any) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const videoHeight =
    item.orientation === "Landscape" ? width * 0.3 : width * 0.5;
  const handlePress = () => {
    if (item.orientation === "Landscape") {
      navigation.navigate("SingleVideo", {
        id: item?._id,
      });
    } else {
      navigation.navigate("VlogScreen", {
        id: item?._id,
      });
    }
  };

  // if (item?.username === "Ads") {
  if (item?.photo_url) {
    return (
      <AdsContainer
        item={item}
        isFollowingScreen={isFollowingScreen}
        onOpen={onOpen}
      />
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.videoContainer}
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
            {item?.title}
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
      </View>
    </TouchableOpacity>
  );
};

const GridVideos = ({ data, isFollowingScreen = false }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [id, setId] = useState<number | null>(null);

  return (
    <View style={styles.gridVideoContainer}>
      <MasonryList
        // estimatedItemSize={166}
        numColumns={2}
        data={data}
        renderItem={({ item }: any) => (
          <Video
            item={item}
            isFollowingScreen={isFollowingScreen}
            onOpen={onOpen}
            setId={setId}
          />
        )}
        keyExtractor={(_, index) => "" + index}
      />

      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} id={id} />
    </View>
  );
};

export default GridVideos;

const styles = StyleSheet.create({
  gridVideoContainer: {
    flex: 1,
    minHeight: 100,
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
});
