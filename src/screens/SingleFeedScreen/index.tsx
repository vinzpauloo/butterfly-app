import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import FeedItem from 'components/FeedItem'
import Container from 'components/Container'
import CommentList from 'features/commentList';
import CommentTextInput from 'components/CommentTextInput';

import { feedListData } from "data/feedListData";

type Props = {}

const SingleFeedScreen = (props: Props) => {
	return (
		<Container>
			<ScrollView>
				<FeedItem
					userPictureURL={feedListData[6].userPictureURL}
					userName={feedListData[6].userName}
					tags={feedListData[6].tags}
					description={feedListData[6].description}
					location={feedListData[6].location}
					addedContentType={feedListData[6].addedContentType}
					addedContent={feedListData[6].addedContent}
					totalComments={feedListData[6].totalComments}
					totalLikes={feedListData[6].totalLikes}
				/>
				<CommentList />
			</ScrollView>
			<CommentTextInput keyboardAvoidingBehavior="height"/>
		</Container>
	)
}

export default SingleFeedScreen

const styles = StyleSheet.create({})