import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { VStack } from "native-base";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserOverlay from "./UserOverlay";
import LikeOverlay from "./LikeOverlay";
import FavoriteOVerlay from "./FavoriteOVerlay";
import DownloadOverlay from "./DownloadOverlay";
import { userStore } from "../../../zustand/userStore";

type Props = {
  videoID: string;
  userID: number;
  userImage: string;
  likes: number;
  amountOfComments: number;
  openComments: () => void;
  isFollowed: boolean
  isFavorite: boolean
  isLiked: boolean
};

const RightOverlay = (props: Props) => {
  const customerID = userStore((store) => store._id);
  return (
    <VStack space={2} style={styles.verticalBar}>
      <UserOverlay
        customerID={customerID}
        userID={props.userID}
        userImage={props.userImage}
        isFollowed={props.isFollowed}
      />
      <LikeOverlay
        customerID={customerID}
        videoID={props.videoID}
        likes={props.likes}
        isLiked={props.isLiked}
      />
      <View style={styles.verticalBarItem}>
        <Pressable onPress={() => props.openComments()}>
          <MaterialCommunityIcons name="comment" color={"white"} size={40} />
        </Pressable>
        <Text style={styles.iconText}>{props.amountOfComments}</Text>
      </View>
      <FavoriteOVerlay customerID={customerID} videoID={props.videoID} isFavorite={props.isFavorite} />
      <DownloadOverlay />
    </VStack>
  );
};

export default RightOverlay;

const styles = StyleSheet.create({
  verticalBar: {
    position: "absolute",
    right: 8,
    paddingBottom: 16,
    bottom: 0,
  },
  verticalBarItem: {
    width: "100%",
    alignItems: "center",
  },
  iconText: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },
});
