import React from "react";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import FeedService from "services/api/FeedService";

import CommentList from "features/commentList";
import FeedItem from "components/FeedItem";
import Container from "components/Container";
import FeedItemSkeleton from "components/skeletons/FeedItemSkeleton";
import SingleFeedHeader from "components/headers/SingleFeedHeader";
import CommentTextInput from "components/CommentTextInput";
import { userStore } from "../../zustand/userStore";

type Props = {};

const SingleFeedScreen = (props: Props) => {
  const token = userStore((state) => state.api_token);
  const route = useRoute();
  const item: any = route.params;

  const { getSpecificFeed } = FeedService();
  const { data: specificFeed, isLoading } = useQuery({
    queryKey: ["specificFeed", item?.feedId],
    queryFn: () =>
      getSpecificFeed({ data: { feedId: item?.feedId }, token: token }),
    onSuccess: (data) => {
      console.log("=== specifc feed fetched from backend! ===");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  console.log("FEEED ID", item?.feedId);
  return (
    <Container>
      <SingleFeedHeader title="洋情" />
      <CommentList
        workID={item?.feedId}
        isFromFeed={true}
        customHeaderComponent={
          isLoading ? <FeedItemSkeleton /> : <FeedItem item={specificFeed} />
        }
      />
      <CommentTextInput
        workID={item?.feedId}
        isFromFeed={true}
        keyboardAvoidBehavior="height"
      />
    </Container>
  );
};

export default SingleFeedScreen;
