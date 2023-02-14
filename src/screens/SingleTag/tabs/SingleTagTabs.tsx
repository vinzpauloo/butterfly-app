import { StyleSheet } from "react-native";
import React from "react";

import { useRoute } from "@react-navigation/native";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import Moment from "./Moment";
import Recommended from "./Recommended";
import { globalStyle } from "globalStyles";

const SingleTagTabs = () => {
  const route = useRoute<any>();

  const singleTagSubNav = {
    initialRoute: "推荐",
    screens: [
      {
        name: "推荐",
        component: () => <Recommended id={route.params.id} />,
      },
      {
        name: "动态",
        component: () => <Moment />,
      },
    ],
  };
  return (
    <MaterialTopTabs
      data={singleTagSubNav}
      tabBarColor={globalStyle.headerBasicBg}
    />
  );
};

export default SingleTagTabs;

const styles = StyleSheet.create({});
