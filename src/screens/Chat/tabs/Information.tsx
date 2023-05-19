import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { VStack, HStack, Avatar, Skeleton } from "native-base";

import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import BottomMessage from "components/BottomMessage";
import ChatService from "services/api/ChatService";
import CommentsIcon from "assets/images/CommentsIcon.png";
import Container from "components/Container";
import FansIcon from "assets/images/FansIcon.png";
import IncomeIcon from "assets/images/IncomeIcon.png";
import LikeIcon from "assets/images/LikeIcon.png";
import Loading from "components/Loading";
import SystemIcon from "assets/images/SystemIcon.png";
import { translationStore } from "../../../zustand/translationStore";
import { userStore } from "../../../zustand/userStore";
import { GLOBAL_COLORS } from "global";

type MessageItemProps = {
  id: number;
  userName: string;
  message: string;
  imgURL: string;
  timeStamp: string;
};

type Props = {};

const MessageItem = (props: MessageItemProps) => {
  const navigation = useNavigation<any>();

  return (
    <VStack style={styles.messageContainer}>
      <Pressable
        onPress={() => {
          navigation.navigate("SingleChatScreen", {
            postTitle: props.userName,
            chatId: props.id,
          });
        }}
      >
        <HStack space={3} alignItems="center">
          <Pressable
            onPress={() => {
              Alert.alert("Go to " + props.userName + " profile");
            }}
          >
            <Avatar
              color="white"
              size={12}
              source={{ uri: BASE_URL_FILE_SERVER + props.imgURL }}
            />
          </Pressable>
          <VStack space={1.5} flexShrink={1}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              width="full"
            >
              <Text style={[styles.text, { fontSize: 16 }]}>
                {props.userName}
              </Text>
              <Text style={{ opacity: 0.5, color: "white", fontSize: 10 }}>
                {moment(props.timeStamp).format("h:mm A")}{" "}
                {moment(props.timeStamp).format("MM/DD/YYYY")}
              </Text>
            </HStack>
            <Text style={[styles.text, { fontSize: 15 }]} numberOfLines={1}>
              {props.message}
            </Text>
          </VStack>
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
  const navigation = useNavigation<any>();
  // ** state
  const [paginate, setPaginate] = useState(1000);
  const [lastPage, setLastPage] = useState(0);
  const [startScroll, setStartScroll] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(0);
  const [loading, setLoading] = useState(true);
  // ** global state
  const { translations } = translationStore((state) => state);
  const { api_token, _id } = userStore((state) => state);
  // ** api
  const { getAllChats } = ChatService();

  const { isLoading } = useQuery({
    queryKey: ["getAllChats", page, refreshingId],
    queryFn: () =>
      getAllChats({
        token: api_token,
        data: { page: page, paginate: paginate },
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      // setData((prev) => [...prev].concat(data.data));
      setData(data.data);
      console.log("Success getChats", data);
    },
    onError: (error) => {
      console.log("Error getChats", error);
    },
  });

  // ** refresher
  const onRefresh = useCallback(() => {
    setLoading(true);
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
    //     setLoading(false);
    //   }
    // }
  };

  return (
    <Container>
      <HStack space={3} style={styles.optionsList}>
        <Pressable
          onPress={() => {
            navigation.navigate("InformationScreen", {
              postTitle: translations.liked,
              postMessage: "LikeCard",
            });
          }}
        >
          <VStack space={1} style={styles.boxContainer}>
            <Image source={FansIcon} style={styles.icons} />
            <Text style={styles.centerText}>{translations.liked}</Text>
          </VStack>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("InformationScreen", {
              postTitle: translations.fan,
              postMessage: "FanCard",
            });
          }}
        >
          <VStack space={1.5} style={styles.boxContainer}>
            <Image source={LikeIcon} style={styles.icons} />

            <Text style={styles.centerText}>{translations.fan}</Text>
          </VStack>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("InformationScreen", {
              postTitle: translations.comments,
              postMessage: "CommentCard",
            });
          }}
        >
          <VStack space={1.5} style={styles.boxContainer}>
            <Image source={CommentsIcon} style={styles.icons} />

            <Text style={styles.centerText}>{translations.comments}</Text>
          </VStack>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("InformationScreen", {
              postTitle: translations.income,
              postMessage: "IncomeCard",
            });
          }}
        >
          <VStack space={1.5} style={styles.boxContainer}>
            <Image source={IncomeIcon} style={styles.icons} />

            <Text style={styles.centerText}>{translations.income}</Text>
          </VStack>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("InformationScreen", {
              postTitle: translations.system,
              postMessage: "SystemCard",
            });
          }}
        >
          <VStack space={1.5} style={styles.boxContainer}>
            <Image source={SystemIcon} style={styles.icons} />
            <Text style={styles.centerText}>{translations.system}</Text>
          </VStack>
        </Pressable>
      </HStack>
      <Text style={styles.categoryText}>{translations.privateMessage}</Text>
      {isLoading && loading ? (
        <MessageItemSkeleton />
      ) : (
        <FlatList
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
          renderItem={({ item, index }) => (
            <MessageItem
              id={item.id}
              userName={item.username}
              message={item.latest_message}
              imgURL={item.photo}
              timeStamp={item.created_at}
            />
          )}
          keyExtractor={(item, index) => "" + index}
          // ListFooterComponent={<BottomMessage />}
          ListFooterComponent={() => (
            <>
              {/* the gap will be remove if the lastpage is been fetch */}
              {lastPage !== page || (lastPage === page && isLoading) ? (
                <View style={{ marginBottom: 60 }}>
                  {/* to have a gap in bottom part of section to see the loading icon */}
                  {isLoading ? <Loading /> : null}
                </View>
              ) : null}
              {lastPage === page && !isLoading ? <BottomMessage /> : null}
            </>
          )}
        />
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
  centerText: {
    color: "white",
    textAlign: "center",
  },
  categoryText: {
    color: "white",
    borderLeftColor: GLOBAL_COLORS.secondaryColor,
    borderLeftWidth: 4,
    paddingLeft: 12,
    marginTop: 12,
    marginHorizontal: 15,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  deleteIcon: {
    alignSelf: "center",
    marginLeft: "auto",
  },
  messageContainer: {
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    marginTop: 16,
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 4,
  },
  dividerColor: {
    backgroundColor: "#999",
  },
  icons: {
    height: 38,
    width: 38,
    resizeMode: "contain",
  },
});
