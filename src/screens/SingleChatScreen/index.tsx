import React from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import { HStack } from '@react-native-material/core';

import Container from 'components/Container';
import { globalStyle } from 'globalStyles';

import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

import { useRoute } from '@react-navigation/native';

type Props = {}

const SingleChatScreen = (props: Props) => {
	const route = useRoute<any>();
	const [inputTextValue, onChangeinputTextValue] = React.useState("");

	return (
		<Container>
			{/* WHEN THERE IS MESSAGE */}
			
			{/* WHEN THERE IS NO MESSAGE YET */}
			<View style={styles.centeredContent}>
				<Text style={styles.whiteText}>文明发言,才能触及彼岸珍惜每一位原创者</Text>
			</View>
			<Text style={[styles.whiteText, styles.smallText]}>请上拉刷新消息</Text>
			<HStack style={styles.bottomForm} justify={"between"}>
				<Pressable onPress={() => Alert.alert("Upload Photo")}>
					<Entypo name="camera" color={"white"} size={20} />
				</Pressable>
				<TextInput
					style={styles.textInput}
					value={inputTextValue}
					placeholder="请输入您的消息"
					placeholderTextColor="#999"
					keyboardType="default"
					onChangeText={onChangeinputTextValue}
				/>
				<Pressable onPress={() => Alert.alert("Send Message: " + inputTextValue)}>
					<Feather name="send" color={globalStyle.secondaryColor} size={20} />
				</Pressable>
			</HStack>
		</Container>
	)
}

export default SingleChatScreen

const styles = StyleSheet.create({
	centeredContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	smallText: {
		fontSize: 10,
		marginBottom: 8
	},
	whiteText: {
		color: globalStyle.primaryTextColor,
		textAlign: "center",
	},
	bottomForm: {
		padding: 12,
		alignItems: "center",
		backgroundColor: globalStyle.headerBasicBg,
	},
	textInput: {
		backgroundColor: "white",
		paddingHorizontal: 12,
		borderRadius: 16,
		width: 320,
	}
})