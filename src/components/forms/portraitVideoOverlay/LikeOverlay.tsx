import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GLOBAL_COLORS } from "global";

import Ionicons from "react-native-vector-icons/Ionicons";
import LikeService from 'services/api/LikeService';
import { useMutation } from '@tanstack/react-query';

type Props = {
	customerID: string
	videoID: string
	likes: number
}

const LikeOverlay = (props: Props) => {
	const [videoIsLiked, setVideoIsLiked] = useState(false);
	const [amountofLikes, setAmountofLikes] = useState(props.likes)

	const { likeWork, unlikeWork } = LikeService();
	const { mutate: mutateLikeVideo } = useMutation(likeWork, {
		onSuccess: (data) => {
			if (data?.isLike) {
				setAmountofLikes(prev => prev + 1)
				setVideoIsLiked(true)
			}
		},
		onError: (error) => { console.log(error) },
	});

	const { mutate: mutateUnlikeVideo } = useMutation(unlikeWork, {
		onSuccess: (data) => {
			if (data?.unLike) {
				setAmountofLikes(prev => prev - 1)
				setVideoIsLiked(false)
			}
		},
		onError: (error) => { console.log(error) },
	});

	function likeVideo() {
		mutateLikeVideo({
			site_id: 1,
			foreign_id: props.videoID,
			customer_id: props.customerID,
			type: "work"
		})
	}

	function unlikeVideo() {
		mutateUnlikeVideo({
			site_id: 1,
			foreign_id: props.videoID,
			customer_id: props.customerID,
			type: "work"
		})
	}

	return (
		<View style={styles.verticalBarItem}>
			<Pressable onPress={videoIsLiked ? unlikeVideo : likeVideo}>
				<Ionicons name="heart" color={videoIsLiked ? GLOBAL_COLORS.secondaryColor : "white"} size={40}
				/>
			</Pressable>
			<Text style={styles.iconText}>{amountofLikes}</Text>
		</View>
	)
}

export default LikeOverlay

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