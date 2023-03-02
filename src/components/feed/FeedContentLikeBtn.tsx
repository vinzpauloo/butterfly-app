import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { TEMPORARY_CUSTOMER_ID } from "react-native-dotenv";

import { GLOBAL_COLORS } from "global";
import LikeService from "services/api/LikeService";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/native";

const FeedContentLikeBtn = ({ totalLikes, id }) => {
  const isFocus = useIsFocused();
  const { likeWork, unlikeWork, likeChecker, likesCount } = LikeService();
  const [isAlreadyLike, setIsAlreadyLike] = useState(false);
  const [likeCount, setLikeCount] = useState(totalLikes);

  // like checker
  const { isLoading } = useQuery({
    queryKey: ["likeChecker", id],
    queryFn: () =>
      likeChecker({
        foreign_id: id,
        customer_id: TEMPORARY_CUSTOMER_ID, // CHANGE LATER
      }),
    onSuccess: (data) => {
      setIsAlreadyLike(data);
    },
    onError: (error) => {
      console.log("postLikeChecker", error);
    },
  });

  //   //like count
  //   const { isLoading: likeCountIsLoading } = useQuery({
  //     queryKey: ["likeCount", id],
  //     queryFn: () => likesCount({ foreign_id: id }),
  //     onSuccess: (data) => {
  //       console.log("count", data);

  //       setLikeCount(data);
  //     },
  //     onError: (error) => {
  //       console.log("postLikeCount", error);
  //     },
  //   });

  // for like
  const { mutate: mutateLike } = useMutation(likeWork, {
    onSuccess: (data) => {
      if (data.isLike) {
        setIsAlreadyLike(true);
        setLikeCount((prev) => prev + 1);
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
        site_id: 1,
        foreign_id: id,
        customer_id: TEMPORARY_CUSTOMER_ID, // CHANGE LATER
        type: "feed",
      });
    } else {
      mutateUnLike({
        foreign_id: id,
        customer_id: TEMPORARY_CUSTOMER_ID, // CHANGE LATER
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
      <MaterialCommunityIcons
        name="heart-outline"
        color={changeButtonColor(isAlreadyLike)}
        size={20}
      />
      <Text
        style={[styles.bottomText, { color: changeButtonColor(isAlreadyLike) }]}
      >
        {likeCount}
      </Text>
    </Pressable>
  );
};

export default FeedContentLikeBtn;

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
