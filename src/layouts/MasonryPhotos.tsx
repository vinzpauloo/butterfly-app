import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { MasonryFlashList } from "@shopify/flash-list";

import { masonryImages } from 'data/masonryImages';

import Container from 'components/Container';


type Props = {}

type SingleImageProp = {
	url: string
}

const SingleImage = (props: SingleImageProp) => {
	return (
		<Image
			source={{ uri: props.url }}
			style={styles.singleImage}
			resizeMode="cover"
		/>
	)
}

const MasonryPhotos = (props: Props) => {
	return (
		<Container>
			<View style={styles.masonryContainer}>
				<MasonryFlashList
					data={masonryImages}
					numColumns={2}
					renderItem={({ item }) => <SingleImage url={item.imgURL} />}
					estimatedItemSize={25}
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
		height: 250,
		margin: 6,
	},
})