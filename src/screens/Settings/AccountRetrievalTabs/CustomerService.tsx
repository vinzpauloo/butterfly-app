import React, { useRef, useState } from "react";
import {
  ScrollView,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
  Image,
  TextInput,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import { AntDesign } from "@expo/vector-icons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import { HStack, VStack } from "native-base";

import { globalStyle } from "globalStyles";
import SingleChatScreen from "../../SingleChatScreen";

const CustomerService = () => {
  const navigation = useNavigation<any>();

  return (
      <>
      <View style={styles.titleAndBackContainer}>
        <View style={styles.backBtn}>
       <TouchableOpacity onPress={() => navigation.goBack()}>
             <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
         </View>
        <View>
          <Text style={styles.title}>在线客服</Text>
        </View>
         </View>
        <SingleChatScreen/>
        </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get("window").height,
    marginVertical: 0,
    maxWidth: Dimensions.get("window").width,
    backgroundColor: "#191d26",
  },
  titleAndBackContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
    backgroundColor: "#262632",
    height: 50,
  },
  backBtn: {
    position: "absolute",
    left: 5,
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
  },
  senderMessagesContainer: {
    flexDirection: "row",
    marginVertical: 12,
    marginHorizontal: 20,
    alignItems: "center",
  },
  yourMessagesContainer: {
    flexDirection: "row-reverse",
    marginVertical: 12,
    marginHorizontal: 20,
    alignItems: "center",
  },
  senderMessageAndTimeStampContainer: {
    marginLeft: 12,
    alignItems: "flex-start",
  },
  yourMessageAndTimeStampContainer: {
    marginRight: 12,
    alignItems: "flex-end",
  },
  userImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  senderSingleMessageContainer: {
    backgroundColor: globalStyle.secondaryColor,
  },
  messageContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: globalStyle.headerBasicBg,
    borderRadius: 8,
    maxWidth: 224,
  },
  senderMessageText: {
    color: "white",
    textAlign: "left",
  },
  yourOwnMessageText: {
    color: "white",
    textAlign: "right",
  },
  yourSentImage: {
    minWidth: 200,
    minHeight: 200,
    maxHeight: 500,
  },
  messageTimeStamp: {
    color: "#999",
    fontSize: 8,
    textAlign: "right",
    marginTop: 6,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    fontSize: 10,
    marginBottom: 8,
  },
  whiteText: {
    color: globalStyle.primaryTextColor,
    textAlign: "center",
  },
  bottomForm: {
    alignItems: "center",
    backgroundColor: "#262632",
    height: 50,
  },
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    borderRadius: 16,
    width: 320,
  },
});

export default CustomerService;
