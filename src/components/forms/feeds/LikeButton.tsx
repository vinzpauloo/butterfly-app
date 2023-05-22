import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import { Spinner } from "native-base";
import { useMutation, useQuery } from "@tanstack/react-query";

import { GLOBAL_COLORS } from "global";
import LikeService from "services/api/LikeService";
import { userStore } from "../../../zustand/userStore";

const LikeButton = ({ data, id }) => {
  const token = userStore((store) => store.api_token);
  const { unlikeWork, likeWork, likeChecker } = LikeService();
  const [isAlreadyLike, setIsAlreadyLike] = useState(false);
  const [likeCount, setLikeCount] = useState(data?.like?.total_likes || 0);

  // like checker
  const { isLoading } = useQuery({
    queryKey: ["likeChecker", id],
    queryFn: () =>
      likeChecker({
        data: {
          foreign_id: id,
          type: "feed",
        },
        token: token,
      }),
    onSuccess: (data) => {
      setIsAlreadyLike(data);
    },
    onError: (error) => {
      console.log("likeChecker", error);
    },
  });

  // for like
  const { mutate: mutateLike, isLoading: isLikeLoading } = useMutation(
    likeWork,
    {
      onSuccess: (data) => {
        if (data) {
          setIsAlreadyLike(true);
          setLikeCount((prev) => prev + 1);
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

  const changeButtonColor = (isTrue) => {
    return isTrue ? GLOBAL_COLORS.secondaryColor : "#999";
  };

  return (
    <Pressable
      style={styles.buttonItem}
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
        <AntDesign
          name="heart"
          color={changeButtonColor(isAlreadyLike)}
          size={15}
          style={styles.icon}
        />
      )}
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
