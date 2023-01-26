import React from 'react'
import { StyleSheet, View, ImageBackground, Text, Pressable, Alert } from 'react-native'
import { VStack, HStack } from '@react-native-material/core';
import { MasonryFlashList } from "@shopify/flash-list";

import { masonryImages } from 'data/masonryImages';
import Container from 'components/Container';

import { globalStyle } from "globalStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from '@react-navigation/native';

type Props = {}

type SingleImageProp = {
	url: string
	postTitle: string
	totalLikes: string
	height: number
}

const SingleImage = (props: SingleImageProp) => {
	const navigation = useNavigation<any>();
	const route = useRoute<any>();
	
	return (
		<Pressable onPress={() => { navigation.navigate("PhotoGallery", { postTitle: props.postTitle }) }}>
			<ImageBackground
				source={{ uri: props.url }}
				style={[styles.singleImage, {height: props.height}]}
				resizeMode="cover">
				<View style={styles.VIPTag}>
				<Text style={styles.VIPText}>VIP</Text>
				</View>
				<VStack style={styles.blackContainer}>
					<Text style={styles.whiteText}>{props.postTitle}</Text>
					<HStack spacing={4}>
						<MaterialCommunityIcons
							name="heart"
							color={globalStyle.secondaryColor}
							size={20}
						/>
						<Text style={styles.whiteText}>{props.totalLikes}</Text>
					</HStack>
				</VStack>
			</ImageBackground>
		</Pressable>
	)
}

const MasonryPhotos = (props: Props) => {
	return (
		<Container>
			<View style={styles.masonryContainer}>
				<MasonryFlashList
					data={masonryImages}
					numColumns={2}
					renderItem={({ item }) => <SingleImage url={item.imgURL} postTitle={item.postTitle} totalLikes={item.totalLikes} height={item.height} />}
					estimatedItemSize={25}
					keyExtractor={(item, index) => "" + index}
				/>
			</View>
		</Container>
	)
}

export default MasonryPhotos

const styles = StyleSheet.create({
	masonryContainer: {
		flex: 1,
	},
	singleImage: {
		margin: 4,
	},
	blackContainer: {
		marginTop: "auto",
		backgroundColor: "rgba(0,0,0, 0.5)",
		paddingHorizontal: 6,
	},
	whiteText: {
		color: "white",
	},
	VIPTag: {
		marginLeft: "auto",
		paddingHorizontal: 10,
		borderRadius: 4,
		backgroundColor: "red",
		margin: 4
	},
	VIPText: {
		color: "white",
		fontSize: 10,
		fontWeight: "bold"
	}
})