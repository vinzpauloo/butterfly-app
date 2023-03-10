import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import FeedService from "services/api/FeedService";
import { useQuery } from "@tanstack/react-query";
import StickyTabFeeds from "features/feedsList/components/StickyTabFeeds";
import FeedList from "layouts/FeedList";

type Props = {};

const Moment = (props: Props) => {
	const route = useRoute<any>();
	const userID = route?.params?.userID

	const [page, setPage] = useState(1);
	const [data, setData] = useState([]);
	const [lastPage, setLastPage] = useState(1);
	const { getFeeds } = FeedService();
	const { isLoading } = useQuery({
		queryKey: ["specificContentCreatorFeeds", userID, page],
		queryFn: () =>
			getFeeds({
				user_id: userID,
				with: [`user`, `comment`, `like`].toString(),
				page: page,
			}),
		onSuccess: (data) => {
			setLastPage(data?.last_page);
			setData((prev) => [...prev].concat(data?.data))
		},
		onError: (error) => {
			console.log(`Error`, error);
		}
	})

	return (
		<StickyTabFeeds
			isLoading={isLoading}
			page={page}
			setPage={setPage}
			lastPage={lastPage}
			layout={<FeedList data={data} />}
		/>
	)
};

export default Moment;

const styles = StyleSheet.create({});
