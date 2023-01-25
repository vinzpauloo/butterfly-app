import { Alert, Dimensions, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { Pressable, VStack, Avatar, HStack, Divider } from "@react-native-material/core";
import React from 'react'

type Props = {}

import { comments } from 'data/comments';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

type commentItemProps = {
	userName: string
	comment: string
}

const CommentItem = (props: commentItemProps) => {
	return (
		<VStack spacing={6}>
			<HStack spacing={8}>
				<Avatar label={props.userName} autoColor size={42} />
				<VStack spacing={4} ph={6} style={{ flex: 1 }}>
					<Text style={styles.whiteText}>{props.userName}</Text>
					<Text style={styles.whiteText}>{props.comment}</Text>
				</VStack>
			</HStack>
			<Divider color="gray" style={{ marginVertical: 6 }} />
		</VStack>
	)
}

const index = (props: Props) => {
	return (
		<>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={comments}
				ListFooterComponent={<Text style={styles.subText}>人家也是有底线的啦!</Text>}
				keyExtractor={( _, index) => "" + index}
				renderItem={({ item }) => <CommentItem userName={item.userName} comment={item.comment} />}
			/>
			<TextInput
				style={styles.textInput}
				cursorColor={"white"}
				placeholder="发表评论"
				placeholderTextColor="white"
				keyboardType="default" />
			<Pressable onPress={() => { Alert.alert("Add comment") }}>
				<Text style={styles.submitCommentText}>确定</Text>
			</Pressable>
		</>
	)
}

export default index

const styles = StyleSheet.create({
	whiteText: {
		color: "white"
	},
	textInput: {
		color: "white",
		backgroundColor: "#262632",
		position: "absolute",
		bottom: 0,
		padding: 12,
		width: windowWidth
	},
	subText: {
		color: "#999",
		textAlign: "center",
		marginVertical: 6,
		marginBottom: 48,
	},
	submitCommentText: {
		color: "white",
		position: "absolute",
		bottom: 0,
		right: 0 
	}
})