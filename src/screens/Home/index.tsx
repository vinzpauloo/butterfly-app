import { StyleSheet, Switch, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { topMainNav } from "data/topMainNav";

import PopupAds from "features/ads/components/PopupAds";
import Announcement from "features/announcement";
import localizations from "i18n/localizations";
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

// Change Language
const Intl = () => {
  const [setLang, setTranslations] = translationStore((state) => [
    state.setLang,
    state.setTranslations,
  ]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = (event) => {
    setIsEnabled((previousState) => !previousState);

    let newLang = event ? "cn" : "en";
    setLang(newLang);
    setTranslations(localizations[newLang]);
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
