import { StyleSheet, Switch, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { topMainNav } from "data/topMainNav";

import PopupAds from "features/ads/components/PopupAds";
import Announcement from "features/announcement";
import { useLanguage } from "../../../App";

// Search Icon
const Search = () => {
  const [lang, setLang] = useLanguage();
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
      <Text style={styles.searchText}>{lang.searchButton}</Text>
    </TouchableOpacity>
  );
};

// Change Language
const Intl = () => {
  // const { setLocale } = useGlobalContext();
  const [lang, setLang] = useLanguage();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = (event) => {
    setIsEnabled((previousState) => !previousState);
    if (event) {
      setLang("zh");
    } else {
      setLang("en");
    }
  };

  return (
    <Switch
      style={styles.intl}
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};

const HomeTab = () => {
  return (
    <>
      <MaterialTopTabs data={topMainNav} intl={<Intl />} search={<Search />} />
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
  intl: {
    position: "absolute",
    top: 0,
    right: 60,
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
