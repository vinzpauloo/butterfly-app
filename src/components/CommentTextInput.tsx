import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import Feather from "react-native-vector-icons/Feather";
import { HStack, VStack } from "native-base";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { GLOBAL_COLORS } from "global";
import CommentsService from "services/api/CommentsService";
import { commentGlobalStore } from "../zustand/commentGlobalStore";
import { userStore } from "../zustand/userStore";

type Props = {
  workID: string;
  isFromFeed?: boolean;
  keyboardAvoidBehavior: "height" | "padding" | "position";
};

const CommentTextInput = (props: Props) => {
  const customerID = userStore((store) => store._id);
  const [text, setText] = useState("");
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const textInputRef = useRef<TextInput>();

  // subscribe to comment global store
  const [
    isOnReplyMode,
    setIsOnReplyMode,
    userNameToReplyTo,
    setUserNameToReplyTo,
    commentIDToReplyTo,
    setCommentIDToReplyTo,
    setGlobalTextInputRef,
    globalCommentListRef,
  ] = commentGlobalStore((state) => [
    state.isOnReplyMode,
    state.setIsOnReplyMode,
    state.userNameToReplyTo,
    state.setUserNameToReplyTo,
    state.commentIDToReplyTo,
    state.setCommentIDToReplyTo,
    state.setGlobalTextInputRef,
    state.globalCommentListRef,
  ]);

  useEffect(() => {
    setGlobalTextInputRef(textInputRef);
    return () => {
      // reset the comment global store on unmount of comment text input
      setGlobalTextInputRef(null);
      setIsOnReplyMode(false);
      setUserNameToReplyTo("");
      setCommentIDToReplyTo("");
    };
  }, []);

  Keyboard.addListener("keyboardDidShow", () => setIsKeyboardShown(true));
  Keyboard.addListener("keyboardDidHide", () => setIsKeyboardShown(false));

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const { addComment, replyComment } = CommentsService();
  const { mutate: mutateAddComment } = useMutation(addComment, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["workComments", props.workID],
      });
    },
    onError: (error) => {
      alert(error);
    },
  });
  const { mutate: mutateReplyComment } = useMutation(replyComment, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["workComments", props.workID],
      });
    },
    onError: (error) => {
      alert(error);
    },
  });

  function addNewComment() {
    setText("");
    Keyboard.dismiss();
    mutateAddComment({
      site_id: 1,
      foreign_id: props.workID,
      customer_id: customerID,
      comment: text,
      type: props.isFromFeed ? "feed" : "work",
    });
    globalCommentListRef.current.scrollToOffset({ animated: true, offset: 0 });
  }

  function replyToComment() {
    setText("");
    Keyboard.dismiss();
    mutateReplyComment({
      comment_id: commentIDToReplyTo,
      customer_id: customerID,
      comment: text,
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={props.keyboardAvoidBehavior}
      enabled={isKeyboardShown}
    >
      <VStack pt={isOnReplyMode ? 0 : 3} style={styles.bottomForm} space={1}>
        <HStack alignItems="center" display={isOnReplyMode ? "flex" : "none"}>
          <Text style={styles.whiteText}>
            Replying to: {userNameToReplyTo} ·{" "}
          </Text>
          <Pressable onPress={() => setIsOnReplyMode(false)}>
            <Text style={styles.cancelReply}>Cancel</Text>
          </Pressable>
        </HStack>
        <HStack style={styles.inputContainer} space={3}>
          <TextInput
            ref={textInputRef}
            multiline={true}
            style={styles.textInput}
            value={text}
            placeholder="发表评论"
            placeholderTextColor="#999"
            keyboardType="default"
            onChangeText={(text) => setText(text)}
          />
          <Pressable
            style={styles.sendComment}
            disabled={text === "" ? true : false}
            onPress={isOnReplyMode ? replyToComment : addNewComment}
          >
            <Feather
              name="send"
              color={
                text === ""
                  ? GLOBAL_COLORS.inactiveTextColor
                  : GLOBAL_COLORS.secondaryColor
              }
              size={20}
            />
          </Pressable>
        </HStack>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default CommentTextInput;

const styles = StyleSheet.create({
  bottomForm: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: GLOBAL_COLORS.headerBasicBg,
    width: Dimensions.get("window").width,
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: GLOBAL_COLORS.headerBasicBg,
  },
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    borderRadius: 16,
    width: "90%",
  },
  cancelReply: {
    color: GLOBAL_COLORS.secondaryColor,
    padding: 8,
  },
  whiteText: {
    color: "white",
  },
  sendComment: {
    width: "10%",
    alignItems: "center",
    paddingVertical: 4,
  },
});
