import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  Image,
  RefreshControl,
  useWindowDimensions,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import moment from "moment";
import { HStack, VStack, Skeleton } from "native-base";
import { Camera } from "expo-camera";
import { useRoute } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ChatService from "services/api/ChatService";
import Container from "components/Container";
import formatDate from "../../utils/formatDate";
import { GLOBAL_COLORS } from "global";
import { singleChatMessageList } from "data/singleChatMessageList";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { translationStore } from "../../zustand/translationStore";
import { userStore } from "../../zustand/userStore";
import { FlashList } from "@shopify/flash-list";

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
    <View style={{ marginVertical: 8 }}>
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
        <Text style={styles.messageTimeStamp}>
          {moment(props.timeStamp).format("h:mm A")}{" "}
          {moment(props.timeStamp).format("MM/DD/YYYY")}
        </Text>
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
    <View style={{ marginVertical: 8 }}>
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
        <Text style={styles.messageTimeStamp}>
          {moment(props.timeStamp).format("h:mm A")}{" "}
          {moment(props.timeStamp).format("MM/DD/YYYY")}
        </Text>
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

const SingleChatScreen = () => {
  const { height } = useWindowDimensions();
  const { getDate } = formatDate();
  const scrollViewRef = useRef(null);
  const route = useRoute<any>();

  // ** state
  const [localMessage, setLocalMessages] = useState([]);
  const [input, setInput] = useState("");
  const [paginate, setPaginate] = useState(1000);
  const [lastPage, setLastPage] = useState(0);
  const [startScroll, setStartScroll] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(0);

  // ** global store
  const translations = translationStore((state) => state.translations);
  const { _id, api_token } = userStore((store) => store);

  // ** api
  const { getSingleChat, postChat } = ChatService();

  // **  Get QueryClient from the context
  const queryClient = useQueryClient();

  // ** fetch chats
  const { isLoading, data: dataChat } = useQuery({
    queryKey: ["SingleChatScreen"],
    queryFn: () =>
      getSingleChat({
        token: api_token,
        chatId: route.params.chatId,
        data: {
          page: page,
          paginate: paginate,
          sort_by: "created_at",
          sort: "asc",
        },
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      // setData((prev) => [...prev].concat(data.data));
      setData(data.data);
      scrollViewRef?.current.scrollToEnd({ animated: true });
    },
  });

  // ** send chat
  const { mutate } = useMutation(postChat, {
    onSuccess: (data) => {
      setInput("");
      queryClient.invalidateQueries({
        queryKey: ["SingleChatScreen"],
      });
      console.log("mutateDonate onSuccess", data);
    },
  });

  // ** refresher
  const onRefresh = useCallback(() => {
    setStartScroll(true);
    setRefreshing(true);
    setTimeout(() => {
      setData([]);
      setPage(1);
      setRefreshingId((prev) => prev + 1);
      setRefreshing(false);
    }, 2000);
  }, []);

  // ** when scroll reach the end or bottom part
  const reachEnd = () => {
    // if (startScroll) return null;
    // if (!isLoading) {
    //   if (lastPage !== page) {
    //     setPage((prev) => prev + 1);
    //     setStartScroll(true);
    //   }
    // }
  };

  const handleSend = () => {
    mutate({
      token: api_token,
      data: {
        message: input,
        to_id: route.params.chatId,
      },
    });
    scrollViewRef?.current.scrollToEnd({ animated: true });
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
        scrollViewRef?.current.scrollToEnd({ animated: true });
      }
    } else {
      Alert.alert("Permission not granted");
    }
  };

  useEffect(() => {
    let timer;
    if (dataChat) {
      timer = setTimeout(() => {
        // pansamantala hahaha
        scrollViewRef?.current.scrollToEnd({ animated: true });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Container>
        <ChatScreenSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      {/* <FlashList
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl
            colors={[GLOBAL_COLORS.secondaryColor]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
        onMomentumScrollBegin={() => setStartScroll(false)}
        onEndReached={reachEnd}
        bounces={false}
        data={data}
        scrollEnabled={true}
        renderItem={({ item, index }) =>
          item.from_id === _id ? (
            <YourMessage
              key={index}
              yourImgUrl={singleChatMessageList[0].yourImgUrl}
              yourUserName={singleChatMessageList[0].yourUserName}
              message={item.message}
              timeStamp={item.created_at}
            />
          ) : (
            <SenderMessage
              key={index}
              senderImgURL={singleChatMessageList[0].senderImgURL}
              senderUserName={singleChatMessageList[0].senderUserName}
              message={item.message}
              timeStamp={item.created_at}
            />
          )
        }
      /> */}
      <ScrollView ref={scrollViewRef}>
        {data.map((item, index) =>
          item.from_id === _id ? (
            <YourMessage
              key={index}
              yourImgUrl={singleChatMessageList[0].yourImgUrl}
              yourUserName={singleChatMessageList[0].yourUserName}
              message={item.message}
              timeStamp={item.created_at}
            />
          ) : (
            <SenderMessage
              key={index}
              senderImgURL={singleChatMessageList[0].senderImgURL}
              senderUserName={singleChatMessageList[0].senderUserName}
              message={item.message}
              timeStamp={item.created_at}
            />
          )
        )}
      </ScrollView>
      <HStack style={styles.bottomForm} space={3} width="full">
        {/* <Pressable onPress={handleCamera}>
              <Entypo name="camera" color={"white"} size={20} />
            </Pressable> */}
        <TextInput
          multiline={true}
          style={[styles.textInput, { maxHeight: height * 0.08 }]}
          value={input}
          placeholder="请输入您的消息"
          placeholderTextColor="#999"
          keyboardType="default"
          onChangeText={setInput}
        />
        <Pressable
          onPress={handleSend}
          style={[styles.sendMessage, { opacity: input === "" ? 0.3 : 1 }]}
          disabled={input === "" ? true : false}
        >
          <Text style={styles.whiteText}>{translations.send}</Text>
        </Pressable>
      </HStack>
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
    color: "white",
    fontSize: 11,
    textAlign: "right",
    marginTop: 6,
    opacity: 0.5,
    // marginBottom: 16,
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
    color: GLOBAL_COLORS.primaryTextColor,
    backgroundColor: GLOBAL_COLORS.primaryColor,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 16,
    flex: 1,
  },
  sendMessage: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    paddingVertical: 5,
    paddingHorizontal: 19,
    borderRadius: 16,
    alignSelf: "flex-end",
  },
});
