// CURRENTLY UNUSED 

import React, { useEffect, useRef, useState } from 'react'
import { Text, FlatList, View, Dimensions, StyleSheet, Pressable, ScrollView } from 'react-native';
import { GLOBAL_COLORS } from 'global';

type Props = {}

const windowWidth = Dimensions.get('window').width

const ExperimentalTopTabs = ({data}) => {
	const [currentTab, setCurrentTab] = useState(0)
	const tabContainerRef = useRef<FlatList>()
	const { header, tabItems } = data;

	function onScrollEnd(e) {
		let pageNumber = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / windowWidth + 0.5)));
		setCurrentTab(pageNumber);
	}

	useEffect(() => {
	}, [])

	return (
		<ScrollView stickyHeaderHiddenOnScroll={false} stickyHeaderIndices={header ? [1] : [0]} style={styles.container} nestedScrollEnabled scrollEnabled={false}>
			{header}
			<View style={styles.container}>
				<View style={styles.tabRowContainer}>
					{tabItems.map((tab, tabIndex) => 
						<Pressable onPress={() => { tabContainerRef.current.scrollToIndex({ index: tabIndex, animated: false }); setCurrentTab(tabIndex) }}>
							<Text style={[{ width: windowWidth / tabItems.length }, styles.tabHeaderText, currentTab === tabIndex ? styles.isActiveHeader : null]}>{ tab.name }</Text>
						</Pressable>)}
				</View>
			</View>
			<FlatList
				ref={tabContainerRef}
				data={tabItems}
				renderItem={({ item }) => item.component}
				pagingEnabled
				horizontal
				onMomentumScrollEnd={onScrollEnd}
				removeClippedSubviews
				initialNumToRender={1}
				maxToRenderPerBatch={1}
				windowSize={2}
			/>
		</ScrollView>
	)
}

export default ExperimentalTopTabs

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GLOBAL_COLORS.primaryColor
	},
	tabRowContainer: {
		flexDirection: "row",
		shadowOffset: { width: 0, height: 0 },
		shadowColor: "black",
		shadowRadius: 0,
		shadowOpacity: 0.25,
		elevation: 1,
	},
	tabHeaderText: {
		paddingVertical: 6,
		textAlign: "center",
		color: GLOBAL_COLORS.inactiveTextColor,
	},
	isActiveHeader: {
		color: GLOBAL_COLORS.primaryTextColor,
		borderBottomWidth: 2,
		borderBottomColor: GLOBAL_COLORS.secondaryColor,
	}
})