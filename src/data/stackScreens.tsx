import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";

import About from "screens/Settings/tabs/About";
import AccountCredentials from "screens/AccountCredentials";
import AccountRetrieval from "screens/Settings/tabs/AccountRetrieval";
import AccountVerification from "screens/Account/tabs/AccountVerification";
import BestApps from "screens/Account/tabs/BestApps";
import BottomNav from "./bottomNav";
import CameraInit from "screens/Settings/AccountRetrievalTabs/CameraInit";
import Certificate from "screens/MainProfile/screens/Certificate";
import Container from "components/Container";
import CustomerService from "screens/Settings/AccountRetrievalTabs/CustomerService";
import DownloadScreen from "screens/Download";
import DownloadVideo from "screens/DownloadVideo";
import FollowersScreen from "screens/FollowersScreen";
import InitialLoad from "screens/InitialLoad";
import InformationScreen from "screens/InformationScreen";
import Introduction from "screens/Settings/tabs/Introduction";
import MobileBindRequest from "screens/Settings/tabs/MobileBindRequest";
import MobileRetrieval from "screens/Settings/AccountRetrievalTabs/MobileRetrieval";
import OfflineCache from "../screens/Account/tabs/OfflineCache";
import OnAppExitScreen from "screens/OnAppExitScreen";
import PasscodeLock from "screens/Settings/tabs/PasscodeLock";
import PetName from "screens/Settings/tabs/PetName";
import PhotoGallery from "screens/PhotoGallery";
import PortraitVideo from "layouts/PortraitVideo";
import Preloading from "screens/Preloading";
import PrivacyPolicy from "screens/Settings/tabs/PrivacyPolicy";
import ProfilePhoto from "screens/Settings/tabs/ProfilePhoto";
import RecordingHistory from "../screens/Account/tabs/RecordingHistory";
import RequestCode from "screens/Settings/tabs/RequestCode";
import Search from "screens/Search";
import SingleSectionScreen from "screens/SingleSection";
// import Settings from "screens/Settings";
import Settings from "screens/MainProfile/screens/Settings";
import ServiceProvisions from "screens/Settings/tabs/ServiceProvisions";
import SharingPromotion from "../screens/Account/tabs/SharingPromotion";
import SingleVideoScreen from "screens/SingleVideo";
import SingleUser from "screens/SingleUser";
import SingleChatScreen from "screens/SingleChatScreen";
import SingleTag from "screens/SingleTag";
import SingleFeedScreen from "screens/SingleFeedScreen";
import TermsOfService from "screens/TermsOfService";
import VIPScreen from "screens/VIP";
import WorkService from "services/api/WorkService";
import { GLOBAL_COLORS } from "global";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";
import { userStore } from "../zustand/userStore";

const basicHeader = ({ navigation, route }: any) => ({
  headerTitle: route?.params.postTitle,
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: GLOBAL_COLORS.videoContentBG,
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

const VlogScreen = () => {
  const route = useRoute<any>();
  const { getWorkById } = WorkService();
  const [data, setData] = useState([]);
  const [nextID, setNextID] = useState(0);
  const token = userStore((state) => state.api_token);
  const queryParams = {
    workId: !!route.params.all ? route.params.all[nextID] : route.params.id,
    token: token,
  };

  // FETCH SINGLE PORTRAIT WORK
  const { isLoading, refetch } = useQuery({
    queryKey: ["SingleVlog", route.params.id],
    queryFn: () => getWorkById(queryParams),
    onError: (error) => {
      console.log("SingleVlog", error);
    },
    onSuccess: (data) => {
      setData((prev) => [...prev].concat(data));
    },
  });

  function onUserScrollDown() {
    // this use if the vlog is from vertical videos slider
    if (!!route.params.all) {
      // this will check if the videos slider meet the last video
      if (nextID !== route.params.all.length - 1) {
        if (nextID !== 0) {
          setNextID((prev) => prev + 1);
          refetch();
        }
      }
    }
  }

  if (isLoading) {
    return (
      <Container>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </Container>
    );
  }

  return (
    <PortraitVideo
      reelsVideos={data}
      hasBackButton={true}
      onUserScrollDown={onUserScrollDown}
    />
  );
};

export const stackScreens = {
  initialRoute: "InitialLoad",
  screenOptions: { animation: "slide_from_right" },
  screens: [
    {
      name: "About",
      component: About,
      options: { headerShown: false },
    },
    {
      name: "AccountCredentials",
      component: AccountCredentials,
      options: basicHeader,
    },
    {
      name: "AccountRetrieval",
      component: AccountRetrieval,
      options: { headerShown: false },
    },
    {
      name: "AccountVerification",
      component: AccountVerification,
      options: { headerShown: false },
    },
    {
      name: "BestApps",
      component: BestApps,
      options: { headerShown: false },
    },
    {
      name: "BottomNav",
      component: BottomNav,
      options: { headerShown: false },
    },
    {
      name: "CameraInit",
      component: CameraInit,
      options: { headerShown: false },
    },
    {
      name: "Certificate",
      component: Certificate,
      options: basicHeader,
    },
    {
      name: "CustomerService",
      component: CustomerService,
      options: { headerShown: false },
    },
    {
      name: "Downloads",
      component: DownloadScreen,
      options: basicHeader,
    },
    {
      name: "DownloadVideo",
      component: DownloadVideo,
      options: basicHeader,
    },
    {
      name: "FollowersScreen",
      component: FollowersScreen,
      options: basicHeader,
    },
    {
      name: "InformationScreen",
      component: InformationScreen,
      options: basicHeader,
    },
    {
      name: "InitialLoad",
      component: InitialLoad,
      options: { headerShown: false },
    },
    {
      name: "Introduction",
      component: Introduction,
      options: { headerShown: false },
    },
    {
      name: "MobileBindRequest",
      component: MobileBindRequest,
      options: { headerShown: false },
    },
    {
      name: "MobileRetrieval",
      component: MobileRetrieval,
      options: { headerShown: false },
    },
    {
      name: "OfflineCache",
      component: OfflineCache,
      options: { headerShown: false },
    },
    {
      name: "OnAppExitScreen",
      component: OnAppExitScreen,
      options: { headerShown: false },
    },
    {
      name: "PasscodeLock",
      component: PasscodeLock,
      options: { headerShown: false },
    },
    {
      name: "PetName",
      component: PetName,
      options: { headerShown: false },
    },
    {
      name: "PhotoGallery",
      component: PhotoGallery,
      options: basicHeader,
    },
    {
      name: "Preloading",
      component: Preloading,
      options: { headerShown: false },
    },
    {
      name: "PrivacyPolicy",
      component: PrivacyPolicy,
      options: { headerShown: false },
    },
    {
      name: "RecordingHistory",
      component: RecordingHistory,
      options: { headerShown: false },
    },
    {
      name: "RequestCode",
      component: RequestCode,
      options: { headerShown: false },
    },
    {
      name: "Search",
      component: Search,
      options: { headerShown: false },
    },
    {
      name: "Settings",
      component: Settings,
      options: basicHeader,
    },
    {
      name: "SingleChatScreen",
      component: SingleChatScreen,
      options: basicHeader,
    },
    {
      name: "SingleSection",
      component: SingleSectionScreen,
      options: basicHeader,
    },
    {
      name: "ProfilePhoto",
      component: ProfilePhoto,
      options: { headerShown: false },
    },
    {
      name: "ServiceProvisions",
      component: ServiceProvisions,
      options: { headerShown: false },
    },
    {
      name: "SingleFeedScreen",
      component: SingleFeedScreen,
      options: { headerShown: false },
    },
    {
      name: "SingleTag",
      component: SingleTag,
      options: { headerShown: false },
    },
    {
      name: "SingleUser",
      component: SingleUser,
      options: { headerShown: false },
    },
    {
      name: "SingleVideo",
      component: SingleVideoScreen,
      options: { headerShown: false },
    },
    {
      name: "SharingPromotion",
      component: SharingPromotion,
      options: { headerShown: false },
    },
    {
      name: "TermsOfService",
      component: TermsOfService,
      options: { headerShown: false },
    },
    {
      name: "VlogScreen",
      component: VlogScreen,
      options: { headerShown: false },
    },
    {
      name: "VIPScreen",
      component: VIPScreen,
      options: basicHeader,
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
  followers: {
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
    backgroundColor: GLOBAL_COLORS.secondaryColor,
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
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
