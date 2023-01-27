import React from 'react'
import { StyleSheet, Text, Pressable, Alert, FlatList, Dimensions } from 'react-native'
import { VStack, Box, HStack, Avatar } from "@react-native-material/core";

import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Container from 'components/Container'
import BottomMessage from 'features/sectionList/components/BottomMessage';

import { messageList } from 'data/messageList';

const windowWidth = Dimensions.get('window').width;

type MessageItemProps = {
	userName: string
	message: string
	imgURL: string
}

type Props = {}

const MessageItem = (props: MessageItemProps) => {
	return (
		<VStack style={styles.messageContainer}>
			<Pressable onPress={() => { Alert.alert("View Message from " + props.userName) }}>
				<HStack spacing={12}>
					<Pressable onPress={() => { Alert.alert("Go to " + props.userName + " profile") }}>
						<Avatar label="Tang Xin" color='white' size={42} image={{ uri: props.imgURL }} />
					</Pressable>
					<VStack spacing={4}>
						<Text style={[styles.text,{maxWidth: windowWidth - 110}]}>{props.userName}</Text>
						<Text style={[styles.text,{maxWidth: windowWidth - 110}]}>{props.message}</Text>
					</VStack>
					<Pressable onPress={() => { Alert.alert("Delete Message from " + props.userName) }} style={styles.deleteIcon}>
						<MaterialCommunityIcons name="delete-outline" color={"white"} size={24} />
						{/* <Text style={styles.text}>删除</Text> */}
					</Pressable>
				</HStack>
			</Pressable>
		</VStack>
	)
}

const Information = (props: Props) => {
	return (
		<Container>
			<HStack spacing={12} style={styles.optionsList}>
				<Pressable onPress={() => { Alert.alert("Open Fans Screen") }}>
					<VStack spacing={6}>
						<Box style={styles.box}>
							<Feather name="heart" color={"white"} size={24} />
						</Box>
						<Text style={styles.centerText}>粉丝</Text>
					</VStack>
				</Pressable>
				<Pressable onPress={() => { Alert.alert("Open Likes Screen") }}>
					<VStack spacing={6}>
						<Box style={styles.box}>
							<AntDesign name="like2" color={"white"} size={24} />
						</Box>
						<Text style={styles.centerText}>点赞</Text>
					</VStack>
				</Pressable>
				<Pressable onPress={() => { Alert.alert("Open Comments Screen") }}>
					<VStack spacing={6}>
						<Box style={styles.box}>
							<FontAwesome name="comment-o" color={"white"} size={24} />
						</Box>
						<Text style={styles.centerText}>评论</Text>
					</VStack>
				</Pressable>
				<Pressable onPress={() => { Alert.alert("Open Earnings Screen") }}>
					<VStack spacing={6}>
						<Box style={styles.box}>
							<Fontisto name="money-symbol" color={"white"} size={24} />
						</Box>
						<Text style={styles.centerText}>收益</Text>
					</VStack>
				</Pressable>
				<Pressable onPress={() => { Alert.alert("Open System Screen") }}>
					<VStack spacing={6}>
						<Box style={styles.box}>
							<Octicons name="gear" color={"white"} size={24} />
						</Box>
						<Text style={styles.centerText}>系统</Text>
					</VStack>
				</Pressable>
			</HStack>
			<Text style={styles.categoryText}>私信列表</Text>
			<FlatList
				data={messageList}
				scrollEnabled={true}
				renderItem={({ item, index }) => <MessageItem userName={item.userName} message={item.message} imgURL={item.imgURL} />}
				keyExtractor={(item, index) => "" + index}
				ListFooterComponent={<BottomMessage />}
			/>	
		</Container>
	)
}

export default Information

const styles = StyleSheet.create({
	optionsList: {
		paddingVertical: 24,
		paddingHorizontal: 24,
		justifyContent: "space-between"
	},
	box: {
		padding: 8,
		borderWidth: 1,
		borderColor: "white",
	},
	centerText: {
		color: "white",
		textAlign: "center"
	},
	categoryText: {
		color: "white",
		borderLeftColor: "#e15655",
		borderLeftWidth: 4,
		paddingLeft: 12,
		marginTop: 12
	},
	text: {
		color: "white",
	},
	deleteIcon: {
		alignSelf: "center",
		marginLeft: "auto"
	},
	messageContainer: {
		backgroundColor: "#262632",
		marginTop: 12,
		padding: 12,
	},
	dividerColor: {
		backgroundColor: "#999"
	}
})