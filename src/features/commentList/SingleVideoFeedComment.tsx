import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Box, Divider, HStack } from "native-base";

import { Tabs } from "react-native-collapsible-tab-view";

import BottomMessage from "components/BottomMessage";
import CommentItem from "components/CommentItem";
import CommentListSkeleton from "../../components/skeletons/CommentListSkeleton";
import Container from "components/Container";
import Loading from "components/Loading";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../zustand/translationStore";

const SingleVideoFeedComment = ({
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
    return (
      <Container>
        <Tabs.FlatList
          style={{ padding: 12 }}
          data={null}
          renderItem={null}
          ListEmptyComponent={<CommentListSkeleton />}
        />
      </Container>
    );
  }
  return (
    <Container>
      <Tabs.FlatList
        style={{ padding: 16 }}
        ref={commentListRef}
        onMomentumScrollBegin={() => setStartScroll(false)}
        data={data}
        ListHeaderComponent={
          <HStack space={1.5}>
            <Box style={styles.leftBox}></Box>
            <Text style={styles.commentHeader}>{translations.allComments} {dataComments?.total}</Text>
          </HStack>
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
    </Container>
  );
};

export default SingleVideoFeedComment;

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
  leftBox: {
    backgroundColor: '#F09536',
    width: 4,
    height: 22,
    borderRadius: 2
  }
});
