import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Box, Divider, HStack } from "native-base";
import { FlashList } from "@shopify/flash-list";

import BottomMessage from "components/BottomMessage";
import CommentItem from "components/CommentItem";
import CommentListSkeleton from "../../components/skeletons/CommentListSkeleton";
import FeedItemSkeleton from "components/skeletons/FeedItemSkeleton";
import Loading from "components/Loading";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../zustand/translationStore";

const MomentFeedComment = ({
  props,
  lastPage,
  isLoading,
  commentListRef,
  data,
  dataComments,
  reachEnd,
  setStartScroll,
  page,
}) => {
  const translations = translationStore((store) => store.translations);

  if (lastPage === 1 && isLoading) {
    if (props.isFromFeed) {
      return (
        <View style={styles.commentsContainer}>
          <FeedItemSkeleton />
          <CommentListSkeleton />
        </View>
      );
    }
    return (
      <View style={styles.commentsContainer}>
        <CommentListSkeleton />
      </View>
    );
  }

  return (
    <View style={styles.commentsContainer}>
      <FlashList
        ref={commentListRef}
        removeClippedSubviews={true}
        estimatedItemSize={117}
        showsVerticalScrollIndicator={false}
        onMomentumScrollBegin={() => setStartScroll(false)}
        data={data}
        ListHeaderComponent={
          <>
            {props.customHeaderComponent}
            <HStack space={1.5}>
              <Box style={styles.leftBox}></Box>
              <Text style={styles.commentHeader}>{translations.allComments} {dataComments?.total}</Text>
            </HStack>
          </>
        }
        keyExtractor={(_, index) => "" + index}
        renderItem={({ item }: any) => (
          <CommentItem
            commentID={item.comment_id}
            comment={item.comment}
            username={item.username}
            photo={item.photo}
            replies={item.replies}
          />
        )}
        ItemSeparatorComponent={() => <Divider style={styles.divider}/>}
        onEndReachedThreshold={0.1}
        onEndReached={reachEnd}
        ListFooterComponent={() => (
          <>
            {/* the gap will be remove if the lastpage is been fetch */}
            {lastPage !== page || (lastPage === page && isLoading) ? (
              <View>
                {/* to have a gap in bottom part of section to see the loading icon */}
                {isLoading ? <Loading /> : null}
              </View>
            ) : null}
            {lastPage === page && !isLoading ? <BottomMessage /> : null}
          </>
        )}
      />
    </View>
  );
};

export default MomentFeedComment;

const styles = StyleSheet.create({
  commentHeader: {
    color: GLOBAL_COLORS.primaryTextColor,
    marginBottom: 18,
  },
  divider: {
    marginVertical: 12,
    backgroundColor: 'white',
    opacity: 0.1,
    width: '85%',
    marginLeft: '15%'
  },
  commentsContainer: {
    padding: 12,
    flex: 1,
    minHeight: 100,
  },
  leftBox: {
    backgroundColor: '#F09536',
    width: 4,
    height: 22,
    borderRadius: 2
  }
});
