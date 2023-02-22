import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import FeedItem from 'components/FeedItem'
import Container from 'components/Container'
import CommentList from 'features/commentList';
import CommentTextInput from 'components/CommentTextInput';

import { feedListData } from "data/feedListData";
import {useRoute} from "@react-navigation/native";

type Props = {}

const SingleFeedScreen = (props: Props) => {
	const route = useRoute();
	const item = route.params
	console.log(`TEST###`,item)
	return (
		<Container>
			<ScrollView>
				<FeedItem
					item={item}
				/>
				<CommentList />
			</ScrollView>
			<CommentTextInput keyboardAvoidingBehavior="height"/>
		</Container>
	)
}

export default SingleFeedScreen

const styles = StyleSheet.create({})
