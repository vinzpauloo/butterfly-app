import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { VStack, Avatar, HStack, Divider } from "@react-native-material/core";

import { comments } from 'data/comments';
import BottomMessage from 'features/sectionList/components/BottomMessage';

type Props = {}

type commentItemProps = {
	userName: string
	comment: string
	userImgURL: string
}

const CommentItem = (props: commentItemProps) => {
	return (
		<VStack spacing={6}>
			<HStack spacing={8}>
				<Avatar label={props.userName} autoColor size={42} image={{ uri: props.userImgURL }} />
				<VStack spacing={4} ph={6} style={{ flex: 1 }}>
					<Text style={styles.whiteText}>{props.userName}</Text>
					<Text style={styles.whiteText}>{props.comment}</Text>
				</VStack>
			</HStack>
		</VStack>
	)
}

const CommentList = (props: Props) => {
	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			data={comments}
			ListFooterComponent={<BottomMessage />}
			keyExtractor={(_, index) => "" + index}
			renderItem={({ item }) => <CommentItem userName={item.userName} userImgURL={item.userImgURL} comment={item.comment} />}
			ItemSeparatorComponent={() => <Divider color="#999" style={{ marginVertical: 12 }} />}
		/>
	)
}

export default CommentList

const styles = StyleSheet.create({
	whiteText: {
		color: "white"
	}
})