import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { HStack, VStack, Skeleton } from "native-base";

import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

import Container from "components/Container";
import { GLOBAL_COLORS } from "global";
import formatDate from "../../utils/formatDate";
import { singleChatMessageList } from "data/singleChatMessageList";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { translationStore } from "../../zustand/translationStore";

type Props = {};

const NoMessageYet = () => {
  return (
    <>
      <View style={styles.centeredContent}>
        <Text style={styles.whiteText}>
          文明发言,才能触及彼岸珍惜每一位原创者
        </Text>
      </View>
      <Text style={[styles.whiteText, styles.bottomText]}>请上拉刷新消息</Text>
    </>
  );
};

type SenderMessageProps = {
  senderImgURL: string;
  senderUserName: string;
  message: string;
  timeStamp: string;
};

const SenderMessage = (props: SenderMessageProps) => {
  return (
    <View>
      <VStack style={styles.senderMessageAndTimeStampContainer}>
        <>
          <Text style={styles.senderName}>{props.senderUserName}</Text>
          <View
            style={[
              styles.messageContainer,
              styles.senderSingleMessageContainer,
            ]}
          >
            <Text style={styles.senderMessageText}>{props.message}</Text>
            {/* SENDER SENT IMAGES */}
            {/* {message.image && <Image source={{ uri: BASE_URL_FILE_SERVER + message.image }} style={styles.yourSentImage} />} */}
          </View>
        </>
        <Text style={styles.messageTimeStamp}>{props.timeStamp}</Text>
      </VStack>
    </View>
  );
};

type YourMessageProps = {
  yourImgUrl: string;
  yourUserName: string;
  message: string;
  timeStamp: string;
  messageImage?: string;
};

const YourMessage = (props: YourMessageProps) => {
  return (
    <View>
      <VStack style={styles.yourMessageAndTimeStampContainer}>
        <>
          <View style={styles.messageContainer}>
            <Text style={styles.yourOwnMessageText}>{props.message}</Text>
            {props.messageImage && (
              <Image
                source={{
                  uri: BASE_URL_FILE_SERVER + props.messageImage,
                  cache: "only-if-cached",
                }}
                style={styles.yourSentImage}
              />
            )}
          </View>
        </>
        <Text style={styles.messageTimeStamp}>{props.timeStamp}</Text>
      </VStack>
    </View>
  );
};

const ChatScreenSkeleton = () => {
  return (
    <>
      <HStack mx={3} my={5} space={2}>
        <Skeleton rounded="full" w={42} h={42} />
        <VStack w="1/2">
          <Skeleton.Text lines={1} w="1/4" my={1} />
          <Skeleton.Text lines={2} w="3/4" my={1} />
          <Skeleton.Text lines={1} w="1/6" my={1} />
        </VStack>
      </HStack>
      <HStack flexDirection="row-reverse" mx={3} my={5} space={2}>
        <Skeleton rounded="full" w={42} h={42} />
        <VStack w="1/2">
          <Skeleton.Text alignSelf="flex-end" lines={1} w="1/4" my={1} />
          <Skeleton.Text alignSelf="flex-end" lines={1} w="3/4" my={1} />
          <Skeleton.Text alignSelf="flex-end" lines={1} w="1/2" my={1} />
          <Skeleton.Text alignSelf="flex-end" lines={1} w="1/6" my={1} />
        </VStack>
      </HStack>
      <HStack mx={3} my={5} space={2}>
        <Skeleton rounded="full" w={42} h={42} />
        <VStack w="1/2">
          <Skeleton.Text lines={1} w="1/4" my={1} />
          <Skeleton.Text lines={2} w="3/4" my={1} />
          <Skeleton.Text lines={1} w="1/6" my={1} />
        </VStack>
      </HStack>
      <HStack flexDirection="row-reverse" mx={3} my={5} space={2}>
        <Skeleton rounded="full" w={42} h={42} />
        <VStack w="1/2">
          <Skeleton.Text alignSelf="flex-end" lines={1} w="1/4" my={1} />
          <Skeleton.Text alignSelf="flex-end" lines={1} w="3/4" my={1} />
          <Skeleton.Text alignSelf="flex-end" lines={1} w="1/2" my={1} />
          <Skeleton.Text alignSelf="flex-end" lines={1} w="1/6" my={1} />
        </VStack>
      </HStack>
    </>
  );
};

const SingleChatScreen = (props: Props) => {
  const { getDate } = formatDate();
  const scrollViewRef = useRef(null);
  const [chatListIsLoaded, setChatListIsLoaded] = useState(false);
  const translations = translationStore((state) => state.translations);

  useEffect(() => {
    setTimeout(() => setChatListIsLoaded(true), 1000);
  });

  // LOCAL MESSAGE DATA AND FUNCTIONALITY
  const [localMessage, setLocalMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) {
      return;
    }
    setLocalMessages([
      ...localMessage,
      {
        text: input,
        user: "You",
        profile: "https://randomuser.me/api/portraits/men/4.jpg",
      },
    ]);
    setInput("");
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const handleCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      const image = await ImagePicker.launchImageLibraryAsync();
      if (!image.canceled) {
        setLocalMessages([
          ...localMessage,
          {
            image: image.assets[0].uri,
            text: input,
            user: "You",
            profile: "https://randomuser.me/api/portraits/men/4.jpg",
          },
        ]);
        setInput("");
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    } else {
      Alert.alert("Permission not granted");
    }
  };

  return (
    <Container>
      {chatListIsLoaded ? (
        singleChatMessageList.length === 0 ? (
          <NoMessageYet />
        ) : (
          <>
            <ScrollView ref={scrollViewRef} style={{paddingHorizontal: 24, paddingVertical: 16}}>
              {singleChatMessageList[0].messageChain.map((message, index) =>
                message.isMessageFromSender ? (
                  <SenderMessage
                    key={index}
                    senderImgURL={singleChatMessageList[0].senderImgURL}
                    senderUserName={singleChatMessageList[0].senderUserName}
                    message={message.message}
                    timeStamp={message.timeStamp}
                  />
                ) : (
                  <YourMessage
                    key={index}
                    yourImgUrl={singleChatMessageList[0].yourImgUrl}
                    yourUserName={singleChatMessageList[0].yourUserName}
                    message={message.message}
                    timeStamp={message.timeStamp}
                  />
                )
              )}
              {/* MESSAGES FROM LOCAL SESSION (unsaved data)*/}
              {localMessage.map((localItem, index) => (
                <YourMessage
                  key={index}
                  yourImgUrl={localItem.profile}
                  yourUserName={localItem.user}
                  message={localItem.text}
                  timeStamp={getDate()}
                  messageImage={localItem.image}
                />
              ))}
            </ScrollView>
            <HStack style={styles.bottomForm} space={3}>
              <Pressable onPress={handleCamera}>
                <Entypo name="camera" color={"white"} size={20} />
              </Pressable>
              <TextInput
                multiline={true}
                style={styles.textInput}
                value={input}
                placeholder="请输入您的消息"
                placeholderTextColor="#999"
                keyboardType="default"
                onChangeText={(text) => setInput(text)}
              />
              <Pressable 
                onPress={handleSend}
                style={[styles.sendMessage, { opacity: input === "" ? 0.3 : 1 }]}
                disabled={input === "" ? true : false}
              >
                <Text style={styles.whiteText}>{translations.send}</Text>
              </Pressable>
            </HStack>
          </>
        )
      ) : (
        <ChatScreenSkeleton />
      )}
    </Container>
  );
};

export default SingleChatScreen;

const styles = StyleSheet.create({
  senderName: {
    color: "white",
    marginBottom: 4,
  },
  senderMessageAndTimeStampContainer: {
    marginLeft: 12,
    alignItems: "flex-start",
  },
  yourMessageAndTimeStampContainer: {
    marginRight: 12,
    alignItems: "flex-end",
  },
  senderSingleMessageContainer: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
  },
  messageContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    borderRadius: 4,
    maxWidth: 260,
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
    color: 'white',
    fontSize: 11,
    textAlign: "right",
    marginTop: 6,
    opacity: 0.5,
    marginBottom: 16
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
    color: GLOBAL_COLORS.primaryTextColor,
    textAlign: "center",
  },
  bottomForm: {
    padding: 12,
    alignItems: "center",
    backgroundColor: GLOBAL_COLORS.videoContentBG,
  },
  textInput: {
    color: 'white',
    backgroundColor: GLOBAL_COLORS.primaryColor,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 16,
    width: "75%",
  },
  sendMessage: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    paddingVertical: 5,
    paddingHorizontal: 19,
    borderRadius: 16
  },
});
