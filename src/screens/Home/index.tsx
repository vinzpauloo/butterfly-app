import { Dimensions, Pressable, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { useNavigation } from "@react-navigation/native";
import { readFileDirectory } from "lib/expoFileSystem";

import Announcement from "features/announcement";
import Following from "./tabs/Following";
import Home from "./tabs/Home";
import Moment from "./tabs/Moment";
import Photography from "./tabs/Photography";
import PopupAds from "features/ads/components/PopupAds";
import { downloadStore } from "../../zustand/downloadStore";
import { translationStore } from "../../zustand/translationStore";
import { GLOBAL_COLORS, GLOBAL_SCREEN_SIZE } from "global";

const { width } = Dimensions.get("window");

// Search Icon
const Search = () => {
  const translations = translationStore((state) => state.translations);
  const navigation = useNavigation<any>();
  const handlePress = () => {
    navigation.navigate("Search");
  };

  return (
    <>
      {width < GLOBAL_SCREEN_SIZE.mobile ? (
        <Pressable onPress={handlePress} style={styles.smallSearchContainer}>
          <Ionicons name="search" size={20} color="#fff" />
        </Pressable>
      ) : (
        <Pressable onPress={handlePress} style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#fff" />
          <Text style={styles.searchText}>{translations.search}</Text>
        </Pressable>
      )}
    </>
  );
};

const HomeTab = () => {
  const { translations } = translationStore((state) => state);
  const { setDownloaded } = downloadStore((state) => state);

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

  useEffect(() => {
    (async () => {
      const directories = await readFileDirectory();
      setDownloaded(directories);
    })();
  }, []);

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
  smallSearchContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 30,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  searchContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 30,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: GLOBAL_COLORS.primaryTextColor,
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  searchText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 12,
    marginHorizontal: 5,
  },
});
