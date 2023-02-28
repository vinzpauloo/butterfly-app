import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View, Keyboard, KeyboardAvoidingView, TextInput, Dimensions } from "react-native";
import { HStack, Divider } from "native-base";
import { FlashList } from "@shopify/flash-list";

import CommentItem from "components/CommentItem";
import BottomMessage from "components/BottomMessage";
import CommentsService from "services/api/CommentsService";
import CommentListSkeleton from "../../components/skeletons/CommentListSkeleton";

import { GLOBAL_COLORS } from "global";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TEMPORARY_CUSTOMER_ID } from "react-native-dotenv";

type CommentListProps = {
  isFromFeed?: boolean
  workID: string
}

const CommentList = (props: CommentListProps) => {
  const [text, setText] = useState("");
  const [isKeyboardShown, setIsKeyboardShown] = useState(false)

  const { getComments, addComment } = CommentsService();
  const { isLoading, isError, data, error, status, refetch } = useQuery({
    queryKey: ["workComments", props.workID],
    queryFn: () => getComments({
      foreign_id: props.workID,
      skip: 0,
      limit: 10
    }),
    onSuccess: (data) => {
      console.log("=== commentlist fetched from backend! ===")
    },
    onError: (error) => {
      console.log("Error", error);
    },
    // enabled: isOpen,
  });

  const { mutate: mutateComments } = useMutation(addComment, {
    onSuccess: (data) => { refetch() }, onError: (error) => { console.log(error) },
  });

  function addNewComment() {
    setText("");
    Keyboard.dismiss()
    mutateComments({
      site_id: 1,
      foreign_id: props.workID,
      customer_id: TEMPORARY_CUSTOMER_ID,
      comment: text,
      type: props.isFromFeed? "feed" : "work"
    });
  }

  Keyboard.addListener("keyboardDidShow", () => setIsKeyboardShown(true))
  Keyboard.addListener("keyboardDidHide", () => setIsKeyboardShown(false))

  return (
      <View style={styles.commentsContainer}>
        {isLoading ? <CommentListSkeleton/> :
          <FlashList
            removeClippedSubviews={true}
            estimatedItemSize={117}
            showsVerticalScrollIndicator={false}
            data={data?.comments}
            ListHeaderComponent={<Text style={styles.commentHeader}>全部评论 {data?.total_comments}</Text>}
            ListFooterComponent={<BottomMessage />}
            keyExtractor={(_, index) => "" + index}
            renderItem={({ item }: any) => (
              <CommentItem
                  customerId={item.customer_id}
                  comment={item.comment}
                  username={item.username}
                  photo={item.photo}
                  replies={item.replies}
              />)}
            ItemSeparatorComponent={() => <Divider color="#999" style={styles.divider} />}
          />
        }
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
      </View>
  );
};

export default CommentList;

const styles = StyleSheet.create({
  commentHeader: {
    color: GLOBAL_COLORS.primaryTextColor,
    marginBottom: 18,
  },
  divider: {
    marginVertical: 12,
  },
  commentsContainer: {
    padding: 12,
    flex: 1,
    minHeight: 100,
  },
  submitComment: {
    color: "white",
  },
  textInput: {
    color: "white",
    paddingVertical: 12,
    width: "90%",
  },
  submitCommentText: {
    color: "white",
  },
  bottomForm: {
    position: "absolute",
    zIndex: 1,
    bottom: -12,
    left: -12,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: GLOBAL_COLORS.headerBasicBg,
    paddingHorizontal: 12,
  },
});
