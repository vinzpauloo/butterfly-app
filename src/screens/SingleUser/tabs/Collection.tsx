// UNUSED COMPONENT
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Tabs } from "react-native-collapsible-tab-view";
import Container from "components/Container";

type Props = {};

const Collection = (props: Props) => {
	const route = useRoute<any>();
	const userID = route?.params?.userID

	return (
		<Container>
			<Tabs.FlatList data={[1]} renderItem={() =>
					<Text style={{color:"white"}}>Collection - WIP</Text>
			}/>
		</Container>
	);
};

export default Collection;

const styles = StyleSheet.create({});
