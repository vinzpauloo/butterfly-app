import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";

import { globalStyle } from "globalStyles";
import BottomTabs from "layouts/navigators/BottomTabs";
import PhotoGallery from "screens/PhotoGallery";
import PortraitVideo from "layouts/PortraitVideo";
import Preloading from "screens/Preloading";
import Search from "screens/Search";
import SingleSectionScreen from "screens/SingleSection";
import SingleVideoScreen from "screens/SingleVideo";
import SingleUser from "screens/SingleUser";

import { bottomNav } from "./bottomNav";
import RecordingHistory from "../screens/Account/tabs/RecordingHistory";
import OfflineCache from "../screens/Account/tabs/OfflineCache";
import SharingPromotion from "../screens/Account/tabs/SharingPromotion";
import AccountVerification from "screens/Account/tabs/AccountVerification";
import OnlineCustomerService from "screens/Account/tabs/OnlineCustomerService";
import BestApps from "screens/Account/tabs/BestApps";
import Settings from "screens/Settings";
import SingleTag from "screens/SingleTag";

const basicHeader = ({ navigation, route }: any) => ({
  headerTitle: route?.params.postTitle,
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: globalStyle.headerBasicBg,
  },
  headerTitleStyle: {
    color: "#fff",
  },
  headerLeft: () => (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Ionicons
        name="chevron-back-sharp"
        color="#fff"
        size={30}
        onPress={() => navigation.goBack()}
      />
    </View>
  ),
});

export const stackScreens = {
  initialRoute: "Preloading",
  screenOptions: { animation: "slide_from_right" },
  screens: [
    {
      name: "BottomNav",
      component: () => <BottomTabs data={bottomNav} />,
      options: { headerShown: false },
    },
    {
      name: "SingleVideo",
      component: SingleVideoScreen,
      options: ({ navigation, route }: any) => ({
        title: "",
        headerStyle: {
          backgroundColor: globalStyle.primaryColor,
        },
        headerLeft: () => (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Ionicons
              name="chevron-back-sharp"
              color="#fff"
              size={30}
              onPress={() => navigation.goBack()}
            />
            <Image source={route.params?.image} style={styles.image} />
            <View>
              <Text style={styles.title}>{route.params?.title}</Text>
              <Text style={styles.subTitle}>{route.params?.subTitle}粉丝</Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <Pressable style={styles.followBtn}>
            <Text style={styles.followText}>+关注</Text>
          </Pressable>
        ),
        headerTitleStyle: {
          color: "#fff",
        },
      }),
    },
    {
      name: "Search",
      component: Search,
      options: { headerShown: false },
    },
    {
      name: "VlogScreen",
      component: () => <PortraitVideo hasBackButton={true} />,
      options: { headerShown: false },
    },
    {
      name: "Preloading",
      component: Preloading,
      options: { headerShown: false },
    },
    {
      name: "PhotoGallery",
      component: PhotoGallery,
      options: basicHeader,
    },
    {
      name: "SingleSection",
      component: SingleSectionScreen,
      options: basicHeader,
    },
    {
      name: "RecordingHistory",
      component: RecordingHistory,
      options: { headerShown: false },
    },
    {
      name: "OfflineCache",
      component: OfflineCache,
      options: { headerShown: false },
    },
    {
      name: "SharingPromotion",
      component: SharingPromotion,
      options: { headerShown: false },
    },
    {
      name: "AccountVerification",
      component: AccountVerification,
      options: { headerShown: false },
    },
    {
      name: "OnlineCustomerService",
      component: OnlineCustomerService,
      options: { headerShown: false },
    },
    {
      name: "BestApps",
      component: BestApps,
      options: { headerShown: false },
    },
    {
      name: "SingleUser",
      component: SingleUser,
      options: { headerShown: false },
    },
    {
      name: "Settings",
      component: Settings,
      options: basicHeader,
    },
    {
      name: "SingleTag",
      component: SingleTag,
      options: { headerShown: false },
    },
  ],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    color: "#fff",
  },
  subTitle: {
    color: "#999",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 250,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 6,
  },
  input: {
    width: 180,
  },
  followBtn: {
    backgroundColor: globalStyle.secondaryColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "crimson",
  },
  followText: {
    color: "#fff",
    fontSize: 14,
  },
});
