import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useMutation } from "@tanstack/react-query";

import Ionicons from "react-native-vector-icons/Ionicons";
import CustomerService from "services/api/CustomerService";
import { userStore } from "../../../zustand/userStore";


type Props = {
	videoID: string
	customerID: string
}

const FavoriteOVerlay = (props: Props) => {
	const [videoIsFaved, setVideoIsFaved] = useState(false);
	const token = userStore((state) => state.api_token);

	const { favoriteVideo, unfavoriteVideo } = CustomerService();
	const { mutate: mutateAddToFavorite } = useMutation(favoriteVideo, {
		onSuccess: (data) => { if (data?.isFavorite) setVideoIsFaved(true) },
		onError: (error) => { console.log(error) },
	});

	const { mutate: mutateRemoveFromFavorite } = useMutation(unfavoriteVideo, {
		onSuccess: (data) => { if (data?.isRemoved?.response) setVideoIsFaved(false) },
		onError: (error) => { console.log(error) },
	});

	function addVideoToFavorite() {
		mutateAddToFavorite({
			data: { foreign_id: props.videoID },
			token: token
		});
	}

	function removeVideoFromFavorite() {
		mutateRemoveFromFavorite({
			data: { foreign_id: props.videoID },
			token: token
		});
	}

	return (
		<View style={styles.verticalBarItem}>
			<Pressable onPress={videoIsFaved ? removeVideoFromFavorite : addVideoToFavorite}>
				<Ionicons name="star" color={videoIsFaved ? "yellow" : "white"} size={40} />
			</Pressable>
			<Text style={styles.iconText}>Fave</Text>
		</View>
	)
}

export default FavoriteOVerlay

const styles = StyleSheet.create({
	verticalBarItem: {
		width: "100%",
		alignItems: "center",
	},
	iconText: {
		color: "white",
		textShadowColor: "black",
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 24,
	},
})