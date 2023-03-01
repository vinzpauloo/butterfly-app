import React, { useEffect } from "react";
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
}

const CommentList = (props: CommentListProps) => {
	const { getComments } = CommentsService();
	const { isLoading, isError, data, error, status, refetch } = useQuery({
		queryKey: ["workComments", props.workID],
		queryFn: () => getComments({
			foreign_id: props.workID,
			skip: 0,
			limit: 10
		}),
		onSuccess: (data) => {
			console.log("=== commentlist fetched from backend! ===")
		},
		onError: (error) => {
			console.log("Error", error);
		},
		// enabled: isOpen,
	});

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

	return (
			<View style={styles.commentsContainer}>
				{isLoading ? <CommentListSkeleton/> :
					<FlashList
						removeClippedSubviews={true}
						estimatedItemSize={117}
						showsVerticalScrollIndicator={false}
						data={data?.comments}
						ListHeaderComponent={<Text style={styles.commentHeader}>全部评论 {data?.total_comments}</Text>}
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
					// WIP - add a pagination here, refetch with new skip + limit
					// onEndReachedThreshold={0.01}
					// onEndReached={() => alert("fetch a bunch of new ones")}
					/>
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
