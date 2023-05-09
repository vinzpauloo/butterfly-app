import { Image, Pressable, StyleSheet, Text } from "react-native";
import React, { memo, useEffect, useState } from "react";

import { useIsFetching, useMutation } from "@tanstack/react-query";
import AntDesign from "react-native-vector-icons/AntDesign";

import HeartActive from "assets/images/heartActive.png";
import HeartInactive from "assets/images/heartInactive.png";
import LikeService from "services/api/LikeService";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../zustand/userStore";

const FeedContentLikeBtn = ({ id, like, setLike }) => {
  const token = userStore((store) => store.api_token);
  const isFocused = useIsFetching();
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

  const changeButtonColor = (isTrue) => {
    return isTrue
      ? GLOBAL_COLORS.secondaryColor
      : GLOBAL_COLORS.inactiveTextColor;
  };

  return (
    <Pressable style={styles.bottomItem} onPress={handleLike}>
      <Image
        source={like.isAlreadyLike ? HeartActive : HeartInactive}
        style={styles.icon}
      />
      <Text
        style={[
          styles.bottomText,
          { color: changeButtonColor(like.isAlreadyLike) },
        ]}
      >
        {like.likeCount}
      </Text>
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
