import React from 'react'
import { StyleSheet, Image, Pressable, Alert } from 'react-native'
import { bannerAdsInfo } from 'data/bannerAdsInfo'

type Props = {}

const BannerAds = (props: Props) => {
	return (
		<Pressable onPress={() => { Alert.alert("Go to: " + bannerAdsInfo.externalLinkURL) }}>
			<Image
				style={styles.bannerAds}
				source={{ uri: bannerAdsInfo.imgURL }}
				resizeMode={"cover"}
			/>
		</Pressable>
	)
}

export default BannerAds

const styles = StyleSheet.create({
	bannerAds: {
		height: 100,
	},
})