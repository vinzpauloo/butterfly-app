import React, { useEffect, useRef, useState } from 'react'
import { Text, FlatList, View, Dimensions, StyleSheet, Pressable, ScrollView } from 'react-native';
import { GLOBAL_COLORS } from 'global';

type Props = {}

const customTabs = [
	{ title: "Header 1", component: null },
	{ title: "Header 2", component: null },
	{ title: "Header 3", component: null },
] 

const windowWidth = Dimensions.get('window').width

const ExperimentalTopTabs = (props: Props) => {
	const [currentTab, setCurrentTab] = useState(0)
	const TabContainerRef = useRef<FlatList>()

	function onScrollEnd(e) {
		let pageNumber = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / windowWidth + 0.5)));
		setCurrentTab(pageNumber);
	}

	useEffect(() => {
	}, [])

	return (
		<ScrollView stickyHeaderHiddenOnScroll={false} stickyHeaderIndices={[1]} style={{ flex: 1, backgroundColor: GLOBAL_COLORS.primaryColor }}>
			<CustomHeader/>
			{/* TABS CONTAINER - STICKS ON TOP */}
			<View style={{ backgroundColor: GLOBAL_COLORS.primaryColor }}>
				<View style={{ flexDirection: "row" }}>
					{customTabs.map((tab, tabIndex) => 
						<Pressable onPress={() => { TabContainerRef.current.scrollToIndex({ index: tabIndex, animated: false }); setCurrentTab(tabIndex) }}>
							<Text style={[styles.tabHeaderText, currentTab === tabIndex ? styles.isActiveHeader : null]}>{ tab.title }</Text>
						</Pressable>)}
				</View>
			</View>
			<FlatList
				ref={TabContainerRef}
				data={[1, 2, 3]}
				renderItem={({ item }) => <ScrollViewTabItem />}
				pagingEnabled
				horizontal
				onMomentumScrollEnd={onScrollEnd}
				removeClippedSubviews
				initialNumToRender={1}
				maxToRenderPerBatch={1}
				windowSize={1}
			/>
		</ScrollView>
	)
}

const CustomHeader = () => {
	return (
		<View style={{ height: 200, backgroundColor: "cyan" }}>
			<Pressable style={{ borderWidth: 1, alignSelf: "flex-start" }} onPress={() => alert("you interacted with the element")}>
				<Text>Pressable Element</Text>
			</Pressable>
			<Pressable style={{ borderWidth: 1, alignSelf: "flex-start", left: 12, top: 24 }} onPress={() => alert("you interacted with the element")}>
				<Text>Pressable Element</Text>
			</Pressable>
			<Pressable style={{ borderWidth: 1, alignSelf: "flex-start", left: 60, top: 55, padding: 12 }} onPress={() => alert("you interacted with the element")}>
				<Text>Pressable Element</Text>
			</Pressable>
		</View>
	)
}

const ViewTabItem = () => {
	return (
		<View style={{ width: windowWidth, flex: 1, height: 900, backgroundColor: GLOBAL_COLORS.primaryColor, alignItems: "center" }}>
			<Text style={{ color: "white", fontSize: 20 }}> &lt;View/&gt; PARENT</Text>
			<Text style={{ color: "white", fontSize: 20, marginTop: "auto", marginBottom: "auto" }}>TAB CONTENT MIDDLE</Text>
			<Text style={{ color: "white", fontSize: 20 }}>TAB CONTENT BOTTOM</Text>
		</View>
	)
}

const ScrollViewTabItem = () => {
	return (
		<ScrollView style={{ width: windowWidth, backgroundColor: GLOBAL_COLORS.primaryColor }}>
			<View style={{ flex: 1, height: 900, alignItems: "center" }}>
				<Text style={{ color: "white", fontSize: 20 }}> &lt;ScrollView/&gt; PARENT</Text>
				<Text style={{ color: "white", fontSize: 20, marginTop: "auto", marginBottom: "auto" }}>TAB CONTENT MIDDLE</Text>
				<Text style={{ color: "white", fontSize: 20 }}>TAB CONTENT BOTTOM</Text>
			</View>
		</ScrollView>
	)
}

export default ExperimentalTopTabs

const styles = StyleSheet.create({
	tabHeaderText: {
		padding: 4,
		borderWidth: 1,
		borderColor: "red",
		color: "white"
	},
	isActiveHeader: {
		backgroundColor: "green"
	}
})