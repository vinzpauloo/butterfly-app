import React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import { FlashList } from '@shopify/flash-list'


import { useNavigation, useRoute } from '@react-navigation/native';
import { globalStyle } from 'globalStyles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {}

const PhotoGallery = () => {
	const route = useRoute<any>();
	const imageList = route?.params.imageList
	
	return (
		<View style={styles.container}>
			{!!route?.params.fromFeedItem ?
				<FlashList
					pagingEnabled={true}
					horizontal={true}
					data={imageList}
					renderItem={({ item } : any) =>
						<View style={styles.imageContainer}>
							<Image style={[styles.postImage, styles.imageContained]} source={{ uri: item.contentURL }} />
						</View>}
					estimatedItemSize={12}
				/>
			
			:
				<FlashList
					data={imageList}
					renderItem={({ item } : any) =>
						<View style={styles.imageContainer}>
							<Image style={[styles.postImage, styles.imageCovered]} source={{ uri: item.imgUrl }} />
						</View>}
					estimatedItemSize={12}
				/>}
		</View>
	)
}

export default PhotoGallery

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: globalStyle.primaryColor,
	},
	imageContainer: {
		// backgroundColor:"red"
		justifyContent:"center"
	},
	postImage: {
		minHeight: windowHeight,
		minWidth: windowWidth,
	},
	imageCovered: {
		resizeMode: "cover",
	},
	imageContained: {
		resizeMode: "contain",
	}
})