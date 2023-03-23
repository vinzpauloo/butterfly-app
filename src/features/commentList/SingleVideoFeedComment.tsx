import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "native-base";

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
        style={{ padding: 12 }}
        ref={commentListRef}
        onMomentumScrollBegin={() => setStartScroll(false)}
        data={data}
        ListHeaderComponent={
          <Text style={styles.commentHeader}>
            {translations.allComments} {dataComments?.total}
          </Text>
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
        ItemSeparatorComponent={() => (
          <Divider color="#999" style={styles.divider} />
        )}
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
  },
});
