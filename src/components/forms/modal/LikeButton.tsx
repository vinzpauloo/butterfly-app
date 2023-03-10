import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import Fontisto from "react-native-vector-icons/Fontisto";
import { useMutation, useQuery } from "@tanstack/react-query";

import { GLOBAL_COLORS } from "global";
import LikeService from "services/api/LikeService";
import { userStore } from "../../../zustand/userStore";

const LikeButton = ({ isOpen, id }) => {
  const token = userStore((store) => store.api_token);
  const { unlikeWork, likeWork, likeChecker } = LikeService();
  const [isAlreadyLike, setIsAlreadyLike] = useState(false);

  // like checker
  const { isLoading } = useQuery({
    queryKey: ["likeChecker", id],
    queryFn: () =>
      likeChecker({
        data: {
          foreign_id: id,
          type: "work",
        },
        token: token,
      }),
    onSuccess: (data) => {
      setIsAlreadyLike(data);
    },
    onError: (error) => {
      console.log("postLikeChecker", error);
    },
    enabled: isOpen,
  });

  // for like
  const { mutate: mutateLike } = useMutation(likeWork, {
    onSuccess: (data) => {
      if (data.isLike) {
        setIsAlreadyLike(true);
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
    return isTrue ? GLOBAL_COLORS.secondaryColor : "#fff";
  };

  return (
    <Pressable style={{ alignItems: "center" }} onPress={handleLike}>
      <View
        style={{
          height: 50,
          width: 50,
          borderColor: changeButtonColor(isAlreadyLike),
          borderWidth: 2,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fontisto
          name="check"
          size={20}
          color={changeButtonColor(isAlreadyLike)}
        />
      </View>
      <Text
        style={{
          color: changeButtonColor(isAlreadyLike),
          marginVertical: 10,
        }}
      >
        关注
      </Text>
    </Pressable>
  );
};

export default LikeButton;

const styles = StyleSheet.create({});
