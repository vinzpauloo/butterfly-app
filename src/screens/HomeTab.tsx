import { StyleSheet, Text, View } from "react-native";
import React from "react";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { topMainNav } from "data/topMainNav";

type Props = {};

const HomeTab = (props: Props) => {
  return <MaterialTopTabs data={topMainNav} />;
};

export default HomeTab;

const styles = StyleSheet.create({});
