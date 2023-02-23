import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { VStack } from 'native-base'
import { TEMPORARY_CUSTOMER_ID } from "react-native-dotenv";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserOverlay from './UserOverlay';
import LikeOverlay from './LikeOverlay';
import FavoriteOVerlay from './FavoriteOVerlay';
import DownloadOverlay from './DownloadOverlay';


type Props = {
	videoID: string
	userID: number
	userImage: string
	likes: number
	amountOfComments: number
	openComments: () => void
}

const RightOverlay = (props: Props) => {
	return (
		<VStack space={2} style={styles.verticalBar}>
			<UserOverlay customerID={TEMPORARY_CUSTOMER_ID} userID={props.userID} userImage={props.userImage} />
			<LikeOverlay customerID={TEMPORARY_CUSTOMER_ID} videoID={props.videoID} likes={props.likes} />
			<View style={styles.verticalBarItem}>
				<Pressable onPress={() => props.openComments()}>
					<MaterialCommunityIcons name="comment" color={"white"} size={40} />
				</Pressable>
				<Text style={styles.iconText}>{props.amountOfComments}</Text>
			</View>
			<FavoriteOVerlay customerID={TEMPORARY_CUSTOMER_ID} videoID={props.videoID} />
			<DownloadOverlay/>
		</VStack>
	)
}

export default RightOverlay

const styles = StyleSheet.create({
	verticalBar: {
		position: "absolute",
		right: 8,
		paddingBottom: 16,
		bottom: 0
	},
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