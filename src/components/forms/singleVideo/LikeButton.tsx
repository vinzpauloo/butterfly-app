import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useEffect, useState } from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import { useMutation, useQuery } from "@tanstack/react-query";

import { GLOBAL_COLORS } from "global";
import LikeService from "services/api/LikeService";
import { userStore } from "../../../zustand/userStore";

const LikeButton = ({ id, like, setLike }) => {
  const token = userStore((store) => store.api_token);
  const { unlikeWork, likeWork } = LikeService();

  // for like
  const { mutate: mutateLike } = useMutation(likeWork, {
    onSuccess: (data) => {
      if (data.isLike) {
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
          type: "work",
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
    return isTrue ? GLOBAL_COLORS.secondaryColor : "#999";
  };

  return (
    <TouchableWithoutFeedback onPress={handleLike}>
      <View style={styles.buttonItem} pointerEvents="box-none">
        <AntDesign
          name="heart"
          color={changeButtonColor(like.isAlreadyLike)}
          size={15}
          style={styles.icon}
        />
        <Text
          style={[
            styles.text,
            { color: changeButtonColor(like.isAlreadyLike) },
          ]}
        >
          {like.likeCount}
        </Text>
      </View>
    </TouchableWithoutFeedback>
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
  },
  icon: {
    marginHorizontal: 3,
  },
});
