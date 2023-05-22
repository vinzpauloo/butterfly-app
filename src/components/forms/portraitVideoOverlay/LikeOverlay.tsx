import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GLOBAL_COLORS } from "global";

import Foundation from "react-native-vector-icons/Foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import LikeService from "services/api/LikeService";
import { useMutation } from "@tanstack/react-query";
import { userStore } from "../../../zustand/userStore";
import { Spinner } from "native-base";

type Props = {
  customerID: string;
  videoID: string;
  likeCount: number;
  setLikeCount: (number) => void;
  isLiked: boolean;
  setIsLiked: (boolean) => void;
};

const LikeOverlay = (props: Props) => {
  // const [videoIsLiked, setVideoIsLiked] = useState(props.isLiked);
  // const [amountofLikes, setAmountofLikes] = useState(props.likes);
  const token = userStore((state) => state.api_token);

  const { likeWork, unlikeWork } = LikeService();
  const { mutate: mutateLikeVideo, isLoading: isLikeVideoLoading } =
    useMutation(likeWork, {
      onSuccess: (data) => {
        if (data) {
          props.setLikeCount((prev) => prev + 1);
          props.setIsLiked(true);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const { mutate: mutateUnlikeVideo, isLoading: isUnlikeVideoLoading } =
    useMutation(unlikeWork, {
      onSuccess: (data) => {
        if (data) {
          props.setLikeCount((prev) => prev - 1);
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
      <Pressable
        onPress={props.isLiked ? unlikeVideo : likeVideo}
        disabled={isLikeVideoLoading || isUnlikeVideoLoading}
      >
        {isLikeVideoLoading || isUnlikeVideoLoading ? (
          <Spinner
            size="sm"
            style={styles.icon}
            color={GLOBAL_COLORS.primaryTextColor}
          />
        ) : (
          <Foundation
            name="heart"
            color={props.isLiked ? GLOBAL_COLORS.errorColor : "white"}
            size={36}
          />
        )}
      </Pressable>
      <Text style={styles.iconText}>{props.likeCount}</Text>
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
  icon: {
    height: 37,
    width: 7,
    resizeMode: "contain",
  },
});
