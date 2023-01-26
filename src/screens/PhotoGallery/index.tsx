import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { photoGalleryImages } from 'data/photoGalleryImages'

type Props = {}

const PhotoGallery = () => {
	return (
		<View style={styles.container}>
			<FlashList
				data={photoGalleryImages}
				renderItem={({ item }) => <Image
					style={styles.postImage}
					source={{
						uri: item.imgUrl,
					}}
				/>}
				estimatedItemSize={12}
			/>
		</View>
	)
}

export default PhotoGallery

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	postImage: {
		minHeight: 750,
		resizeMode: "cover",
	}
})