import React, { useEffect, useRef, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import CommentsService from "services/api/CommentsService";
import SingleVideoFeedComment from "./SingleVideoFeedComment";
import MomentFeedComment from "./MomentFeedComment";
import { commentGlobalStore } from "../../zustand/commentGlobalStore";
import { userStore } from "../../zustand/userStore";

type CommentListProps = {
  isFromFeed?: boolean;
  isFromSingleVideo?: boolean;
  workID: string;
  customHeaderComponent?: React.ReactComponentElement<any>;
};

const CommentList = (props: CommentListProps) => {
  const token = userStore((store) => store.api_token);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [startScroll, setStartScroll] = useState(true);
  const commentListRef = useRef<any>();
  const { getComments } = CommentsService();
  const { isLoading, data: dataComments } = useQuery({
    queryKey: ["workComments", props.workID, page],
    queryFn: () =>
      getComments({
        data: {
          foreign_id: props.workID,
          paginate: 10,
          type: "comments",
          page: page,
        },
        token: token,
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      if (isEnd) {
        setData((prev) => [...prev].concat(data.data));
        setIsEnd(false);
      } else {
        setData(data.data);
      }
    },
    onError: (error) => {
      alert(error);
    },
  });

  const reachEnd = () => {
    if (startScroll) return null;
    if (!isLoading) {
      if (lastPage !== page) {
        setIsEnd(true);
        setPage((prev) => prev + 1);
        setStartScroll(true);
      }
    }
  };

  // subscribe to comment global store
  const [setGlobalCommentListRef] = commentGlobalStore((state) => [
    state.setGlobalCommentListRef,
  ]);

  useEffect(() => {
    setGlobalCommentListRef(commentListRef);
    return () => {
      setGlobalCommentListRef(null);
    };
  }, []);

  return (
    <>
      {props.isFromSingleVideo ? (
        <SingleVideoFeedComment
          setStartScroll={setStartScroll}
          lastPage={lastPage}
          isLoading={isLoading}
          commentListRef={commentListRef}
          data={data}
          dataComments={dataComments}
          reachEnd={reachEnd}
          page={page}
        />
      ) : (
        <MomentFeedComment
          setStartScroll={setStartScroll}
          props={props}
          lastPage={lastPage}
          isLoading={isLoading}
          commentListRef={commentListRef}
          data={data}
          dataComments={dataComments}
          reachEnd={reachEnd}
          page={page}
        />
      )}
    </>
  );
};

export default CommentList;
