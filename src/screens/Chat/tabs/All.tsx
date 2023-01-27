import React from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'

import Container from 'components/Container'
import UserProfilePicList from 'features/sectionList/components/UserProfilePicList'
import BottomMessage from 'features/sectionList/components/BottomMessage'

import { allChatCategories } from "data/allChatCategories"

type Props = {}

const All = (props: Props) => {
	return (
		<Container>
			<FlatList
				data={allChatCategories}
				scrollEnabled={true}
				renderItem={({ item, index }) =>
					<>
						<Text style={styles.categoryText}>{item.categoryName}</Text>
						<UserProfilePicList userNames={item.usersData} />
					</>}
				keyExtractor={(item, index) => "" + index}
				ListFooterComponent={<BottomMessage />}
			/>				
		</Container>
	)
}

export default All

const styles = StyleSheet.create({
	categoryText: {
		color: "white",
		borderLeftColor: "#e15655",
		borderLeftWidth: 4,
		paddingLeft: 12,
		marginTop: 12
	},
})