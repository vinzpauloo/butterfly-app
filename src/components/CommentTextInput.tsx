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

import CommentsService from "services/api/CommentsService";
import { commentGlobalStore } from "../zustand/commentGlobalStore";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../zustand/translationStore";
import { userStore } from "../zustand/userStore";

type Props = {
  workID: string;
  isFromFeed?: boolean;
  keyboardAvoidBehavior: "height" | "padding" | "position";
};

const CommentTextInput = (props: Props) => {
  const translations = translationStore((state) => state.translations);
  const [text, setText] = useState("");
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const textInputRef = useRef<TextInput>();
  const token = userStore((store) => store.api_token);

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
      data: {
        foreign_id: props.workID,
        comment: text,
        type: props.isFromFeed ? "feed" : "work",
      },
      token: token,
    });
    globalCommentListRef.current.scrollToOffset({ animated: true, offset: 0 });
  }

  function replyToComment() {
    setText("");
    Keyboard.dismiss();
    mutateReplyComment({
      data: {
        foreign_id: props.workID,
        comment_id: commentIDToReplyTo,
        comment: text,
      },
      token: token,
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
            {translations.replyTo}: {userNameToReplyTo} ·{" "}
          </Text>
          <Pressable onPress={() => setIsOnReplyMode(false)}>
            <Text style={styles.cancelReply}>{translations.cancel}</Text>
          </Pressable>
        </HStack>
        <HStack style={styles.inputContainer} space={3}>
          <TextInput
            ref={textInputRef}
            multiline={true}
            style={styles.textInput}
            value={text}
            placeholder={translations.comment}
            placeholderTextColor="#999"
            keyboardType="default"
            onChangeText={(text) => setText(text)}
          />
          <Pressable
            style={[styles.sendComment, { opacity: text === "" ? 0.3 : 1}]}
            disabled={text === "" ? true : false}
            onPress={isOnReplyMode ? replyToComment : addNewComment}
          >
            <Text style={styles.whiteText}>发布</Text>
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
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    width: Dimensions.get("window").width,
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: GLOBAL_COLORS.videoContentBG,
  },
  textInput: {
    backgroundColor: GLOBAL_COLORS.primaryColor,
    paddingHorizontal: 12,
    borderRadius: 16,
    width: "82.5%",
    color: 'white'
  },
  cancelReply: {
    color: GLOBAL_COLORS.secondaryColor,
    padding: 8,
  },
  whiteText: {
    color: "white",
  },
  sendComment: {
    // width: "17.5%",
    alignItems: "center",
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    paddingVertical: 5,
    paddingHorizontal: 19,
    borderRadius: 16
    // borderColor: 'red',
    // borderWidth: 1
  },
});
