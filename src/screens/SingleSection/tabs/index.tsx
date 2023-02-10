import { StyleSheet, Text, View } from "react-native";
import React from "react";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { singleSectionSubNav } from "data/singleSectionSubNav";

const SingleSectionTabContent = ({}) => {
  return (
    <View style={{ flex: 1 }}>
      <MaterialTopTabs data={singleSectionSubNav} isEqualWidth={true} />
    </View>
  );
};

export default SingleSectionTabContent;

const styles = StyleSheet.create({});
