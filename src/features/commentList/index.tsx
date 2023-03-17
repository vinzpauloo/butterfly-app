import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "native-base";
import { FlashList } from "@shopify/flash-list";

import CommentItem from "components/CommentItem";
import BottomMessage from "components/BottomMessage";
import CommentsService from "services/api/CommentsService";
import CommentListSkeleton from "../../components/skeletons/CommentListSkeleton";
import FeedItemSkeleton from "components/skeletons/FeedItemSkeleton";

import { GLOBAL_COLORS } from "global";
import { useQuery } from "@tanstack/react-query";
import { commentGlobalStore } from "../../zustand/commentGlobalStore";
import Loading from "components/Loading";
import { userStore } from "../../zustand/userStore";

type CommentListProps = {
	isFromFeed?: boolean
	workID: string
	customHeaderComponent?: React.ReactComponentElement<any>
}

const CommentList = (props: CommentListProps) => {
	const token = userStore((store) => store.api_token);
	
	const [amountOfCommentsToGet, setAmountOfCommentsToGet] = useState(10);
	const commentListRef = useRef<any>()
	const { getComments } = CommentsService();
	const { isLoading, data, isRefetching } = useQuery({
    queryKey: ["workComments", props.workID, amountOfCommentsToGet],
		queryFn: () => getComments({
			data: {
				foreign_id: props.workID,
				paginate: amountOfCommentsToGet,
				type: "comments",
			},
			token: token
		}),
		onSuccess: () => {
			console.log("=== commentlist fetched from backend! ===")
		},
		onError: (error) => {
			alert(error);
		},
	});

	const onScrollToEnd = () => {
    if (data?.next_page_url !== null) setAmountOfCommentsToGet((prev) => prev + 10)
	}

	// subscribe to comment global store
	const [setGlobalCommentListRef] = commentGlobalStore((state) => [state.setGlobalCommentListRef])

	useEffect(() => {
		setGlobalCommentListRef(commentListRef)
		return () => { setGlobalCommentListRef(null) }
	},[])
	
	return (
		<View style={styles.commentsContainer}>
			{amountOfCommentsToGet === 10 && isLoading ? 
				props.isFromFeed ? 
				<>
						<FeedItemSkeleton />
						<CommentListSkeleton />
				</>
					: <CommentListSkeleton /> 
				:
				<>
					<FlashList
						ref={commentListRef}
						removeClippedSubviews={true}
						estimatedItemSize={117}
						showsVerticalScrollIndicator={false}
						data={data?.data}
						ListHeaderComponent={<>{props.customHeaderComponent}<Text style={styles.commentHeader}>全部评论 {data?.total}</Text></>}
						ListFooterComponent={data?.next_page_url === null ? <BottomMessage /> : null}
						keyExtractor={(_, index) => "" + index}
						renderItem={({ item }: any) => (
							<CommentItem
								commentID={item.comment_id}
								comment={item.comment}
								username={item.username}
								photo={item.photo}
								replies={item.replies}
							/>)}
						ItemSeparatorComponent={() => <Divider color="#999" style={styles.divider} />}
						onEndReachedThreshold={0.1}
						onEndReached={onScrollToEnd}
					/>
					{/* Loading has to be here else its too fast on ListFooterComponent */}
					{(isLoading || isRefetching) && amountOfCommentsToGet > 10 ? <Loading /> : null}
				</>
			}
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
});
