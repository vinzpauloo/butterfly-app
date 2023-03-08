import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import UserService from "services/api/UserService";
import DonateService from "services/api/DonateService";
import StickyTabs from "layouts/StickyTabs";
import Moment from "./tabs/Moment";
import Projects from "./tabs/Projects";
import Collection from "./tabs/Collection";
import SingleUserHeader from "components/headers/SingleUserHeader";

const SingleUserScreen = () => {
	const route = useRoute<any>();
	let userID = route?.params?.userID

	// get specific content creators name, cover photo, photo, note
	const { getSpecificContentCreator, getAllFollowerList, getFollowersCount, getDonatorsCount } = UserService();
	const { data } = useQuery({
		queryKey: ["specificContentCreator", userID],
		queryFn: () => getSpecificContentCreator({ user_id: userID }),
		onSuccess: () => { },
		onError: (error) => { alert(error) },
	});

	// get specific content creators follower count
	const [followerCount, setFollowerCount] = useState(0)
	const { } = useQuery({
		queryKey: ["specificContentCreatorFollowerCount", userID],
		queryFn: () => getFollowersCount({ user_id: userID }),
		onSuccess: (data) => { setFollowerCount(data) },
		onError: (error) => { alert(error) },
	});

	// get specific content creators follower count
	const [donatorCount, setDonatorCount] = useState(0)
	const { } = useQuery({
		queryKey: ["specificContentCreatorDonatorCount", userID],
		queryFn: () => getDonatorsCount({ user_id: userID }),
		onSuccess: (data) => { setDonatorCount(data.total_donators) },
		onError: (error) => { alert(error) },
	});

	// get specific content creators donators list (the first 5 for display purposes)
	const [donatorsList, setDonatorsList] = useState([])
	const { getDonatorsOfContentCreator } = DonateService();
	const { } = useQuery({
		queryKey: ["specificContentCreatorDonatorsList", userID],
		queryFn: () => getDonatorsOfContentCreator({ user_id: userID, paginate: 6 }),
		onSuccess: (data) => { setDonatorsList(data?.data) },
		onError: (error) => { alert(error) },
	});

	const tabsData = {
		Header: () =>
			<SingleUserHeader
				userID={userID}
				contentCreatorName={data?.username}
				profilePhotoURL={data?.photo}
				coverPhotoURL={data?.cover_photo}
				contentCreatorSlogan={data?.note}
				followerCount={followerCount}
				donatorCount={donatorCount}
				donatorList={donatorsList}
			/>,
		tabItems: [
			{
				name: "moment",
				label: "动态",
				Content: <Moment userID={userID} />,
			},
			{
				name: "projects",
				label: "作品",
				Content: <Projects userID={userID} />,
			},
			{
				name: "collection",
				label: "收藏",
				Content: <Collection userID={userID} />,
			},
		],
	};
	
	return <StickyTabs data={tabsData} />
}

export default SingleUserScreen;