import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { useNavigation } from "@react-navigation/native";

import Announcement from "features/announcement";
import Following from "./tabs/Following";
import Home from "./tabs/Home";
import Moment from "./tabs/Moment";
import Photography from "./tabs/Photography";
import PopupAds from "features/ads/components/PopupAds";
import { translationStore } from "../../zustand/translationStore";

// Search Icon
const Search = () => {
  const translations = translationStore((state) => state.translations);
  const navigation = useNavigation<any>();
  const handlePress = () => {
    navigation.navigate("Search");
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      style={styles.searchContainer}
    >
      <Ionicons name="search" size={20} color="#fff" />
      <Text style={styles.searchText}>{translations.search}</Text>
    </TouchableOpacity>
  );
};

const HomeTab = () => {
  const translations = translationStore((state) => state.translations);
  const topMainNav = {
    initialRoute: translations.home,
    screens: [
      {
        name: translations.following,
        component: () => <Following />,
      },
      {
        name: translations.home,
        component: () => <Home />,
      },
      {
        name: translations.moment,
        component: () => <Moment />,
      },
      {
        name: translations.photography,
        component: () => <Photography />,
      },
    ],
  };
  return (
    <>
      <MaterialTopTabs data={topMainNav} search={<Search />} />
      <Announcement />
      <PopupAds />
    </>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  searchText: {
    color: "#fff",
    fontSize: 12,
    marginHorizontal: 5,
  },
});
