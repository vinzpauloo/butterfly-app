import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, Pressable, Alert} from 'react-native'
import { VStack, Avatar, HStack, Divider } from "@react-native-material/core";

import { comments } from 'data/comments';
import BottomMessage from 'features/sectionList/components/BottomMessage';
import { globalStyle } from 'globalStyles';
import Fontisto from 'react-native-vector-icons/Fontisto';

type Props = {}

type commentItemProps = {
	userName: string
	comment: string
	userImgURL: string
	replies: {
		userName: string
		comment: string
		userImgURL: string
	}[]
}

const CommentItem = (props: commentItemProps) => {
	const [repliesIsShown, setrepliesIsShown] = useState(false)

	return (
		<HStack spacing={8}>
			<Pressable onPress={() => Alert.alert("go to " + props.userName + " profile")}>
				<Avatar label={props.userName} autoColor size={42} image={{ uri: props.userImgURL }} />
			</Pressable>
			<VStack spacing={4} ph={6} style={{ flex: 1 }}>
				<Text style={styles.whiteText}>{props.userName}</Text>
				<Text style={styles.whiteText}>{props.comment}</Text>
				<Pressable onPress={() => Alert.alert("reply to " + props.userName)}>
					<HStack spacing={6} style={styles.alignCenter}>
						<Fontisto name='commenting' color={globalStyle.inactiveTextColor} size={14} />
						<Text style={styles.secondaryText}>回复</Text>
					</HStack>
				</Pressable>
				<Pressable onPress={() => setrepliesIsShown(!repliesIsShown)}>
					{props.replies.length > 0 ? 
						<Text style={styles.secondaryColor}>查看 {props.replies.length} 则回复</Text>
					: null}
				</Pressable>
				<VStack spacing={12} mt={12} style={ repliesIsShown ? {display:"flex"} :  {display:"none"} }>
					{props.replies.map((reply, index) =>
						<HStack key={index} spacing={8}>
							<Pressable onPress={() => Alert.alert("go to " + reply.userName + " profile")}>
								<Avatar label={reply.userName} autoColor size={42} image={{ uri: reply.userImgURL }} />
							</Pressable>
							<VStack spacing={4} ph={6} style={{ flex: 1 }}>
								<Text style={styles.whiteText}>{reply.userName}</Text>
								<Text style={styles.whiteText}>{reply.comment}</Text>
							</VStack>
						</HStack>
					)}
				</VStack>
			</VStack>
		</HStack>
	)
}

const CommentList = (props: Props) => {
	return (
		<FlatList
			style={styles.commentsContainer}
			showsVerticalScrollIndicator={false}
			data={comments}
			ListHeaderComponent={<Text style={styles.commentHeader}>全部评论 {comments.length}</Text>}
			ListFooterComponent={<BottomMessage />}
			keyExtractor={(_, index) => "" + index}
			renderItem={({ item }) => <CommentItem userName={item.userName} userImgURL={item.userImgURL} comment={item.comment} replies={item.replies} />}
			ItemSeparatorComponent={() => <Divider color="#999" style={styles.divider} />}
		/>
	)
}

export default CommentList

const styles = StyleSheet.create({
	whiteText: {
		color: globalStyle.primaryTextColor
	},
	commentHeader: {
		color: globalStyle.primaryTextColor,
		marginBottom: 18
	},
	secondaryColor: {
		color: globalStyle.secondaryColor
	},
	secondaryText: {
		color: globalStyle.inactiveTextColor
	},
	alignCenter: {
		alignItems: "center"
	},
	divider: {
		marginVertical: 12
	},
	commentsContainer: {
		padding: 12
	}
})