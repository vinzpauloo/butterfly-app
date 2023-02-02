import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import cacheImage from "../../../assets/images/cacheImage.jpg"

type Props = {}

const NoCacheMessage = (props: Props) => {
	return (
		<View style={styles.noCacheContainer}>
			<Image source={cacheImage} style={styles.cacheImage} />
			<Text style={styles.cacheText}>抱歉， 没有找到你想要的内容~</Text>
		</View>
	)
}

export default NoCacheMessage

const styles = StyleSheet.create({
	noCacheContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 50
	},
	cacheImage: {
		width: 200,
		height: 200
	},
	cacheText: {
		color: 'white',
		fontSize: 14,
		marginTop: 20
	}
})