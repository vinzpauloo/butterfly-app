import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

import { useQuery } from "@tanstack/react-query";

import { Feeds } from "hooks/useFeeds";

import CommentList from "features/commentList";

import FeedContent from "components/feed/FeedContent";
import Container from "components/Container";
import FeedItemSkeleton from "components/skeletons/FeedItemSkeleton";
import SingleFeedHeader from "components/headers/SingleFeedHeader";
import CommentTextInput from "components/CommentTextInput";

const SingleFeedScreen = () => {
  const route = useRoute();
  const item: any = route.params;

  const { getSpecificFeed } = Feeds();
  const { data: specificFeed, isLoading } = useQuery({
    queryKey: ["specificFeed", item?.feedId],
    queryFn: () => getSpecificFeed(item?.feedId),
    onSuccess: (data) => {
      console.log("=== specifc feed fetched from backend! ===");
    },
    onError: (error) => {
      //
    },
  });
  return (
    <Container>
      <SingleFeedHeader title="洋情" />
      <ScrollView>
        {isLoading ? (
          <FeedItemSkeleton />
        ) : (
          <FeedContent data={{ item: specificFeed }} /> // make it object to follow the format of VirtualizedList in Feeds since the FeedContent is use their
        )}
        <CommentList workID={item?.feedId} isFromFeed={true} />
      </ScrollView>
      <CommentTextInput
        workID={item?.feedId}
        isFromFeed={true}
        keyboardAvoidBehavior="height"
      />
    </Container>
  );
};

export default SingleFeedScreen;

const styles = StyleSheet.create({});
