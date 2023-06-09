import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { HStack, Avatar, VStack } from "native-base";
import { GLOBAL_COLORS } from "global";

import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { commentGlobalStore } from "../zustand/commentGlobalStore";
import Fontisto from "react-native-vector-icons/Fontisto";
import { FlashList } from "@shopify/flash-list";
import { translationStore } from "../zustand/translationStore";

type repliesDataType = {
  customerId: string;
  username: string;
  photo: string;
  comment: string;
};

type commentItemProps = {
  commentID: string;
  comment: string;
  username: string;
  photo: string;
  replies: repliesDataType[];
};

const CommentItem = (props: commentItemProps) => {
  const translations = translationStore((state) => state.translations);
  const [repliesIsShown, setrepliesIsShown] = useState(false);
  const [amountOfCommentShown, setAmountOfCommentShown] = useState(10);

  // subscribe to comment global store
  const [
    setIsOnReplyMode,
    setUserNameToReplyTo,
    setCommentIDToReplyTo,
    globalTextInputRef,
  ] = commentGlobalStore((state) => [
    state.setIsOnReplyMode,
    state.setUserNameToReplyTo,
    state.setCommentIDToReplyTo,
    state.globalTextInputRef,
  ]);

  function enableReplyMode() {
    setIsOnReplyMode(true);
    globalTextInputRef.current.focus();
    setUserNameToReplyTo(props.username);
    setCommentIDToReplyTo(props.commentID);
  }

  return (
    <HStack space={2}>
      <Avatar size={42} source={{ uri: BASE_URL_FILE_SERVER + props.photo }} />
      <VStack space={1} flex={1} px={2}>
        <Text style={styles.whiteText}>{props.username}</Text>
        <Text style={styles.subText}>18:24 05/04/2023</Text>
        <Text style={styles.whiteText}>{props.comment}</Text>
        <Pressable style={styles.interactable} onPress={enableReplyMode}>
          <HStack space={1.5} alignItems="center">
            <Fontisto
              name="commenting"
              color={GLOBAL_COLORS.inactiveTextColor}
              size={14}
            />
            <Text style={styles.secondaryText}>{translations.reply}</Text>
          </HStack>
        </Pressable>
        {props?.replies?.length > 0 ? (
          <Pressable
            style={styles.interactable}
            onPress={() => {
              setrepliesIsShown(!repliesIsShown);
            }}
          >
            <Text style={styles.secondaryColor}>
              {!repliesIsShown ? translations.check : translations.hide} (
              {props?.replies?.length}) {translations.thenReply}
            </Text>
          </Pressable>
        ) : null}
        {repliesIsShown && props?.replies?.length > 0 ? (
          <VStack flex={1} space={4} minH={49}>
            <FlashList
              estimatedItemSize={50}
              data={props?.replies?.slice(0, amountOfCommentShown)}
              removeClippedSubviews={true}
              renderItem={({ item }: any) => (
                <HStack space={2} my={2}>
                  <Avatar
                    size={42}
                    source={{ uri: BASE_URL_FILE_SERVER + item.photo }}
                  />
                  <VStack space={1} px={2} flex={1}>
                    <Text style={styles.whiteText}>{item.username}</Text>
                    <Text style={styles.subText}>{item.comment}</Text>
                  </VStack>
                </HStack>
              )}
            />
            {props?.replies?.length >= 10 &&
            amountOfCommentShown < props?.replies?.length ? (
              <Pressable
                onPress={() => setAmountOfCommentShown((prev) => prev + 10)}
              >
                <Text style={styles.loadMoreComments}>
                  {translations.moreLoading}
                </Text>
              </Pressable>
            ) : null}
          </VStack>
        ) : null}
      </VStack>
    </HStack>
  );
};
export default CommentItem;

const styles = StyleSheet.create({
  whiteText: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  secondaryColor: {
    color: GLOBAL_COLORS.secondaryColor,
  },
  secondaryText: {
    color: GLOBAL_COLORS.inactiveTextColor,
  },
  loadMoreComments: {
    textAlign: "center",
    color: GLOBAL_COLORS.inactiveTextColor,
  },
  interactable: {
    paddingVertical: 8,
  },
  subText: {
    color: GLOBAL_COLORS.primaryTextColor,
    opacity: 0.5
  }
});
