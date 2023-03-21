import { Pressable, StyleSheet, Text } from "react-native";
import React, { memo, useEffect, useState } from "react";

import { useIsFetching, useMutation } from "@tanstack/react-query";
import AntDesign from "react-native-vector-icons/AntDesign";

import LikeService from "services/api/LikeService";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../zustand/userStore";

const FeedContentLikeBtn = ({ id, like, setLike }) => {
  const token = userStore((store) => store.api_token);
  const isFocused = useIsFetching();
  const { likeWork, unlikeWork } = LikeService();
  const [isAlreadyLike, setIsAlreadyLike] = useState(false);
  const [likeCount, setLikeCount] = useState(like.likeCount);

  useEffect(() => {
    setIsAlreadyLike(like.isAlreadyLike);
    setLikeCount(like.likeCount);
  }, []);

  // for like
  const { mutate: mutateLike } = useMutation(likeWork, {
    onSuccess: (data) => {
      if (data.isLike) {
        setIsAlreadyLike(true);
        setLikeCount((prev) => prev + 1);
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
      if (data.unLike) {
        setIsAlreadyLike(false);
        setLikeCount((prev) => prev - 1);
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
    if (!isAlreadyLike) {
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
      <AntDesign
        name="heart"
        color={changeButtonColor(isAlreadyLike)}
        size={15}
      />
      <Text
        style={[styles.bottomText, { color: changeButtonColor(isAlreadyLike) }]}
      >
        {likeCount}
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
});
