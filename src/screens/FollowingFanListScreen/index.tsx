import React, { useState } from 'react'
import { StyleSheet, Text, Pressable, FlatList, Alert } from 'react-native'
import { Avatar, HStack, } from 'native-base'
import { useRoute } from '@react-navigation/native'

import Container from 'components/Container'
import NoCacheMessage from 'features/sectionList/components/NoCacheMessage'

import { globalStyle } from 'globalStyles'
import { feedListData } from "data/feedListData";

type Props = {
	isFetchingFollowingList?: boolean
	isFetchingFansList? : boolean
}

type UserProps = {
	userPictureURL: string
	userName: string
}

const User = (props: UserProps) => {
	const [isFollowed, setIsFollowed] = useState(false)

	return (
		<HStack alignItems="center" space={2} p={4}>
			<Pressable onPress={()=> Alert.alert("Go to " + props.userName + " profile")}>
				<Avatar source={{ uri: props.userPictureURL }} size={30} />
			</Pressable>
			<Text style={styles.text}>{ props.userName }</Text>
			{isFollowed ?
				<Pressable style={styles.unfollowButton} onPress={() => setIsFollowed(false)}>
					<Text style={styles.unfollowText}>己关注</Text>
				</Pressable>
				:
				<Pressable style={styles.followButton} onPress={() => setIsFollowed(true)}>
					<Text style={styles.text}>关注</Text>
				</Pressable>
			}
		</HStack>
	)
}

const UsersList = (props: Props) => {
	
	function fetchFansList() {
		return feedListData
	}

	function fetchFollowingList() {
		return feedListData
	}

	const UsersData =
		props.isFetchingFansList ? fetchFansList() :
			props.isFetchingFollowingList ? fetchFollowingList() : null 

	return (
		<FlatList
			data={UsersData}
			renderItem={({ item, index }) =>
				<User
					userPictureURL={item.userPictureURL}
					userName={item.userName}
				/>}
			keyExtractor={(item, index) => "" + index}
			ListEmptyComponent={NoCacheMessage}
		/>
	)
}

const FollowingFanListScreen = () => {
	const route = useRoute<any>();
	
	return (
		<Container>
			<UsersList
				isFetchingFollowingList={route?.params.isFetchingFollowingList}
				isFetchingFansList={route?.params.isFetchingFansList}
			/>
		</Container>
	)
}

export default FollowingFanListScreen

const styles = StyleSheet.create({
	followButton: {
		backgroundColor: globalStyle.secondaryColor,
		paddingVertical: 3,
		paddingHorizontal: 12,
		borderRadius: 3,
		marginLeft:"auto"
	},
	text: {
		color:"white"
	},
	unfollowButton: {
		borderWidth: 1,
		borderColor: globalStyle.inactiveTextColor,
		paddingVertical: 3,
		paddingHorizontal: 4,
		borderRadius: 3,
		marginLeft: "auto"
	},
	unfollowText: {
		color: globalStyle.inactiveTextColor
	}
})