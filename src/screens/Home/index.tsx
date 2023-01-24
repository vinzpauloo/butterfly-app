import { StyleSheet } from "react-native";
import React from "react";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { topMainNav } from "data/topMainNav";

const HomeTab = () => {
  return <MaterialTopTabs data={topMainNav} />;
};

export default HomeTab;

const styles = StyleSheet.create({});
