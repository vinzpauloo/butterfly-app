import { StyleSheet, View } from "react-native";
import React from "react";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import MostLiked from "./MostLikes";
import MostViewed from "./MostViewed";
import RecentlyUpdated from "./RecentlyUpdated";
import { useRoute } from "@react-navigation/native";

const SingleSectionTabContent = ({}) => {
  const routes = useRoute<any>();

  const singleSectionSubNav = {
    initialRoute: "最近更新",
    screens: [
      {
        name: "最近更新",
        component: () => <RecentlyUpdated id={routes.params.id} />,
      },
      {
        name: "最多观看",
        component: () => <MostViewed id={routes.params.id} />,
      },
      {
        name: "最多收藏",
        component: () => <MostLiked id={routes.params.id} />,
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
