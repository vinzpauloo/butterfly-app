import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "native-base";
import { FlashList } from "@shopify/flash-list";

import CommentItem from "components/CommentItem";
import BottomMessage from "components/BottomMessage";
import CommentsService from "services/api/CommentsService";
import CommentListSkeleton from "../../components/skeletons/CommentListSkeleton";

import { commentGlobalStore } from "../../zustand/commentGlobalStore"

import { GLOBAL_COLORS } from "global";
import { useQuery } from "@tanstack/react-query";

type CommentListProps = {
	isFromFeed?: boolean
	workID: string
	customHeaderComponent?: React.ReactComponentElement<any>
}

const CommentList = (props: CommentListProps) => {
	// PAGINATION WIP
	// const [hasNextPage, setHasNextPage] = useState(false);
	// const [commentPage, setCommentPage] = useState(1);
	// const [data, setData] = useState([]);
	// const [totalComments, setTotalComments] = useState(0);

	const { getComments } = CommentsService();
	const { isLoading, refetch, data } = useQuery({
		queryKey: ["workComments", props.workID],
		queryFn: () => getComments({
			foreign_id: props.workID,
			paginate: 30,
			type: "comments",
			page: 1,
			// comment_id: 6c69d875-3a1e-4a6b-a290-62cd5917629d (if reply)
		}),
		onSuccess: (data) => {
			console.log("=== commentlist fetched from backend! ===")

			// PAGINATION WIP
			// setData((prev) => [...prev].concat(data?.data));
			// setTotalComments(data?.total)
			// data?.next_page_url ? setHasNextPage(true) : setHasNextPage(false)
		},
		onError: (error) => {
			console.log("Error", error);
		},
		// enabled: isOpen,
	});

	// this should be inside comment text input (WIP)
	// subscribe to comment global store
	const [setGlobalTextInputRef, setIsOnReplyMode, setUserNameToReplyTo, setCommentIDToReplyTo] = commentGlobalStore(
		(state) => [state.setGlobalTextInputRef, state.setIsOnReplyMode, state.setUserNameToReplyTo, state.setCommentIDToReplyTo],
	)

	useEffect(() => {
		return () => {
			// reset the comment global store on unmount of comment list
			setGlobalTextInputRef(null)
			setIsOnReplyMode(false)
			setUserNameToReplyTo("")
			setCommentIDToReplyTo("")
		}
	},[])
	
	function commentListHasReachedEnd() {
		console.log("fetch new comments")

		// PAGINATION WIP
		// if (hasNextPage) { setCommentPage((prev) => prev + 1); refetch() }
	}

	return (
		<View style={styles.commentsContainer}>
			{isLoading ? <CommentListSkeleton/> :
				<FlashList
					removeClippedSubviews={true}
					estimatedItemSize={117}
					showsVerticalScrollIndicator={false}
					data={data?.data}
					ListHeaderComponent={<>{props.customHeaderComponent}<Text style={styles.commentHeader}>全部评论 {data?.total}</Text></>}
					ListFooterComponent={<BottomMessage />}
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
					onEndReachedThreshold={0.01}
					onEndReached={commentListHasReachedEnd}
				/>}
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
