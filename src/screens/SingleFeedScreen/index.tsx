import React, { memo, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import FeedService from "services/api/FeedService";

import CommentList from "features/commentList";
import CommentTextInput from "components/CommentTextInput";
import Container from "components/Container";
import SingleFeedHeader from "components/headers/SingleFeedHeader";
import { userStore } from "../../zustand/userStore";
import FeedContent from "./FeedContent";
import { translationStore } from "../../zustand/translationStore";
import LoadingSpinner from "components/LoadingSpinner";
import FeedItemSkeleton from "components/skeletons/FeedItemSkeleton";

type Props = {};

const SingleFeedScreen = (props: Props) => {
  const token = userStore((state) => state.api_token);
  const translations = translationStore((state) => state.translations);
  const route = useRoute();
  const item: any = route.params;

  const { getSpecificFeed } = FeedService();
  const { data: specificFeed, isLoading } = useQuery({
    queryKey: ["specificFeed", item?.feedId],
    queryFn: () =>
      getSpecificFeed({ data: { feedId: item?.feedId }, token: token }),
    onSuccess: (data) => {
      console.log("getSpecificFeed success", data);
      if (item.fromMomentHeader) {
        item.setLike({
          isAlreadyLike: data?.is_liked,
          likeCount: data?.like?.total_likes,
        });
      }
    },
    onError: (error) => {
      console.log("getSpecificFeed error", error);
    },
  });

  return (
    <Container>
      <SingleFeedHeader title={translations.feed} />
      {isLoading ? (
        <FeedItemSkeleton />
      ) : (
        <>
          <CommentList
            workID={item?.feedId}
            isFromFeed={true}
            customHeaderComponent={
              <FeedContent
                data={specificFeed}
                like={item?.like}
                setLike={item?.setLike}
              />
            }
          />
          <CommentTextInput
            workID={item?.feedId}
            isFromFeed={true}
            keyboardAvoidBehavior="height"
          />
        </>
      )}
    </Container>
  );
};

export default SingleFeedScreen;
