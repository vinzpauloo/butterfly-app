import React, { useState } from "react";
import { StyleSheet, Text, Pressable, Alert, View } from "react-native";
import { VStack, Avatar, HStack, Divider } from "native-base";
import { FlashList } from "@shopify/flash-list";

import Fontisto from "react-native-vector-icons/Fontisto";

import BottomMessage from "components/BottomMessage";
import { GLOBAL_COLORS } from "global";
import { useQuery } from "@tanstack/react-query";
import { Customer } from "hooks/useCustomer";

type commentItemProps = {
  customerId: string;
  comment: string;
  replies: {
    replyId: string;
    customerId: string;
    comment: string;
  }[];
};

const Reply = ({ reply }) => {
  const { getCustomerInfo } = Customer();
  const { data, isLoading } = useQuery({
    queryKey: ["reply", reply.customer_id],
    queryFn: () => getCustomerInfo(reply.customer_id),
    onError: (error) => {
      console.log("reply", error);
    },
  });

  if (isLoading) {
    return null;
  }

  return (
    <HStack space={2}>
      <Pressable
        onPress={() => Alert.alert("go to " + data?.username + " profile")}
      >
        <Avatar size={42} source={{ uri: data?.photo }} />
      </Pressable>
      <VStack space={1} style={{ flex: 1, paddingHorizontal: 6 }}>
        <Text style={styles.whiteText}>{data?.alias}</Text>
        <Text style={styles.whiteText}>{reply.comment}</Text>
      </VStack>
    </HStack>
  );
};

const ReplyContainer = ({ replies, amountOfCommentShown }) => {
  return (
    <>
      {replies.slice(0, amountOfCommentShown).map((reply, index) => (
        <Reply key={index} reply={reply} />
      ))}
    </>
  );
};

const CommentItem = (props: commentItemProps) => {
  const [repliesIsShown, setrepliesIsShown] = useState(false);
  const [amountOfCommentShown, setAmountOfCommentShown] = useState(10);
  const { getCustomerInfo } = Customer();
  const { data, isLoading } = useQuery({
    queryKey: ["comment", props.customerId],
    queryFn: () => getCustomerInfo(props.customerId),
    onError: (error) => {
      console.log("comment", error);
    },
  });

  if (isLoading) {
    return null;
  }

  return (
    <HStack space={2}>
      <Pressable
        onPress={() => Alert.alert("go to " + data.username + " profile")}
      >
        <Avatar size={42} source={{ uri: data.photo }} />
      </Pressable>
      <VStack space={1} style={{ flex: 1, paddingHorizontal: 6 }}>
        <Text style={styles.whiteText}>{data.alias}</Text>
        <Text style={styles.whiteText}>{props.comment}</Text>
        <Pressable onPress={() => Alert.alert("reply to " + data.username)}>
          <HStack space={1.5} style={styles.alignCenter}>
            <Fontisto
              name="commenting"
              color={GLOBAL_COLORS.inactiveTextColor}
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
          <ReplyContainer
            replies={props.replies}
            amountOfCommentShown={amountOfCommentShown}
          />
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

const CommentList = ({ data }) => {
  return (
    <View style={styles.commentsContainer}>
      <FlashList
        removeClippedSubviews={true}
        estimatedItemSize={117}
        showsVerticalScrollIndicator={false}
        data={data.comments}
        ListHeaderComponent={
          <Text style={styles.commentHeader}>
            全部评论 {data.total_comments}
          </Text>
        }
        ListFooterComponent={<BottomMessage />}
        keyExtractor={(_, index) => "" + index}
        renderItem={({ item }: any) => (
          <CommentItem
            // userName={item?.userName}
            // userImgURL={item?.userImgURL}
            customerId={item.customer_id}
            comment={item.comment}
            replies={item.replies}
          />
        )}
        ItemSeparatorComponent={() => (
          <Divider color="#999" style={styles.divider} />
        )}
      />
    </View>
  );
};

export default CommentList;

const styles = StyleSheet.create({
  whiteText: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  commentHeader: {
    color: GLOBAL_COLORS.primaryTextColor,
    marginBottom: 18,
  },
  secondaryColor: {
    color: GLOBAL_COLORS.secondaryColor,
  },
  secondaryText: {
    color: GLOBAL_COLORS.inactiveTextColor,
  },
  alignCenter: {
    alignItems: "center",
  },
  divider: {
    marginVertical: 12,
  },
  commentsContainer: {
    padding: 12,
    flex: 1,
    minHeight: 100,
  },
  loadMoreComments: {
    textAlign: "center",
    color: GLOBAL_COLORS.inactiveTextColor,
  },
});
