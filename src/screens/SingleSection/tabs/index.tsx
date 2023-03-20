import { StyleSheet, View } from "react-native";
import React from "react";

import DynamicTab from "./DynamicTab";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { translationStore } from "../../../zustand/translationStore";
import { useRoute } from "@react-navigation/native";

const SingleSectionTabContent = ({}) => {
  const routes = useRoute<any>();
  const translations = translationStore((state) => state.translations);

  const singleSectionSubNav = {
    initialRoute: translations.recentlyUpdated,
    screens: [
      {
        name: translations.recentlyUpdated,
        component: () => (
          <DynamicTab id={routes.params.id} tabCategory="recently_updated" />
        ),
      },
      {
        name: translations.mostViewed,
        component: () => (
          <DynamicTab id={routes.params.id} tabCategory="most_viewed" />
        ),
      },
      {
        name: translations.mostFavorite,
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
