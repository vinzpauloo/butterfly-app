import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Actionsheet, Box, Center } from "native-base";

import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import { GLOBAL_COLORS } from "global";

const { width } = Dimensions.get("window");

const Modal = ({ onOpen, isOpen, onClose }) => {
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
                  <AntDesign name="star" size={20} color="#fff" />
                </View>
                <Text style={{ color: "#fff", marginVertical: 10 }}>收藏</Text>
              </View>
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
