import React, { useState } from "react";
import { Actionsheet, Box, Center } from "native-base";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useMutation, useQuery } from "@tanstack/react-query";

import { GLOBAL_COLORS } from "global";
import { BottomModal } from "hooks/useBottomModal";

const { width } = Dimensions.get("window");

const Modal = ({ onOpen, isOpen, onClose }) => {
  const { deleteLikeWork, postLikeWork, postLikeChecker } = BottomModal();
  const [isAlreadyLike, setIsAlreadyLike] = useState(false);

  const { isLoading } = useQuery({
    queryKey: [`likeChecker${isAlreadyLike}`],
    queryFn: () =>
      postLikeChecker({
        foreign_id: "9878ca0f-28ff-45ac-a883-e9af41ce93e1",
        customer_id: "9876c1a0-134f-4666-8713-039d53195efc",
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
      if (data.message === "customer like content") {
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
      if (data.message === "customer unlike content") {
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
        site_id: 1,
        foreign_id: "9878ca0f-28ff-45ac-a883-e9af41ce93e1", // will change tommorow
        customer_id: "9876c1a0-134f-4666-8713-039d53195efc", // will change tommorow
      });
    } else {
      mutateUnLike({
        foreign_id: "9878ca0f-28ff-45ac-a883-e9af41ce93e1", // will change tommorow
        customer_id: "9876c1a0-134f-4666-8713-039d53195efc", // will change tommorow
      });
    }
  };

  const changeButtonColor = (isAlreadyLike) => {
    return isAlreadyLike ? GLOBAL_COLORS.secondaryColor : "#fff";
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
                  <Fontisto name="share-a" size={20} color="#fff" />
                </View>
                <Text style={{ color: "#fff", marginVertical: 10 }}>分享</Text>
              </View>
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
                  <Fontisto name="check" size={20} color="#fff" />
                </View>
                <Text style={{ color: "#fff", marginVertical: 10 }}>关注</Text>
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
                  <AntDesign
                    name="star"
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
