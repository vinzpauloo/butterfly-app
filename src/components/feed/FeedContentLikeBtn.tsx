import { Pressable, StyleSheet, Text } from "react-native";
import React, { memo, useEffect, useState } from "react";

import { useIsFetching, useMutation } from "@tanstack/react-query";
import { TEMPORARY_CUSTOMER_ID } from "react-native-dotenv";

import { GLOBAL_COLORS } from "global";
import LikeService from "services/api/LikeService";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

const FeedContentLikeBtn = ({ totalLikes, id, customerLikes }) => {
  const isFocused = useIsFetching();
  const { likeWork, unlikeWork } = LikeService();
  const [isAlreadyLike, setIsAlreadyLike] = useState(false);
  const [likeCount, setLikeCount] = useState(totalLikes);

  useEffect(() => {
    setIsAlreadyLike(customerLikes.includes(TEMPORARY_CUSTOMER_ID));
  }, [isFocused]);

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
