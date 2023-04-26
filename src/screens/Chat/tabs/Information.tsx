import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import { VStack, Box, HStack, Avatar, Skeleton } from "native-base";

import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Container from "components/Container";
import BottomMessage from "components/BottomMessage";

import { messageList } from "data/messageList";
import { useNavigation } from "@react-navigation/native";
import { translationStore } from "../../../zustand/translationStore";
import ChatService from "services/api/ChatService";
import { useQuery } from "@tanstack/react-query";
import { userStore } from "../../../zustand/userStore";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

const windowWidth = Dimensions.get("window").width;

type MessageItemProps = {
  senderUserName: string;
  senderMessage: string;
  senderImgURL: string;
  senderTimeStamp: string;
};

type Props = {};

const MessageItem = (props: MessageItemProps) => {
  const navigation = useNavigation<any>();

  return (
    <VStack style={styles.messageContainer}>
      <Pressable
        onPress={() => {
          navigation.navigate("SingleChatScreen", {
            postTitle: props.senderUserName,
          });
        }}
      >
        <HStack space={3}>
          <Pressable
            onPress={() => {
              Alert.alert("Go to " + props.senderUserName + " profile");
            }}
          >
            <Avatar
              color="white"
              size={42}
              source={{ uri: BASE_URL_FILE_SERVER + props.senderImgURL }}
            />
          </Pressable>
          <VStack space={1}>
            <Text style={[styles.text, { maxWidth: windowWidth - 110 }]}>
              {props.senderUserName}
            </Text>
            <Text style={[styles.text, { maxWidth: windowWidth - 110 }]}>
              {props.senderMessage}
            </Text>
          </VStack>
          <Pressable
            onPress={() => {
              Alert.alert("Delete Message from " + props.senderUserName);
            }}
            style={styles.deleteIcon}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              color={"white"}
              size={24}
            />
            {/* <Text style={styles.text}>删除</Text> */}
          </Pressable>
        </HStack>
      </Pressable>
    </VStack>
  );
};

const MessageItemSkeleton = () => {
  return (
    <>
      <VStack style={styles.messageContainer}>
        <HStack space={3}>
          <Skeleton size={42} rounded="full" />
          <VStack space={1} w="full">
            <Skeleton.Text lines={1} w="1/6" />
            <Skeleton.Text lines={2} w="5/6" mt={3} />
          </VStack>
        </HStack>
      </VStack>
      <VStack style={styles.messageContainer}>
        <HStack space={3}>
          <Skeleton size={42} rounded="full" />
          <VStack space={1} w="full">
            <Skeleton.Text lines={1} w="1/6" />
            <Skeleton.Text lines={2} w="5/6" mt={3} />
          </VStack>
        </HStack>
      </VStack>
      <VStack style={styles.messageContainer}>
        <HStack space={3}>
          <Skeleton size={42} rounded="full" />
          <VStack space={1} w="full">
            <Skeleton.Text lines={1} w="1/6" />
            <Skeleton.Text lines={2} w="5/6" mt={3} />
          </VStack>
        </HStack>
      </VStack>
    </>
  );
};

const Information = (props: Props) => {
  const translations = translationStore((state) => state.translations);
  const navigation = useNavigation<any>();

  const token = userStore((state) => state.api_token);
  const { getChats } = ChatService();
  const {} = useQuery({
    queryKey: ["getChats"],
    queryFn: () => getChats(token),
    onSuccess: (data) => {
      console.log("Success getChats", data);
    },
    onError: (error) => {
      console.log("Error getChats", error);
    },
  });

  const [messageListIsLoaded, setmessageListIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setmessageListIsLoaded(true), 1000);
  });

  return (
    <Container>
      <HStack space={3} style={styles.optionsList}>
        <Pressable
          onPress={() => {
            navigation.navigate("InformationScreen", {
              postTitle: translations.fan,
            });
          }}
        >
          <VStack space={1.5} style={styles.boxContainer}>
            <Box style={styles.box}>
              <Feather name="heart" color={"white"} size={24} />
            </Box>
            <Text style={styles.centerText}>{translations.fan}</Text>
          </VStack>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("InformationScreen", {
              postTitle: translations.liked,
            });
          }}
        >
          <VStack space={1.5} style={styles.boxContainer}>
            <Box style={styles.box}>
              <AntDesign name="like2" color={"white"} size={24} />
            </Box>
            <Text style={styles.centerText}>{translations.liked}</Text>
          </VStack>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("InformationScreen", {
              postTitle: translations.comments,
            });
          }}
        >
          <VStack space={1.5} style={styles.boxContainer}>
            <Box style={styles.box}>
              <FontAwesome name="comment-o" color={"white"} size={24} />
            </Box>
            <Text style={styles.centerText}>{translations.comments}</Text>
          </VStack>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("InformationScreen", {
              postTitle: translations.income,
            });
          }}
        >
          <VStack space={1.5} style={styles.boxContainer}>
            <Box style={styles.box}>
              <Fontisto name="money-symbol" color={"white"} size={24} />
            </Box>
            <Text style={styles.centerText}>{translations.income}</Text>
          </VStack>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("InformationScreen", {
              postTitle: translations.system,
            });
          }}
        >
          <VStack space={1.5} style={styles.boxContainer}>
            <Box style={styles.box}>
              <Octicons name="gear" color={"white"} size={24} />
            </Box>
            <Text style={styles.centerText}>{translations.system}</Text>
          </VStack>
        </Pressable>
      </HStack>
      <Text style={styles.categoryText}>{translations.privateMessage}</Text>
      {messageListIsLoaded ? (
        <FlatList
          data={messageList}
          scrollEnabled={true}
          renderItem={({ item, index }) => (
            <MessageItem
              senderUserName={item.userName}
              senderMessage={item.message}
              senderImgURL={item.imgURL}
              senderTimeStamp={item.timeStamp}
            />
          )}
          keyExtractor={(item, index) => "" + index}
          ListFooterComponent={<BottomMessage />}
        />
      ) : (
        <MessageItemSkeleton />
      )}
    </Container>
  );
};

export default Information;

const styles = StyleSheet.create({
  optionsList: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  boxContainer: {
    alignItems: "center",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: "white",
  },
  centerText: {
    color: "white",
    textAlign: "center",
  },
  categoryText: {
    color: "white",
    borderLeftColor: "#e15655",
    borderLeftWidth: 4,
    paddingLeft: 12,
    marginTop: 12,
  },
  text: {
    color: "white",
  },
  deleteIcon: {
    alignSelf: "center",
    marginLeft: "auto",
  },
  messageContainer: {
    backgroundColor: "#262632",
    marginTop: 12,
    padding: 12,
  },
  dividerColor: {
    backgroundColor: "#999",
  },
});
