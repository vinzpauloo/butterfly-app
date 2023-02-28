import { Alert, Pressable, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { GLOBAL_COLORS } from 'global';
import { HStack, Avatar, VStack } from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';

type repliesDataType = {
	replyId: string;
	customerId: string;
	username: string;
	photo: string;
	comment: string;
};

type commentItemProps = {
	customerId: string;
	comment: string;
	username: string;
	photo: string;
	replies: repliesDataType[];
};

const CommentItem = (props: commentItemProps) => {
	const [repliesIsShown, setrepliesIsShown] = useState(false);
	const [amountOfCommentShown, setAmountOfCommentShown] = useState(10);

	return (
		<HStack space={2}>
			<Pressable onPress={() => Alert.alert("go to " + props.username + " profile")}>
				<Avatar size={42} source={{ uri: props.photo }} />
			</Pressable>
			<VStack space={1} style={{ flex: 1, paddingHorizontal: 6 }}>
				<Text style={styles.whiteText}>{props.username}</Text>
				<Text style={styles.whiteText}>{props.comment}</Text>
				<Pressable onPress={() => Alert.alert("reply to " + props.username)}>
					<HStack space={1.5} alignItems="center">
						<Fontisto
							name="commenting"
							color={GLOBAL_COLORS.inactiveTextColor}
							size={14}
						/>
						<Text style={styles.secondaryText}>回复</Text>
					</HStack>
				</Pressable>
				<Pressable onPress={() => { setrepliesIsShown(!repliesIsShown) }}>
					{props?.replies?.length > 0 ? (
						<Text style={styles.secondaryColor}>
							查看 {props?.replies?.length} 则回复
						</Text>
					) : null}
				</Pressable>
				<VStack space={4} mt={8} style={repliesIsShown ? { display: "flex" } : { display: "none" }}>
					{props?.replies?.slice(0, amountOfCommentShown).map((reply, index) => (
						<HStack space={2} key={index}>
							<Pressable onPress={() => Alert.alert("go to " + reply?.username + " profile")}>
								<Avatar size={42} source={{ uri: reply?.photo }} />
							</Pressable>
							<VStack space={1} style={{ flex: 1, paddingHorizontal: 6 }}>
								<Text style={styles.whiteText}>{reply?.username}</Text>
								<Text style={styles.whiteText}>{reply.comment}</Text>
							</VStack>
						</HStack>
					))}
					{props?.replies?.length >= 10 &&
						amountOfCommentShown < props?.replies?.length ? (
						<Pressable onPress={() => setAmountOfCommentShown(amountOfCommentShown + 10)}>
							<Text style={styles.loadMoreComments}>更多裝載</Text>
						</Pressable>
					) : null}
				</VStack>
			</VStack>
		</HStack>
	);
};
export default CommentItem

const styles = StyleSheet.create({
	whiteText: {
		color: GLOBAL_COLORS.primaryTextColor,
	},
	secondaryColor: {
		color: GLOBAL_COLORS.secondaryColor,
	},
	secondaryText: {
		color: GLOBAL_COLORS.inactiveTextColor,
	},
	loadMoreComments: {
		textAlign: "center",
		color: GLOBAL_COLORS.inactiveTextColor,
	},
})