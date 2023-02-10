import { StyleSheet, Text, View } from "react-native";
import React from "react";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { singleSectionSubNav } from "data/singleSectionSubNav";
import { useHeaderHeight } from '@react-navigation/elements';

const SingleSectionTabContent = ({ }) => {
  const headerHeight = useHeaderHeight();

  return (
    <View style={{flex:1, marginTop: headerHeight}}>
      <MaterialTopTabs data={singleSectionSubNav} isEqualWidth={true} />
    </View>
  )
};

export default SingleSectionTabContent;

const styles = StyleSheet.create({});
