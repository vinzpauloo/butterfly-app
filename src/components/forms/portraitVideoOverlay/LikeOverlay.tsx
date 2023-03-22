import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GLOBAL_COLORS } from "global";

import Ionicons from "react-native-vector-icons/Ionicons";
import LikeService from "services/api/LikeService";
import { useMutation } from "@tanstack/react-query";
import { userStore } from "../../../zustand/userStore";

type Props = {
  customerID: string;
  videoID: string;
  likes: number;
  isLiked: boolean;
  setIsLiked: (boolean) => void;
};

const LikeOverlay = (props: Props) => {
  // const [videoIsLiked, setVideoIsLiked] = useState(props.isLiked);
  const [amountofLikes, setAmountofLikes] = useState(props.likes);
  const token = userStore((state) => state.api_token);

  const { likeWork, unlikeWork } = LikeService();
  const { mutate: mutateLikeVideo } = useMutation(likeWork, {
    onSuccess: (data) => {
      if (data?.isLike) {
        setAmountofLikes((prev) => prev + 1);
        props.setIsLiked(true);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: mutateUnlikeVideo } = useMutation(unlikeWork, {
    onSuccess: (data) => {
      if (data?.unLike) {
        setAmountofLikes((prev) => prev - 1);
        props.setIsLiked(false);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function likeVideo() {
    mutateLikeVideo({
      data: { foreign_id: props.videoID, type: "work" },
      token: token,
    });
  }

  function unlikeVideo() {
    mutateUnlikeVideo({
      data: { foreign_id: props.videoID, type: "work" },
      token: token,
    });
  }

  return (
    <View style={styles.verticalBarItem}>
      <Pressable onPress={props.isLiked ? unlikeVideo : likeVideo}>
        <Ionicons
          name="heart"
          color={props.isLiked ? GLOBAL_COLORS.secondaryColor : "white"}
          size={40}
        />
      </Pressable>
      <Text style={styles.iconText}>{amountofLikes}</Text>
    </View>
  );
};

export default LikeOverlay;

const styles = StyleSheet.create({
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
