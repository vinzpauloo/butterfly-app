import React from 'react'
import { StyleSheet, FlatList, Text, Pressable, Alert } from 'react-native'
import { Avatar, VStack } from '@react-native-material/core'

type Props = {
	userNames: {name: string, imgURL: string}[]
}

type UserProfilePicItem = {
	name: string
	imgURL: string
}

const UserProfilePicItem = (props: UserProfilePicItem) => {
	return (
		<Pressable onPress={()=>{Alert.alert("Go to Profile " + props.name)}}>
			<VStack spacing={4} style={{alignItems:"center", maxWidth:60}}>
				<Avatar label={props.name} autoColor={true} image={{ uri: props.imgURL }} />
				<Text style={styles.whiteText}>{props.name}</Text>
			</VStack>
		</Pressable>
	)
}

const UserProfilePicList = (props: Props) => {
	return (
		<FlatList
			scrollEnabled={true}
			columnWrapperStyle={styles.wrapper}
			numColumns={4}
			data={props.userNames}
			renderItem={({ item, index }) => <UserProfilePicItem name={item.name} imgURL={item.imgURL} />}
			keyExtractor={(item, index) => "" + index}
		/>
	)
}

export default UserProfilePicList

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: "space-between",
		margin: 24,
	},
	whiteText: {
		color: "white"
	}
})