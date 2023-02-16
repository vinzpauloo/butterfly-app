import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TEMPORARY_CUSTOMER_ID } from "react-native-dotenv";

import { Favorite } from "hooks/commonActoins/useFavorite";
import { GLOBAL_COLORS } from "global";

const FavoriteButton = ({ isOpen, id }) => {
  const { deleteRemoveFavorite, postSaveFavorite, postFavoriteChecker } =
    Favorite();
  const [isAlreadyFavorite, setIsAlreadyFavorite] = useState(false);

  // favorite checker
  const { isLoading } = useQuery({
    queryKey: ["favoriteChecker", id],
    queryFn: () =>
      postFavoriteChecker({
        foreign_id: id,
        customer_id: TEMPORARY_CUSTOMER_ID, // CHANGE LATER
      }),
    onSuccess: (data) => {
      setIsAlreadyFavorite(data);
    },
    onError: (error) => {
      console.log("postLikeChecker", error);
    },
    enabled: isOpen,
  });

  // for favorite
  const { mutate: mutateFavorite } = useMutation(postSaveFavorite, {
    onSuccess: (data) => {
      if (data.isFavorite) {
        setIsAlreadyFavorite(true);
      }
    },
    onError: (error) => {
      console.log("postFavorite", error);
    },
  });

  // for remove as favorite
  const { mutate: mutateRemoveFavorite } = useMutation(deleteRemoveFavorite, {
    onSuccess: (data) => {
      if (data.isRemove) {
        setIsAlreadyFavorite(false);
      }
    },
    onError: (error) => {
      console.log("postRemoveFavorite", error);
    },
  });

  const handleFavorite = () => {
    // check here if not like yet
    if (!isAlreadyFavorite) {
      mutateFavorite({
        foreign_id: id,
        customer_id: TEMPORARY_CUSTOMER_ID, // CHANGE LATER
      });
    } else {
      mutateRemoveFavorite({
        foreign_id: id,
        customer_id: TEMPORARY_CUSTOMER_ID, // CHANGE LATER
      });
    }
  };

  const changeButtonColor = (isTrue) => {
    return isTrue ? GLOBAL_COLORS.secondaryColor : "#fff";
  };

  return (
    <Pressable style={{ alignItems: "center" }} onPress={handleFavorite}>
      <View
        style={{
          height: 50,
          width: 50,
          borderColor: changeButtonColor(isAlreadyFavorite),
          borderWidth: 2,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AntDesign
          name="star"
          size={20}
          color={changeButtonColor(isAlreadyFavorite)}
        />
      </View>
      <Text
        style={{
          color: changeButtonColor(isAlreadyFavorite),
          marginVertical: 10,
        }}
      >
        收藏
      </Text>
    </Pressable>
  );
};

export default FavoriteButton;

const styles = StyleSheet.create({});
