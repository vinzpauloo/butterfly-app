import { Image, Pressable, StyleSheet, Text } from "react-native";
import React, { memo, useEffect, useState } from "react";

import { Spinner } from "native-base";
import { useIsFetching, useMutation } from "@tanstack/react-query";

import HeartActive from "assets/images/heartActive.png";
import HeartInactive from "assets/images/heartInactive.png";
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
  const { mutate: mutateLike, isLoading: isLikeLoading } = useMutation(
    likeWork,
    {
      onSuccess: (data) => {
        if (data) {
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
    }
  );

  // for unlike
  const { mutate: mutateUnLike, isLoading: isUnlikeLoading } = useMutation(
    unlikeWork,
    {
      onSuccess: (data) => {
        if (data) {
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
    }
  );

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
          type: "feed",
        },
        token: token,
      });
    }
  };

  return (
    <Pressable
      style={styles.bottomItem}
      onPress={handleLike}
      disabled={isLikeLoading || isUnlikeLoading}
    >
      {isLikeLoading || isUnlikeLoading ? (
        <Spinner
          size="sm"
          style={styles.icon}
          color={GLOBAL_COLORS.secondaryColor}
        />
      ) : (
        <Image
          source={isAlreadyLike ? HeartActive : HeartInactive}
          style={styles.icon}
        />
      )}
      <Text style={styles.bottomText}>{likeCount}</Text>
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
