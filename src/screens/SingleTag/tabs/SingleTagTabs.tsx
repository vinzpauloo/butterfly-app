import { StyleSheet } from "react-native";
import React from "react";

import { useRoute } from "@react-navigation/native";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import Moment from "./Moment";
import Recommended from "./Recommended";
import { GLOBAL_COLORS } from "global";

const SingleTagTabs = () => {
  const route = useRoute<any>();

  const singleTagSubNav = {
    initialRoute: "推荐",
    screens: [
      {
        name: "推荐",
        component: () => (
          <Recommended id={route.params.id} tag={route.params.tag} />
        ),
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
      tabBarColor={GLOBAL_COLORS.headerBasicBg}
    />
  );
};

export default SingleTagTabs;

const styles = StyleSheet.create({});
