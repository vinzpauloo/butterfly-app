import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

type Props = {
	userID: number
};

// BUGGY UI TO BE FIXED
const Collection = (props: Props) => {
	return (
		<ScrollView>
			<View style={{ marginTop: 600, minHeight: 2000 }}>
				<Text style={{ color: "white" }}>USER ID: {props.userID} </Text>
				<Text style={{ color: "white" }}>COLLECTION OF SPECIFIC CONTENT CREATOR</Text>
				<Text style={{ color: "white" }}>BUGGY UI TO BE FIXED</Text>
			</View>
		</ScrollView>
	);
};

export default Collection;

const styles = StyleSheet.create({});
