import React from 'react'
import { StyleSheet, Text, Pressable, Alert, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { Avatar, VStack } from 'native-base'


type Props = {
	userNames: {name: string, imgURL: string}[]
}

type UserProfilePicItem = {
	name: string
	imgURL: string
}

const UserProfilePicItem = (props: UserProfilePicItem) => {
	return (
		<Pressable style={styles.profPicItem} onPress={()=>{Alert.alert("Go to Profile " + props.name)}}>
			<VStack space={2} style={{alignItems:"center", maxWidth:60}}>
				<Avatar source={{ uri: props.imgURL }} />
				<Text style={styles.whiteText}>{props.name}</Text>
			</VStack>
		</Pressable>
	)
}

const UserProfilePicList = (props: Props) => {
	return (
		<View style={styles.wrapper}>
			<FlashList
				scrollEnabled={true}
				estimatedItemSize={83}
				numColumns={4}
				data={props.userNames}
				renderItem={({ item, index }) =>
						<UserProfilePicItem name={item.name} imgURL={item.imgURL} />}
				keyExtractor={(item, index) => "" + index}
			/>
		</View>
	)
}

export default UserProfilePicList

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: "space-between",
		minHeight: 430
	},
	whiteText: {
		color: "white"
	},
	profPicItem: {
		margin: 24
	}
})