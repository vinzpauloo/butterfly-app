import React from "react";
import { Actionsheet, Box, Center } from "native-base";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

import FavoriteButton from "./forms/modal/FavoriteButton";
import Fontisto from "react-native-vector-icons/Fontisto";
import LikeButton from "./forms/modal/LikeButton";
import { GLOBAL_COLORS } from "global";
import { useNavigation } from "@react-navigation/native";
import { translationStore } from "../zustand/translationStore";

const { width } = Dimensions.get("window");

const Modal = ({ onOpen, isOpen, onClose, id }) => {
  const translations = translationStore((state) => state.translations);
  const navigation = useNavigation<any>();
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
              <Pressable
                style={{ alignItems: "center" }}
                onPress={() => navigation.navigate("SharingPromotion")}
              >
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
                  {translations.share}
                </Text>
              </Pressable>
              <LikeButton isOpen={isOpen} id={id} />
              <FavoriteButton isOpen={isOpen} id={id} />
            </View>
            <Pressable onPress={onClose}>
              <Text style={{ color: "#fff", marginVertical: 15 }}>
                {translations.cancel}
              </Text>
            </Pressable>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};

export default Modal;

const styles = StyleSheet.create({});
