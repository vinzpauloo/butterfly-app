import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import { useMutation, useQuery } from "@tanstack/react-query";

import { GLOBAL_COLORS } from "global";
import { Like } from "hooks/commonActoins/useLike";
import { userStore } from "../../../zustand/userStore";

const LikeButton = ({ data, id }) => {
  const customerID = userStore((store) => store._id);
  const { deleteLikeWork, postLikeWork, postLikeChecker } = Like();
  const [isAlreadyLike, setIsAlreadyLike] = useState(false);
  const [likeCount, setLikeCount] = useState(data?.like?.total_likes);

  // like checker
  const { isLoading } = useQuery({
    queryKey: ["likeChecker", id],
    queryFn: () =>
      postLikeChecker({
        foreign_id: id,
        customer_id: `${customerID}`, // CHANGE LATER
      }),
    onSuccess: (data) => {
      setIsAlreadyLike(data);
    },
    onError: (error) => {
      console.log("postLikeChecker", error);
    },
  });

  // for like
  const { mutate: mutateLike } = useMutation(postLikeWork, {
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
  const { mutate: mutateUnLike } = useMutation(deleteLikeWork, {
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
        customer_id: `${customerID}`, // CHANGE LATER
        type: "feed",
      });
    } else {
      mutateUnLike({
        foreign_id: id,
        customer_id: `${customerID}`, // CHANGE LATER
      });
    }
  };

  const changeButtonColor = (isTrue) => {
    return isTrue ? GLOBAL_COLORS.secondaryColor : "#999";
  };

  return (
    <Pressable style={styles.buttonItem} onPress={handleLike}>
      <AntDesign
        name="heart"
        color={changeButtonColor(isAlreadyLike)}
        size={15}
        style={styles.icon}
      />
      <Text style={[styles.text, { color: changeButtonColor(isAlreadyLike) }]}>
        {likeCount}
      </Text>
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
  },
  icon: {
    marginHorizontal: 3,
  },
});
