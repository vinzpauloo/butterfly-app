import React from 'react'
import { StyleSheet, FlatList } from 'react-native'

import Container from 'components/Container'
import FeedItem from 'components/FeedItem'
import { feedListData } from 'data/feedListData'

type Props = {}

const FeedList = (props: Props) => {
	return (
		<Container>
			<FlatList
				data={feedListData}
				renderItem={({ item }) => 
					<FeedItem
						userPictureURL={item.userPictureURL}
						userName={item.userName}
						tags={item.tags}
						description={item.description}
						location={item.location}
						addedContentType={item.addedContentType}
						addedContent={item.addedContent}
						totalComments={item.totalComments}
						totalLikes={item.totalLikes}
					/>}
				keyExtractor={(item, index) => "" + index}
			/>
		</Container>
	)
}

export default FeedList

const styles = StyleSheet.create({})