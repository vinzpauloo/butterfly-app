import { TouchableWithoutFeedback, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Favorite } from "hooks/commonActoins/useFavorite";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../../zustand/userStore";

const FavoriteButton = ({ id }) => {
  const customerID = userStore((store) => store._id);
  const { deleteRemoveFavorite, postSaveFavorite, postFavoriteChecker } =
    Favorite();
  const [isAlreadyFavorite, setIsAlreadyFavorite] = useState(false);

  // favorite checker
  const { isLoading } = useQuery({
    queryKey: ["favoriteChecker", id],
    queryFn: () =>
      postFavoriteChecker({
        foreign_id: id,
        customer_id: customerID,
      }),
    onSuccess: (data) => {
      setIsAlreadyFavorite(data);
    },
    onError: (error) => {
      console.log("postLikeChecker", error);
    },
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
      if (data.isRemoved.response) {
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
        customer_id: customerID,
      });
    } else {
      mutateRemoveFavorite({
        foreign_id: id,
        customer_id: customerID,
      });
    }
  };

  const changeButtonColor = (isTrue) => {
    return isTrue ? GLOBAL_COLORS.secondaryColor : "#999";
  };

  return (
    <TouchableWithoutFeedback onPress={handleFavorite}>
      <View style={styles.buttonItem} pointerEvents="box-none">
        <MaterialIcons
          name="star"
          color={changeButtonColor(isAlreadyFavorite)}
          size={18}
          style={styles.icon}
        />
        <Text
          style={[styles.text, { color: changeButtonColor(isAlreadyFavorite) }]}
        >
          收藏
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FavoriteButton;

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
