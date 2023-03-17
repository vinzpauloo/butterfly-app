import React from "react";
import { StyleSheet } from "react-native";
import { VStack } from "native-base";

import UserOverlay from "./UserOverlay";
import LikeOverlay from "./LikeOverlay";
import FavoriteOVerlay from "./FavoriteOVerlay";
import DownloadOverlay from "./DownloadOverlay";
import CommentOverlay from "./CommentOverlay";
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
      <CommentOverlay
        amountOfComments={props.amountOfComments}
        openComments={props.openComments}
      />
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
  }
});
