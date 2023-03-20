import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { SelectCountry } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";

import Announcement from "features/announcement";
import FlagUSA from "assets/images/Flag-USA.png";
import FlagChina from "assets/images/Flag-China.webp";
import Following from "./tabs/Following";
import Home from "./tabs/Home";
import Moment from "./tabs/Moment";
import localizations from "i18n/localizations";
import Photography from "./tabs/Photography";
import PopupAds from "features/ads/components/PopupAds";
import { GLOBAL_COLORS } from "global";
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
  const local_data = [
    {
      value: "1",
      lable: "EN",
      image: FlagUSA,
    },
    {
      value: "2",
      lable: "CN",
      image: FlagChina,
    },
  ];
  const [country, setCountry] = useState("1");
  const [setLang, setTranslations] = translationStore((state) => [
    state.setLang,
    state.setTranslations,
  ]);

  const changeLanguage = (value) => {
    switch (value) {
      case "1":
        return "en";
      case "2":
        return "cn";
      default:
        return "en";
    }
  };

  const toggleSwitch = (event) => {
    setCountry(event.value);

    let newLang = changeLanguage(event.value);
    setLang(newLang);
    setTranslations(localizations[newLang]);
  };

  return (
    <View style={styles.intl}>
      <SelectCountry
        style={[styles.dropdown]}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        imageStyle={styles.imageStyle}
        iconStyle={styles.iconStyle}
        maxHeight={200}
        value={country}
        data={local_data}
        valueField="value"
        labelField="lable"
        imageField="image"
        onChange={(event) => {
          toggleSwitch(event);
        }}
      />
    </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginVertical: 5,
  },
  searchText: {
    color: "#fff",
    fontSize: 12,
    marginHorizontal: 5,
  },

  dropdown: {
    marginHorizontal: 16,
    height: 30,
    width: 60,
    backgroundColor: GLOBAL_COLORS.primaryTextColor,
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 5,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
});
