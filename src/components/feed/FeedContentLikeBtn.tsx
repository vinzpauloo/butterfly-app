import { Image, Pressable, StyleSheet, Text } from "react-native";
import React, { memo } from "react";

import { useMutation } from "@tanstack/react-query";

import HeartActive from "assets/images/heartActive.png";
import HeartInactive from "assets/images/heartInactive.png";
import LikeService from "services/api/LikeService";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../zustand/userStore";

const FeedContentLikeBtn = ({ id, like, setLike }) => {
  const token = userStore((store) => store.api_token);
  const { likeWork, unlikeWork } = LikeService();

  // for like
  const { mutate: mutateLike } = useMutation(likeWork, {
    onSuccess: (data) => {
      if (data) {
        setLike((prev) => {
          return { isAlreadyLike: true, likeCount: prev.likeCount + 1 };
        });
      }
    },
    onError: (error) => {
      console.log("postLike", error);
    },
  });

  // for unlike
  const { mutate: mutateUnLike } = useMutation(unlikeWork, {
    onSuccess: (data) => {
      if (data) {
        setLike((prev) => {
          return { isAlreadyLike: false, likeCount: prev.likeCount - 1 };
        });
      }
    },
    onError: (error) => {
      console.log("postUnlike", error);
    },
  });

  const handleLike = () => {
    // check here if not like yet
    if (!like.isAlreadyLike) {
      mutateLike({
        data: {
          foreign_id: id,
          type: "feed",
        },
        token: token,
      });
    } else {
      mutateUnLike({
        data: {
          foreign_id: id,
          type: "feed",
        },
        token: token,
      });
    }
  };

  return (
    <Pressable style={styles.bottomItem} onPress={handleLike}>
      <Image
        source={like.isAlreadyLike ? HeartActive : HeartInactive}
        style={styles.icon}
      />
      <Text style={styles.bottomText}>{like.likeCount}</Text>
    </Pressable>
  );
};

export default memo(FeedContentLikeBtn);

const styles = StyleSheet.create({
  bottomItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bottomText: {
    color: GLOBAL_COLORS.inactiveTextColor,
    marginHorizontal: 3,
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});
