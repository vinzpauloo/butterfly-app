import { StyleSheet, Text, View } from "react-native";
import React from "react";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { singleSectionSubNav } from "data/singleSectionSubNav";

const SingleSectionTabContent = ({}) => {
  return <MaterialTopTabs data={singleSectionSubNav} isEqualWidth={true} />;
};

export default SingleSectionTabContent;

const styles = StyleSheet.create({});
