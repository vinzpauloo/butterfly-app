import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import { useMutation, useQuery } from "@tanstack/react-query";

import CustomerService from "services/api/CustomerService";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../../zustand/translationStore";
import { userStore } from "../../../zustand/userStore";

const FavoriteButton = ({ isOpen, id }) => {
  const token = userStore((store) => store.api_token);
  const translations = translationStore((state) => state.translations);

  const { unfavoriteVideo, favoriteVideo, favoriteChecker } = CustomerService();
  const [isAlreadyFavorite, setIsAlreadyFavorite] = useState(false);

  // favorite checker
  const { isLoading } = useQuery({
    queryKey: ["favoriteChecker", id],
    queryFn: () =>
      favoriteChecker({
        data: {
          foreign_id: id,
        },
        token: token,
      }),
    onSuccess: (data) => {
      setIsAlreadyFavorite(data);
    },
    onError: (error) => {
      console.log("favoriteChecker", error);
    },
    enabled: isOpen,
  });

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
        {translations.favorite}
      </Text>
    </Pressable>
  );
};

export default FavoriteButton;

const styles = StyleSheet.create({});
