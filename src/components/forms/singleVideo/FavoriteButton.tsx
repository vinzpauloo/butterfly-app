import { TouchableWithoutFeedback, StyleSheet, Text, View } from "react-native";
import React from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useMutation } from "@tanstack/react-query";

import CustomerService from "services/api/CustomerService";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../../zustand/userStore";
import { translationStore } from "../../../zustand/translationStore";

const FavoriteButton = ({ id, isAlreadyFavorite, setIsAlreadyFavorite }) => {
  const token = userStore((store) => store.api_token);
  const translations = translationStore((state) => state.translations);
  const { favoriteVideo, unfavoriteVideo } = CustomerService();

  // for favorite
  const { mutate: mutateFavorite } = useMutation(favoriteVideo, {
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
  const { mutate: mutateRemoveFavorite } = useMutation(unfavoriteVideo, {
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
        data: {
          foreign_id: id,
        },
        token: token,
      });
    } else {
      mutateRemoveFavorite({
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
          {translations.favorite}
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
