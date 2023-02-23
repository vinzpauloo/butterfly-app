import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { downloadFile } from "utils/downloadFile";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {}

const DownloadOverlay = (props: Props) => {
	function testDownload() {
		const fileName = "test-file-name"
		alert("start downloading!")
		downloadFile('http://techslides.com/demos/sample-videos/small.mp4', fileName)
	}
	
	return (
		<View style={styles.verticalBarItem}>
			<Pressable onPress={testDownload}>
				<MaterialCommunityIcons name="download" color={"white"} size={40} />
			</Pressable>
			<Text style={styles.iconText}>DL</Text>
		</View>
	)
}

export default DownloadOverlay

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