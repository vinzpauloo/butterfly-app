import React from "react";
import { Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";
import Banner10 from "assets/images/banner10.jpg";
import ProfilePhoto from "assets/images/profilePhoto.jpg";

import Container from "components/Container";
import { Entypo } from '@expo/vector-icons';
import { globalStyle } from "globalStyles";
import { singleUserData } from "data/singleUserData";

const { width, height } = Dimensions.get("window");

type Props = {}

const ProfileBanner = () => {
	const navigation = useNavigation<any>();

	const route = useRoute();
	const previousScreen = (route.params && route.params['previousScreen']) || 'Default';

	return (
		<View style={styles.bannerContainer}>
			<ImageBackground
				source={Banner10}
				resizeMode="cover"
				style={styles.bgImg}
			/>
			<View style={styles.bannerContent}>
				<Ionicons
					name="chevron-back"
					color="#fff"
					size={30}
					style={styles.backIcon}
					onPress={() => navigation.goBack()}
				/>
				{previousScreen === 'Account' ? (
					<Entypo name="dots-three-vertical" size={30} color='#FFFFFF' style={styles.messageIcon} />
				) : (
					<Ionicons
						name="md-chatbox-ellipses-outline"
						color="#fff"
						size={35}
						style={styles.messageIcon}
						onPress={() => navigation.goBack()}
					/>
				)}
				<Image source={ProfilePhoto} style={styles.profileImg} />
				<View style={styles.usernameContainer}>
					<View style={styles.usernameContent}>
						<Text style={styles.usernameText}>{singleUserData.userName}</Text>
						<Text style={styles.usernameUp}>UP</Text>
					</View>
					<Pressable style={styles.followBtn}>
						<Text style={styles.followText}>关注</Text>
					</Pressable>
				</View>
				<Text style={styles.description}>{singleUserData.description}</Text>
				<View style={styles.summaryContainer}>
					<Pressable onPress={() => navigation.navigate("FollowingFanListScreen",
						{ postTitle: "关注", isFetchingFollowingList : true })} style={styles.summaryContent}>
						<Text style={styles.summaryNumber}>{singleUserData.following}</Text>
						<Text style={styles.summaryText}>关注</Text>
					</Pressable>
					<Pressable onPress={() => navigation.navigate("FollowingFanListScreen",
						{ postTitle: "粉丝", isFetchingFansList: true })} style={styles.summaryContentMiddle}>
						<Text style={styles.summaryNumber}>{singleUserData.fans}</Text>
						<Text style={styles.summaryText}>粉丝</Text>
					</Pressable>
					<View style={styles.summaryContent}>
						<Text style={styles.summaryNumber}>{singleUserData.praise}</Text>
						<Text style={styles.summaryText}>获赞</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const Donators = () => {
	return (
		<View style={styles.donatorContainer}>
			<View style={styles.profilesImagesContent}>
				{[1, 2, 3, 4, 5].map((item, index) => (
					<Image
						source={ProfilePhoto}
						style={[styles.profileImgs, { zIndex: index, left: index * 20 }]}
					/>
				))}
			</View>
			<View style={styles.buttons}>
				<Text style={styles.donateText}>{singleUserData.donators}人打赏</Text>
				<Pressable style={styles.donateBtn}>
					<Text style={styles.donateText}>打赏</Text>
				</Pressable>
			</View>
		</View>
	);
};

const SingleUserHeader = (props: Props) => {
	return (
		<Container>
			<ProfileBanner />
			<Donators />
		</Container>
	)
}

export default SingleUserHeader

const styles = StyleSheet.create({
	//ProfileBanner
	bannerContainer: {
		height: height * 0.3,
		width: width,
		position: "relative",
	},
	bgImg: {
		top: 0,
		left: 0,
		right: 0,
		height: height * 0.3,
		width: width,
		position: "absolute",
	},
	bannerContent: {
		backgroundColor: "rgba(0,0,0, 0.5)",
		height: height * 0.3,
		width: width,
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
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
		borderColor: globalStyle.secondaryColor,
	},
	usernameContainer: {
		position: "relative",
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
	},
	usernameContent: {
		flexDirection: "row",
	},
	usernameText: {
		color: "#fff",
		fontSize: 16,
		paddingHorizontal: 20,
	},
	usernameUp: {
		position: "absolute",
		top: 0,
		right: 0,
		color: "#fff",
		fontSize: 10,
		backgroundColor: globalStyle.secondaryColor,
		paddingHorizontal: 4,
		borderRadius: 3,
		fontWeight: "bold",
	},
	followBtn: {
		paddingHorizontal: 20,
		paddingVertical: 4,
		backgroundColor: globalStyle.secondaryColor,
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
		width: width / 3,
		alignItems: "center",
	},
	summaryContentMiddle: {
		width: width / 3,
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

	//Donators
	donatorContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#262632",
		marginTop: 15,
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
		backgroundColor: globalStyle.secondaryColor,
		borderRadius: 4,
		marginLeft: 10,
	},
	donateText: {
		color: "#fff",
	},
});