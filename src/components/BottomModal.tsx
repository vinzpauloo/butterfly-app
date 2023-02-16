import React, { useState } from "react";
import { Actionsheet, Box, Center } from "native-base";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useMutation, useQuery } from "@tanstack/react-query";

import { GLOBAL_COLORS } from "global";
import { Like } from "hooks/commonActoins/useLike";
import { Favorite } from "hooks/commonActoins/useFavorite";
import { TEMPORARY_CUSTOMER_ID } from "react-native-dotenv";

const { width } = Dimensions.get("window");

const Modal = ({ onOpen, isOpen, onClose, id }) => {
  const { deleteLikeWork, postLikeWork, postLikeChecker } = Like();
  const { deleteRemoveFavorite, postSaveFavorite, postFavoriteChecker } =
    Favorite();
  const [isAlreadyLike, setIsAlreadyLike] = useState(false);
  const [isAlreadyFavorite, setIsAlreadyFavorite] = useState(false);

  // like checker
  const { isLoading: isLoadingLike } = useQuery({
    queryKey: [`likeChecker${isAlreadyLike}`],
    queryFn: () =>
      postLikeChecker({
        foreign_id: id,
        customer_id: TEMPORARY_CUSTOMER_ID, // CHANGE LATER
      }),
    onSuccess: (data) => {
      setIsAlreadyLike(data);
    },
    onError: (error) => {
      console.log("postLikeChecker", error);
    },
    enabled: isOpen,
  });

  // favorite checker
  const { isLoading: isLoadingFavorite } = useQuery({
    queryKey: [`likeChecker${isAlreadyFavorite}`],
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

  // for like
  const { mutate: mutateLike } = useMutation(postLikeWork, {
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
  const { mutate: mutateUnLike } = useMutation(deleteLikeWork, {
    onSuccess: (data) => {
      if (data.unLike) {
        setIsAlreadyLike(false);
      }
    },
    onError: (error) => {
      console.log("postUnlike", error);
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
      if (data.isRemove) {
        setIsAlreadyFavorite(false);
      }
    },
    onError: (error) => {
      console.log("postRemoveFavorite", error);
    },
  });

  const handleLike = () => {
    // check here if not like yet
    if (!isAlreadyLike) {
      mutateLike({
        site_id: 1,
        foreign_id: id,
        customer_id: TEMPORARY_CUSTOMER_ID, // CHANGE LATER
        type: "work",
      });
    } else {
      mutateUnLike({
        foreign_id: id,
        customer_id: TEMPORARY_CUSTOMER_ID, // CHANGE LATER
      });
    }
  };

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
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content
          borderTopRadius="0"
          backgroundColor={GLOBAL_COLORS.primaryColor}
        >
          <Box w="100%" h={150} px={4} alignItems="center">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: 15,
                width: width,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    height: 50,
                    width: 50,
                    borderColor: "#fff",
                    borderWidth: 2,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Fontisto name="share-a" size={20} color={"#fff"} />
                </View>
                <Text
                  style={{
                    color: "#fff",
                    marginVertical: 10,
                  }}
                >
                  分享
                </Text>
              </View>
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
              <Pressable
                style={{ alignItems: "center" }}
                onPress={handleFavorite}
              >
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
            </View>
            <Pressable onPress={onClose}>
              <Text style={{ color: "#fff", marginVertical: 15 }}>取消</Text>
            </Pressable>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};

export default Modal;

const styles = StyleSheet.create({});
