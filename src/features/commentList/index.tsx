import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, Alert, View } from "react-native";
import { VStack, Avatar, HStack, Divider, Skeleton } from "native-base";
import { FlashList } from "@shopify/flash-list";

import { comments } from "data/comments";
import BottomMessage from "components/BottomMessage";
import { globalStyle } from "globalStyles";
import Fontisto from "react-native-vector-icons/Fontisto";

type Props = {};

type commentItemProps = {
  userName: string;
  comment: string;
  userImgURL: string;
  replies: {
    userName: string;
    comment: string;
    userImgURL: string;
  }[];
};

const CommentItem = (props: commentItemProps) => {
  const [repliesIsShown, setrepliesIsShown] = useState(false);
  const [amountOfCommentShown, setAmountOfCommentShown] = useState(10);

  return (
    <HStack space={2}>
      <Pressable
        onPress={() => Alert.alert("go to " + props.userName + " profile")}
      >
        <Avatar size={42} source={{ uri: props.userImgURL }} />
      </Pressable>
      <VStack space={1} style={{ flex: 1, paddingHorizontal: 6 }}>
        <Text style={styles.whiteText}>{props.userName}</Text>
        <Text style={styles.whiteText}>{props.comment}</Text>
        <Pressable onPress={() => Alert.alert("reply to " + props.userName)}>
          <HStack space={1.5} style={styles.alignCenter}>
            <Fontisto
              name="commenting"
              color={globalStyle.inactiveTextColor}
              size={14}
            />
            <Text style={styles.secondaryText}>回复</Text>
          </HStack>
        </Pressable>
        <Pressable
          onPress={() => {
            setrepliesIsShown(!repliesIsShown);
          }}
        >
          {props.replies.length > 0 ? (
            <Text style={styles.secondaryColor}>
              查看 {props.replies.length} 则回复
            </Text>
          ) : null}
        </Pressable>
        <VStack
          space={4}
          mt={8}
          style={repliesIsShown ? { display: "flex" } : { display: "none" }}
        >
          {props.replies.slice(0, amountOfCommentShown).map((reply, index) => (
            <HStack key={index} space={2}>
              <Pressable
                onPress={() =>
                  Alert.alert("go to " + reply.userName + " profile")
                }
              >
                <Avatar size={42} source={{ uri: reply.userImgURL }} />
              </Pressable>
              <VStack space={1} style={{ flex: 1, paddingHorizontal: 6 }}>
                <Text style={styles.whiteText}>{reply.userName}</Text>
                <Text style={styles.whiteText}>{reply.comment}</Text>
              </VStack>
            </HStack>
          ))}
          {props.replies.length >= 10 &&
          amountOfCommentShown < props.replies.length ? (
            <Pressable
              onPress={() => setAmountOfCommentShown(amountOfCommentShown + 10)}
            >
              <Text style={styles.loadMoreComments}>更多裝載</Text>
            </Pressable>
          ) : null}
        </VStack>
      </VStack>
    </HStack>
  );
};


const CommentListSkeleton = () => {
  return (
    <>
      <Skeleton.Text lines={1} w="1/6" mb="18px" />
      <HStack space={2}>
        <Skeleton size={42} rounded="full" />
        <VStack space={4} style={{ flex: 1, paddingHorizontal: 6 }}>
          <Skeleton.Text lines={1} w="1/6" />
          <Skeleton.Text lines={3} w="full" />
          <HStack space={1.5} alignItems="center">
            <Skeleton w="14px" h="14px" rounded="full" />
            <Skeleton.Text lines={1} w="1/6" />
          </HStack>
        </VStack>
      </HStack>
      <Skeleton h="1px" w="full" mt={3} />
    </>
  )
}

const CommentList = (props: Props) => {
  const [commentListIsLoaded, setCommentListIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setCommentListIsLoaded(true), 1500);
  });

  return (
    <View style={styles.commentsContainer}>
      {commentListIsLoaded ?
        <FlashList
          removeClippedSubviews={true}
          estimatedItemSize={117}
          showsVerticalScrollIndicator={false}
          data={comments}
          ListHeaderComponent={
            <Text style={styles.commentHeader}>全部评论 {comments.length}</Text>
          }
          ListFooterComponent={<BottomMessage />}
          keyExtractor={(_, index) => "" + index}
          renderItem={({ item }) => (
            <CommentItem
              userName={item.userName}
              userImgURL={item.userImgURL}
              comment={item.comment}
              replies={item.replies}
            />
          )}
          ItemSeparatorComponent={() => (
            <Divider color="#999" style={styles.divider} />
          )}
          />
      :
        <CommentListSkeleton/>
      }
    </View>
  );
};

export default CommentList;

const styles = StyleSheet.create({
  whiteText: {
    color: globalStyle.primaryTextColor,
  },
  commentHeader: {
    color: globalStyle.primaryTextColor,
    marginBottom: 18,
  },
  secondaryColor: {
    color: globalStyle.secondaryColor,
  },
  secondaryText: {
    color: globalStyle.inactiveTextColor,
  },
  alignCenter: {
    alignItems: "center",
  },
  divider: {
    marginVertical: 12,
  },
  commentsContainer: {
    padding: 12,
    flex :1
  },
  loadMoreComments: {
    textAlign: "center",
    color: globalStyle.inactiveTextColor,
  },
});
