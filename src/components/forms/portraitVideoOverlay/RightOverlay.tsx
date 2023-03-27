import React from "react";
import { StyleSheet } from "react-native";
import { VStack } from "native-base";

import CommentOverlay from "./CommentOverlay";
import DownloadOverlay from "./DownloadOverlay";
import FavoriteOVerlay from "./FavoriteOVerlay";
import LikeOverlay from "./LikeOverlay";
import UserOverlay from "./UserOverlay";
import { userStore } from "../../../zustand/userStore";

type Props = {
  videoID: string;
  userID: number;
  userImage: string;
  likeCount: number;
  setLikeCount: (number) => void;
  amountOfComments: number;
  openComments: () => void;
  isFollowed: boolean;
  setIsFollowed: (boolean) => void;
  isFavorite: boolean;
  setIsFavorite: (boolean) => void;
  isLiked: boolean;
  setIsLiked: (boolean) => void;
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
        setIsFollowed={props.setIsFollowed}
      />
      <LikeOverlay
        customerID={customerID}
        videoID={props.videoID}
        likeCount={props.likeCount}
        setLikeCount={props.setLikeCount}
        isLiked={props.isLiked}
        setIsLiked={props.setIsLiked}
      />
      <CommentOverlay
        amountOfComments={props.amountOfComments}
        openComments={props.openComments}
      />
      <FavoriteOVerlay
        customerID={customerID}
        videoID={props.videoID}
        isFavorite={props.isFavorite}
        setIsFavorite={props.setIsFavorite}
      />
      <DownloadOverlay videoID={props.videoID} />
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
});
