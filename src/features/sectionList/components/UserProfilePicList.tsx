import React from 'react'
import { StyleSheet, FlatList, Text, Pressable, Alert } from 'react-native'
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
		<Pressable onPress={()=>{Alert.alert("Go to Profile " + props.name)}}>
			<VStack space={2} style={{alignItems:"center", maxWidth:60}}>
				<Avatar source={{ uri: props.imgURL }} />
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