import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { reelsVideos } from "data/reelsVideos";
import PortraitVideo from "layouts/navigators/PortraitVideo";


const { height: windowHeight } = Dimensions.get("window")

type Props = {};

const Vlog = (props: Props) => {
	const [activeVideoIndex, secActiveVideoIndex] = useState(0)
	const bottomTabHeight = useBottomTabBarHeight()
	return (
		<FlatList
			// estimatedItemSize={15}
			data={reelsVideos}
			pagingEnabled
			removeClippedSubviews={true}
			renderItem={({ item, index }) =>
				<PortraitVideo
					key={item.id}
					uri={item.uri}
					isPortrait={item.isPortrait}
					userName={item.userName}
					description={item.description}
					tags={item.tags}
					likes={item.likes}
					amountOfComments={item.amountOfComments}
					userImage={item.avatarUri}
					isActive={activeVideoIndex === index}
					activeVideoIndex={activeVideoIndex}
				/>}
			onScroll={e => {
				const index = Math.round(e.nativeEvent.contentOffset.y / (windowHeight - bottomTabHeight))
				secActiveVideoIndex(index)
			}}
		/>
	)
};

export default Vlog;

const styles = StyleSheet.create({});
