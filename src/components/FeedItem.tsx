import React from 'react'
import { StyleSheet, Text, Pressable, Alert, Image, Dimensions } from 'react-native'
import { VStack, HStack, Avatar, Divider, Box, Flex } from 'native-base'
import { Video, ResizeMode } from 'expo-av';

import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";

import { globalStyle } from 'globalStyles'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

type Props = {
	userPictureURL: string
	userName: string
	tags: string []
	description: string
	location?: string
	// single picture landscape, 2, 3, 4 - 8, 9 portrait / grid picture, single landscape video, single portrait video
	addedContentType?: string
	addedContent?: { contentURL: string}[]
	totalComments: number
	totalLikes: number
	openComments: () => void
}

const FeedItem = (props: Props) => {
	const video = React.useRef(null);
	const navigation = useNavigation<any>();

	function goToPhotoGallery() {
		navigation.navigate("PhotoGallery",
			{
				postTitle: props.userName,
				imageList: props.addedContent,
				fromFeedItem: true
			})
	}
	
	return (
		<VStack p={4} space={2}>
			<HStack>
				<Pressable onPress={() => { Alert.alert("Go to " + props.userName + " profile") }}>
					<HStack space={2} style={styles.top}>
						<Avatar source={{ uri: props.userPictureURL }} size={28} />
						<Text style={styles.whiteText}>{props.userName }</Text>
					</HStack>
				</Pressable>
				<Pressable style={styles.privateMessageButton} onPress={()=> {Alert.alert("Send " + props.userName + " message")}}>
					<Text style={styles.privateMessageText}>私信</Text>
				</Pressable>
			</HStack>
			<HStack space={2}>
				{props.tags.map((tag, index) =>
					<Pressable key={index} onPress={()=>{Alert.alert("Go to " + tag + " tag page")}}>
						<Text style={styles.tags}>{tag}</Text>
					</Pressable>
				)}
			</HStack>
			<VStack space={2}>
				<Text style={styles.whiteText}>{props.description}</Text>
				{/* ADDED CONTENT HERE */}
				<Pressable onPress={ props.addedContentType === "picture" ? goToPhotoGallery : null}>
					<Flex wrap="wrap" direction="row">
						{props.addedContent.length > 0 ?
							props.addedContent.map((item, index) => 
								props.addedContentType === "picture" ?
									<Box
										key={index}
										style={
												props.addedContent.length === 1 ? styles.singleContent
													:props.addedContent.length % 3 === 0 ? styles.tripleContent
															:styles.doubleContent} m={0.5}>
										<Image style={styles.imageInBox} source={{ uri: item.contentURL, cache: 'only-if-cached' }} resizeMode={ResizeMode.COVER} />
									</Box>
									: props.addedContentType === "video" ?
										<Video
										key={index}
										ref = { video }
										style={styles.singleContent }
										source = {{uri: item.contentURL}}
										useNativeControls
										resizeMode={ResizeMode.STRETCH}
									/> : null
						): null } 
					</Flex>
				</Pressable>
				{props.location?
					<HStack style={styles.locationButton}>
						<Entypo name="location-pin" color={"#fff"} size={16} />
						<Text style={styles.whiteText}>{props.location}</Text>
					</HStack> : null}
			</VStack>
			<HStack style={styles.bottom}>
				<Pressable onPress={()=> Alert.alert("Share Post")}>
					<FontAwesome name="share-square-o" color={"#999"} size={16} />
				</Pressable>
				<Pressable onPress={() => props.openComments()}>
					<HStack space={1} style={styles.bottomIcon}>
						<Fontisto name="commenting" color={"#999"} size={16} />
						<Text style={styles.bottomText}>{props.totalComments}</Text>
					</HStack>
				</Pressable>
				<Pressable onPress={() => Alert.alert("Like Post")}>
					<HStack space={1} style={styles.bottomIcon}>
						<AntDesign name="hearto" color={"#999"} size={16} />
						<Text style={styles.bottomText}>{props.totalLikes}</Text>
					</HStack>
				</Pressable>
			</HStack>
			<Divider style={styles.divider} color='#999'/>
		</VStack>
	)
}

export default FeedItem

const styles = StyleSheet.create({
	top: {
		alignItems: "center",
	},
	whiteText: {
		color:"white"
	},
	privateMessageButton: {
		marginLeft: "auto"
	},
	privateMessageText: {
		color: "#999",
		borderWidth: 1,
		borderColor: "#999",
		paddingHorizontal: 4,
		marginLeft: "auto"
	},
	tags: {
		marginTop: 16,
		color: globalStyle.secondaryColor
	},
	locationButton: {
		alignItems: "center",
	},
	bottom: {
		marginTop: 16,
		paddingHorizontal: 16,
		justifyContent: "space-between"
	},
	bottomIcon: {
		alignItems:"center"
	},
	bottomText: {
		color: "#999",
		fontSize: 12
	},
	divider: {
		marginTop: 12
	},
	imageInBox: {
		width: "100%",
		height: "100%"
	},
	singleContent: {
		height: 200,
		width: "100%"
	},
	doubleContent: {
		height: (windowWidth / 2) - 20,
		width: (windowWidth / 2) - 20
	},
	tripleContent: {
		height: (windowWidth / 3) - 15,
		width: (windowWidth / 3) - 15
	},
})