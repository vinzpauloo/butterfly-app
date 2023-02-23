import React, { useState } from "react";
import { Dimensions, KeyboardAvoidingView, Pressable, StyleSheet, TextInput, Text, Keyboard } from "react-native";
import { Actionsheet, Box, HStack } from "native-base";
import { useMutation, useQuery } from "@tanstack/react-query";

import CommentList from "features/commentList";
import CommentListSkeleton from "./skeletons/CommentListSkeleton";
import CommentsService from "services/api/CommentsService";

import { GLOBAL_COLORS } from "global";
import { TEMPORARY_CUSTOMER_ID } from "react-native-dotenv";

const windowHeight = Dimensions.get("window").height;

const BottomComment = ({ commentForeignID, isOpen, onClose }) => {
  const [text, setText] = useState("");
  const [isKeyboardShown, setIsKeyboardShown] = useState(false)
  const { getComments, addComment } = CommentsService();
  const { isLoading, isError, data, error, status, refetch } = useQuery({
    queryKey: ["workComments", commentForeignID],
    queryFn: () => getComments({
      foreign_id: commentForeignID,
      skip: 0,
      limit: 20
    }),
    onSuccess: (data) => {
      console.log("=== commentlist fetched from backend! ===")
    },
    onError: (error) => {
      console.log("Error", error);
    },
    enabled: isOpen,
  });

  const { mutate: mutateComments } = useMutation(addComment, {
    onSuccess: (data) => { refetch() }, onError: (error) => { console.log(error) },
  });

  function addNewComment() {
    setText("");
    Keyboard.dismiss()
    mutateComments({
      site_id: 1,
      foreign_id: commentForeignID,
      customer_id: TEMPORARY_CUSTOMER_ID,
      comment: text,
      type: "work"
    });
  }

  Keyboard.addListener("keyboardDidShow", () => setIsKeyboardShown(true))
  Keyboard.addListener("keyboardDidHide", () => setIsKeyboardShown(false))

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose} >
        <Actionsheet.Content
          _dragIndicator={{ marginTop: 1 }}
          padding={0}
          borderTopRadius="24"
          backgroundColor={GLOBAL_COLORS.primaryColor}
        >
          <Box w={"100%"} h={windowHeight / 2.5} p={2}>
            {isLoading ? 
              <CommentListSkeleton/>
            :
              <CommentList data={data} />
            }
          </Box>
        </Actionsheet.Content>
        <KeyboardAvoidingView behavior="position" enabled={isKeyboardShown}>
          <HStack style={styles.bottomForm}>
            <TextInput
              style={styles.textInput}
              value={text}
              cursorColor={"white"}
              placeholder="发表评论"
              placeholderTextColor="#999"
              onChangeText={(text) => setText(text)}
              keyboardType="default"
            />
            <Pressable onPress={addNewComment}>
              <Text style={styles.submitComment}>发送</Text>
            </Pressable>
          </HStack>
        </KeyboardAvoidingView>
      </Actionsheet>
    </>
  );
};

export default BottomComment;

const styles = StyleSheet.create({
  submitComment: {
    color: "white",
  },
  textInput: {
    color: "white",
    paddingVertical: 12,
    width: 350,
  },
  submitCommentText: {
    color: "white",
  },
  bottomForm: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: GLOBAL_COLORS.headerBasicBg,
    paddingHorizontal: 12,
  },
});
