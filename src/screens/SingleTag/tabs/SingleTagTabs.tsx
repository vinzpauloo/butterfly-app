import { StyleSheet } from "react-native";
import React from "react";

import { useRoute } from "@react-navigation/native";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import Moment from "./Moment";
import Recommended from "./Recommended";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../../zustand/translationStore";

const SingleTagTabs = () => {
  const route = useRoute<any>();
  const translations = translationStore((state) => state.translations);

  const singleTagSubNav = {
    initialRoute: translations.recommend,
    screens: [
      {
        name: translations.recommend,
        component: () => <Recommended tag={route.params.tag} />,
      },
      {
        name: translations.moment,
        component: () => (
          <Moment userId={route.params.userId} tag={route.params.tag} />
        ),
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
