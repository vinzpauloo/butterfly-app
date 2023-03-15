import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";
import { GLOBAL_COLORS } from "global";
import { feedListData } from "data/feedListData";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import UserService from "services/api/UserService";
import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import NoCacheMessage from "features/sectionList/components/NoCacheMessage";
import Loading from "components/Loading";
import { userStore } from "../../zustand/userStore";

type Props = {
	customerPictureURL: string;
	customerName: string;
};

const Customer = (props: Props) => {
	return (
		<Container>
			<VStack space={2} alignItems="center" m={6}>
				<Avatar source={{ uri: props.customerPictureURL }} />
				<Text style={styles.whiteText}>{props.customerName}</Text>
			</VStack>
		</Container>
	)
};

const FollowersScreen = () => {
	const route = useRoute<any>();
	let userID = route?.params?.userID

	// get specific content creators follower list
	const { getAllFollowerList } = UserService();
	const [currentPage, setCurrentPage] = useState(1);
	const [followerListData, setFollowerListData] = useState([]);
	const [lastPage, setLastPage] = useState(1);
	const token = userStore((state) => state.api_token);

	const { isLoading, refetch } = useQuery({
		queryKey: ["specificContentCreatorFollowerList", userID, currentPage],
		queryFn: () => getAllFollowerList({
			data: { user_id: userID, paginate: 20, page: currentPage },
			token: token
		}),
		onSuccess: (data) => {
			setFollowerListData((prev) => [...prev].concat(data?.data))
			setLastPage(data?.last_page);
		},
		onError: (error) => { console.log(error) },
	});

	const onScrollToEnd = () => {
		if (currentPage !== lastPage) {
			setCurrentPage((prev) => prev + 1)
		}
	}

	let numberOfRows = 1 + Math.floor(feedListData.length / 4)
	return (
		<View style={[styles.wrapper, { height: 139.5 * numberOfRows }]}>
			<FlashList
				estimatedItemSize={121}
				data={followerListData}
				numColumns={4}
				renderItem={({ item, index }: any) => <Customer customerPictureURL={item?.photo} customerName={item?.username} />}
				keyExtractor={(item, index) => "" + index}
				ListEmptyComponent={NoCacheMessage}
				ListFooterComponent={isLoading ? <Loading/> : <BottomMessage />}
				onEndReachedThreshold={0.1}
				onEndReached={onScrollToEnd}
			/>
		</View>
	);
};

export default FollowersScreen;

const styles = StyleSheet.create({
	followButton: {
		backgroundColor: GLOBAL_COLORS.secondaryColor,
		paddingVertical: 3,
		paddingHorizontal: 12,
		borderRadius: 3,
		marginLeft: "auto",
	},
	whiteText: {
		color: "white",
	},
	unfollowButton: {
		borderWidth: 1,
		borderColor: GLOBAL_COLORS.inactiveTextColor,
		paddingVertical: 3,
		paddingHorizontal: 4,
		borderRadius: 3,
		marginLeft: "auto",
	},
	unfollowText: {
		color: GLOBAL_COLORS.inactiveTextColor,
	},
	wrapper: {
		justifyContent: "space-between",
		flex: 1,
		backgroundColor: GLOBAL_COLORS.primaryColor
	},
});
