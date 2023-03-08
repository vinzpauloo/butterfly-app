import { ImageBackground, Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { GLOBAL_COLORS } from 'global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CustomerService from 'services/api/CustomerService';
import { useMutation } from '@tanstack/react-query';
import { userStore } from "../../zustand/userStore";

type Props = {
	userID: number
	contentCreatorName: string
	profilePhotoURL: string
	coverPhotoURL: string
	contentCreatorSlogan: string
	followerCount: number
	donatorCount: number
	donatorList: any[]
};

const SingleUserHeader = (props: Props) => {
	const navigation = useNavigation<any>();
	const [isCreatorFollowed, setIsCreatorFollowed] = useState(false)
	const token = userStore((state) => state.api_token);

	const { followCreator, unfollowCreator } = CustomerService();
	const { mutate: mutateFollowCreator } = useMutation(followCreator, {
		onSuccess: (data) => { if (data?.isFollowed) setIsCreatorFollowed(true) }, onError: (error) => { console.log(error) },
	});

	const { mutate: mutateUnfollowCreator } = useMutation(unfollowCreator, {
		onSuccess: (data) => { if (data?.isUnfollowed) setIsCreatorFollowed(false) }, onError: (error) => { console.log(error) },
	});

	function goToFollowingScreen() {
		navigation.navigate("FollowingFanListScreen", {
			postTitle: "关注",
			isFetchingFollowingList: true,
		})
	}

	function goToFansScreen() {
		navigation.navigate("FollowingFanListScreen", {
			postTitle: "粉丝",
			isFetchingFansList: true,
		})
	}

	function followContentCreator() {
		mutateFollowCreator({
			user_id: { user_id: props.userID },
			token: token,
		});
	}

	function unfollowContentCreator() {
		mutateUnfollowCreator({
			user_id: { user_id: props.userID },
			token: token,
		});
	}

	return (
		<>
			<ImageBackground source={{ uri: props.coverPhotoURL }} resizeMode="cover">
				<View style={styles.bannerContent}>
					<Ionicons name="chevron-back" color="#fff" size={30} style={styles.backIcon} onPress={() => navigation.goBack()} />
					<Ionicons name="md-chatbox-ellipses-outline" color="#fff" size={35} style={styles.messageIcon} onPress={() => alert("you need VIP to message")} />
					<Image source={{ uri: props.profilePhotoURL }} style={styles.profileImg} />
					<View style={styles.usernameContainer}>
						<View style={styles.usernameContent}>
							<Text style={styles.usernameText}>{props.contentCreatorName}</Text>
							<Text style={styles.usernameUp}>UP</Text>
						</View>
						<Pressable style={isCreatorFollowed ? styles.unfollowBtn : styles.followBtn} onPress={isCreatorFollowed ? unfollowContentCreator : followContentCreator}>
							<Text style={styles.followText}>{isCreatorFollowed ? "己关注" : "关注"}</Text>
						</Pressable>
					</View>
					<Text style={styles.description}>{props.contentCreatorSlogan}</Text>
					<View style={styles.summaryContainer}>
						<Pressable onPress={goToFollowingScreen} style={styles.summaryContent}>
							<Text style={styles.summaryNumber}>TBD</Text>
							<Text style={styles.summaryText}>关注</Text>
						</Pressable>
						<Pressable onPress={goToFansScreen} style={styles.summaryContentMiddle}>
							<Text style={styles.summaryNumber}>{props.followerCount}</Text>
							<Text style={styles.summaryText}>粉丝</Text>
						</Pressable>
						<View style={styles.summaryContent}>
							<Text style={styles.summaryNumber}>TBD</Text>
							<Text style={styles.summaryText}>获赞</Text>
						</View>
					</View>
				</View>
			</ImageBackground>
			<View style={styles.donatorContainer}>
				<View style={styles.profilesImagesContent}>
					{props.donatorList.map((item, index) => (
						<Image source={{ uri: item?.customer?.photo }} style={[styles.profileImgs, { zIndex: index, left: index * 15 }]} />
					))}
				</View>
				<View style={styles.buttons}>
					<Text style={styles.donateText}>{props.donatorCount}人打赏</Text>
					<Pressable style={styles.donateBtn} onPress={() => alert("Donate to user")}>
						<Text style={styles.donateText}>打赏</Text>
					</Pressable>
				</View>
			</View>
		</>
	);
}

export default SingleUserHeader

const styles = StyleSheet.create({
	bannerContent: {
		backgroundColor: "rgba(0,0,0, 0.5)",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 16,
	},
	backIcon: {
		position: "absolute",
		left: 10,
		top: 10,
	},
	messageIcon: {
		position: "absolute",
		right: 10,
		top: 10,
		transform: [{ scaleX: -1 }],
	},
	profileImg: {
		height: 60,
		width: 60,
		borderRadius: 30,
		borderWidth: 2,
		borderColor: GLOBAL_COLORS.secondaryColor,
	},
	usernameContainer: {
		position: "relative",
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
	},
	usernameContent: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 8,
	},
	usernameText: {
		color: "#fff",
		fontSize: 16,
	},
	usernameUp: {
		color: "#fff",
		fontSize: 10,
		backgroundColor: GLOBAL_COLORS.secondaryColor,
		paddingHorizontal: 4,
		borderRadius: 3,
		fontWeight: "bold",
		top: -6,
		left: 2,
	},
	followBtn: {
		paddingHorizontal: 16,
		paddingVertical: 2,
		backgroundColor: GLOBAL_COLORS.secondaryColor,
		borderRadius: 12,
	},
	unfollowBtn: {
		paddingHorizontal: 16,
		paddingVertical: 2,
		backgroundColor: GLOBAL_COLORS.inactiveTextColor,
		borderRadius: 12,
	},
	followText: {
		color: "#fff",
		fontSize: 14,
	},
	description: {
		color: "#fff",
		marginTop: 10,
		fontSize: 16,
	},
	summaryContainer: {
		flexDirection: "row",
		marginTop: 30,
	},
	summaryContent: {
		width: "33%",
		alignItems: "center",
	},
	summaryContentMiddle: {
		width: "33%",
		alignItems: "center",
		borderLeftColor: "#bbb",
		borderRightColor: "#bbb",
		borderLeftWidth: 1,
		borderRightWidth: 1,
	},
	summaryNumber: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
	},
	summaryText: {
		color: "#bbb",
	},
	donatorContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#262632",
		// marginTop: 15,
		paddingVertical: 5,
		paddingHorizontal: 15,
	},
	profilesImagesContent: {
		position: "relative",
		height: 40,
	},
	profileImgs: {
		position: "absolute",
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	buttons: {
		flexDirection: "row",
		alignItems: "center",
	},
	donateBtn: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		backgroundColor: GLOBAL_COLORS.secondaryColor,
		borderRadius: 4,
		marginLeft: 10,
	},
	donateText: {
		color: "#fff",
	},
});