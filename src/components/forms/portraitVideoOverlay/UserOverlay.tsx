import React, { useState } from 'react'
import { Pressable, StyleSheet, Image, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useMutation } from "@tanstack/react-query";

import CustomerService from "services/api/CustomerService";
import Feather from "react-native-vector-icons/Feather";

type Props = {
	customerID: string
	userID: number
	userImage: string
}

const UserOverlay = (props: Props) => {
	const navigation = useNavigation<any>();
	const [isCreatorFollowed, setIsCreatorFollowed] = useState(false)

	const { followCreator, unfollowCreator } = CustomerService();
	const { mutate: mutateFollowCreator } = useMutation(followCreator, {
		onSuccess: (data) => { console.log(data) }, onError: (error) => { console.log(error) },
	});

	const { mutate: mutateUnfollowCreator } = useMutation(unfollowCreator, {
		onSuccess: (data) => { console.log(data) }, onError: (error) => { console.log(error) },
	});

	function followVideoCreator() {
		setIsCreatorFollowed(true)
		mutateFollowCreator({
			site_id: 1,
			user_id: props.userID,
			customer_id: props.customerID,
		});
	}

	function unfollowVideoCreator() {
		setIsCreatorFollowed(false)
		mutateUnfollowCreator({
			site_id: 1,
			user_id: props.userID,
			customer_id: props.customerID,
		});
	}

	return (
		<View style={styles.verticalBarItem}>
			<Pressable onPress={() => { navigation.navigate("SingleUser", { userID: props.userID }) }}>
				<Image style={styles.userLogo} source={{ uri: props.userImage }} />
			</Pressable>
			<Pressable style={styles.followButton} onPress={isCreatorFollowed ? unfollowVideoCreator : followVideoCreator}>
				<Feather name={isCreatorFollowed ? "check" : "plus"} color={"white"} size={16} />
			</Pressable>
		</View>
	)
}

export default UserOverlay

const styles = StyleSheet.create({
	verticalBarItem: {
		width: "100%",
		alignItems: "center",
	},
	userLogo: {
		width: 40,
		height: 40,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: "white",
	},
	followButton: {
		position: "relative",
		bottom: 12,
		backgroundColor: "red",
		borderRadius: 8,
	},
})