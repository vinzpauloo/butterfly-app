import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { topMainNav } from "data/topMainNav";

import PopupAds from "features/ads/components/PopupAds";
import Announcement from "features/announcement";

// Search Icon
const Search = () => {
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
      <Text style={styles.searchText}>搜索</Text>
    </TouchableOpacity>
  );
};

const HomeTab = () => {
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
