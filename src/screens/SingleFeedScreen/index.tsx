import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import FeedItem from 'components/FeedItem'
import Container from 'components/Container'
import CommentList from 'features/commentList';

import {useRoute} from "@react-navigation/native";
import {Feeds} from "hooks/useFeeds";
import {useQuery} from "@tanstack/react-query";
import FeedItemSkeleton from "../../components/skeletons/FeedItemSkeleton";

type Props = {}

const SingleFeedScreen = (props: Props) => {
	const route = useRoute();
	const item: any = route.params

	const {getSpecificFeed} = Feeds();
	const {data: specificFeed, isLoading} = useQuery({
		queryKey: ["specificFeed", item?.feedId],
		queryFn: () => getSpecificFeed(item?.feedId),
		onSuccess: (data) => {
			console.log("=== specifc feed fetched from backend! ===")
		},
		onError: (error) => {
			//
		}
	})

	return (
		<Container>
			<ScrollView>
				{isLoading ? (
					<FeedItemSkeleton/>
				):(
					<FeedItem item={specificFeed} />
				)}
				<CommentList workID={item?.feedId} isFromFeed={true} />
			</ScrollView>
		</Container>
	)
}

export default SingleFeedScreen

const styles = StyleSheet.create({})
