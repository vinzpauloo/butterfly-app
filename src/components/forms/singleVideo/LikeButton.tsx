import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { Spinner } from "native-base";
import { useMutation } from "@tanstack/react-query";

import HeartActive from "assets/images/heartActive.png";
import HeartInactive from "assets/images/heartInactive.png";
import { GLOBAL_COLORS } from "global";
import LikeService from "services/api/LikeService";
import { userStore } from "../../../zustand/userStore";

const LikeButton = ({ id, like, setLike }) => {
  const token = userStore((store) => store.api_token);
  const { unlikeWork, likeWork } = LikeService();

  // for like
  const { mutate: mutateLike, isLoading: isLikeLoading } = useMutation(
    likeWork,
    {
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
    }
  );

  // for unlike
  const { mutate: mutateUnLike, isLoading: isUnlikeLoading } = useMutation(
    unlikeWork,
    {
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
    }
  );

  const handleLike = () => {
    // check here if not like yet
    if (!like.isAlreadyLike) {
      mutateLike({
        data: {
          foreign_id: id,
          type: "work",
        },
        token: token,
      });
    } else {
      mutateUnLike({
        data: {
          foreign_id: id,
          type: "work",
        },
        token: token,
      });
    }
  };

  return (
    <Pressable onPress={handleLike} disabled={isLikeLoading || isUnlikeLoading}>
      <View style={styles.buttonItem} pointerEvents="box-none">
        {isLikeLoading || isUnlikeLoading ? (
          <Spinner
            size="sm"
            style={styles.icon}
            color={GLOBAL_COLORS.secondaryColor}
          />
        ) : (
          <Image
            source={like.isAlreadyLike ? HeartActive : HeartInactive}
            style={styles.icon}
          />
        )}
        <Text style={styles.text}>{like.likeCount}</Text>
      </View>
    </Pressable>
  );
};

export default LikeButton;

const styles = StyleSheet.create({
  buttonItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    color: GLOBAL_COLORS.inactiveTextColor,
  },
  icon: {
    marginHorizontal: 3,
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});
