import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useMutation } from "@tanstack/react-query";

import AntDesign from "react-native-vector-icons/AntDesign";
import CustomerService from "services/api/CustomerService";
import { userStore } from "../../../zustand/userStore";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../../zustand/translationStore";
import { Spinner } from "native-base";

type Props = {
  videoID: string;
  customerID: string;
  isFavorite: boolean;
  setIsFavorite: (boolean) => void;
};

const FavoriteOVerlay = (props: Props) => {
  // const [videoIsFaved, setVideoIsFaved] = useState(props.isFavorite);
  const translations = translationStore((state) => state.translations);
  const token = userStore((state) => state.api_token);

  const { favoriteVideo, unfavoriteVideo } = CustomerService();
  const { mutate: mutateAddToFavorite, isLoading: isAddToFavoriteLoading } =
    useMutation(favoriteVideo, {
      onSuccess: (data) => {
        if (data?.isFavorite) props.setIsFavorite(true);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const {
    mutate: mutateRemoveFromFavorite,
    isLoading: isRemoveToFavoriteLoading,
  } = useMutation(unfavoriteVideo, {
    onSuccess: (data) => {
      if (data?.isRemoved?.response) props.setIsFavorite(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function addVideoToFavorite() {
    mutateAddToFavorite({
      data: { foreign_id: props.videoID },
      token: token,
    });
  }

  function removeVideoFromFavorite() {
    mutateRemoveFromFavorite({
      data: { foreign_id: props.videoID },
      token: token,
    });
  }

  return (
    <View style={styles.verticalBarItem}>
      <Pressable
        onPress={
          props.isFavorite ? removeVideoFromFavorite : addVideoToFavorite
        }
        disabled={isAddToFavoriteLoading || isRemoveToFavoriteLoading}
      >
        {isAddToFavoriteLoading || isRemoveToFavoriteLoading ? (
          <Spinner
            size="sm"
            style={styles.icon}
            color={GLOBAL_COLORS.primaryTextColor}
          />
        ) : (
          <AntDesign
            name="star"
            color={props.isFavorite ? GLOBAL_COLORS.secondaryColor : "white"}
            size={28}
          />
        )}
      </Pressable>
      <Text style={styles.iconText}>{translations.favorite}</Text>
    </View>
  );
};

export default FavoriteOVerlay;

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
    height: 29,
    width: 29,
    resizeMode: "contain",
  },
});
