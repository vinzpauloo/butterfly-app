import { StyleSheet, View } from "react-native";
import React from "react";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { useRoute } from "@react-navigation/native";
import DynamicTab from "./DynamicTab";

const SingleSectionTabContent = ({}) => {
  const routes = useRoute<any>();

  const singleSectionSubNav = {
    initialRoute: "最近更新",
    screens: [
      {
        name: "最近更新",
        component: () => (
          <DynamicTab id={routes.params.id} tabCategory="recently_updated" />
        ),
      },
      {
        name: "最多观看",
        component: () => (
          <DynamicTab id={routes.params.id} tabCategory="most_viewed" />
        ),
      },
      {
        name: "最多收藏",
        component: () => (
          <DynamicTab id={routes.params.id} tabCategory="most_liked" />
        ),
      },
    ],
  };

  return (
    <View style={{ flex: 1 }}>
      <MaterialTopTabs data={singleSectionSubNav} isEqualWidth={true} />
    </View>
  );
};

export default SingleSectionTabContent;

const styles = StyleSheet.create({});
