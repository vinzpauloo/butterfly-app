import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";

import * as Clipboard from "expo-clipboard";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import localizations from "i18n/localizations";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  Box,
  Divider,
  FlatList,
  HStack,
  Modal,
  Stack,
  VStack,
  useToast,
} from "native-base";
import { storeDataObject, storeDataString } from "lib/asyncStorage";

import AccountIcon from "assets/images/account_icon.png";
import Container from "components/Container";
import CopyIcon from "assets/images/copy_icon.png";
import CustomerService from "services/api/CustomerService";
import DownloadIcon from "assets/images/download_icon.png";
import EmailIcon from "assets/images/email_icon.png";
import FlagUSA from "assets/images/Flag-USA.png";
import FlagChina from "assets/images/Flag-China.webp";
import HistoryIcon from "assets/images/history_icon.png";
import LanguageImg from "assets/images/language.png";
import SaveIcon from "assets/images/save_icon.png";
import ServiceIcon from "assets/images/service_icon.png";
import ShareIcon from "assets/images/share_icon.png";
import SiteSettingsService from "services/api/SiteSettingsService";
import VIPActive from "assets/images/VIPActive.png";
import VIPNotActive from "assets/images/VIPNotActive.png";
import { GLOBAL_COLORS, GLOBAL_SCREEN_SIZE } from "global";
import { translationStore } from "../../zustand/translationStore";
import { userStore } from "../../zustand/userStore";
import { adsGlobalStore } from "../../zustand/adsGlobalStore";
import { captureSuccess, captureError } from "services/sentry";

// **** COMPONENTS START **** //
const Layout = ({ children, style = null }) => {
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 15,
      backgroundColor: "#202833",
      ...style,
    },
  });
  return <View style={styles.container}>{children}</View>;
};
// **** COMPONENTS END **** //

// **** HEADER COMPONENT START CODE **** //
const Header = () => {
  const navigation = useNavigation<any>();
  const { translations } = translationStore((store) => store);

  const handlePressSettings = () => {
    navigation.navigate("Settings", { postTitle: translations.setup });
  };

  return (
    <HStack py={2} justifyContent={"flex-end"} alignItems="center">
      <MaterialIcons
        name="announcement"
        color="#fff"
        size={25}
        style={styles.icon}
      />
      <Pressable onPress={handlePressSettings}>
        <Ionicons
          name="settings-outline"
          color="#fff"
          size={25}
          style={styles.icon}
        />
      </Pressable>
    </HStack>
  );
};
// **** HEADER COMPONENT END CODE **** //

// **** USER COMPONENT START CODE **** //
const User = ({ data }) => {
  const { alias, photo, is_Vip } = userStore((store) => store);
  const { translations } = translationStore((store) => store);
  const navigation = useNavigation<any>();

  return (
    <HStack>
      <Box mr="2.5">
        <Image
          source={{ uri: BASE_URL_FILE_SERVER + photo }}
          style={styles.profileImg}
        />
      </Box>
      <VStack space={2} flexGrow="1">
        <HStack>
          <VStack justifyContent="space-evenly" space={1} flexGrow="1">
            <HStack space={2}>
              <Text style={styles.usernameText}>{alias}</Text>
              {is_Vip ? <Text style={styles.vipText}>VIP</Text> : null}
              {/* <HStack alignItems="center" space={1}>
                  <Text style={styles.bottomText}>轮廓</Text>
                  <Entypo
                    name="chevron-right"
                    color={GLOBAL_COLORS.primaryTextColor}
                    size={18}
                  />
                </HStack> */}
            </HStack>
            <HStack justifyContent="space-between">
              <Stack flexGrow="1">
                <Text style={styles.middleText}>
                  {translations.coin} : {data?.coins}
                </Text>
              </Stack>
              {/* <Stack flexGrow="1">
                <Text style={styles.middleText}>
                  {translations.movieTicket} : 0
                </Text>
              </Stack>
              <Stack flexGrow="1">
                <Text style={styles.middleText}>
                  {translations.watchForFree} : 0/0
                </Text>
              </Stack> */}
            </HStack>
          </VStack>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center" pr="8">
          <Pressable
            onPress={() => {
              navigation.navigate("InformationScreen", {
                postTitle: translations.liked,
                postMessage: "likes",
              });
            }}
          >
            <VStack alignItems="center">
              <Text style={styles.bottomTopText}>{data?.total_likes}</Text>
              <Text style={styles.bottomText}>{translations.like}</Text>
            </VStack>
          </Pressable>
          <Divider orientation="vertical" mx={1} h="1/2" />
          <Pressable
            onPress={() => {
              navigation.navigate("InformationScreen", {
                postTitle: translations.favorite,
                postMessage: "favorites",
              });
            }}
          >
            <VStack alignItems="center">
              <Text style={styles.bottomTopText}>{data?.total_favorites}</Text>
              <Text style={styles.bottomText}>{translations.favorite}</Text>
            </VStack>
          </Pressable>
          <Divider orientation="vertical" mx={1} h="1/2" />
          <Pressable
            onPress={() => {
              navigation.navigate("FollowedCreators", {
                postTitle: translations.followed,
                postMessage: "follow",
              });
            }}
          >
            <VStack alignItems="center">
              <Text style={styles.bottomTopText}>{data?.total_follow}</Text>
              <Text style={styles.bottomText}>{translations.follow}</Text>
            </VStack>
          </Pressable>
        </HStack>
      </VStack>
    </HStack>
  );
};
// **** USER COMPONENT END CODE **** //

// **** VIP COMPONENT START CODE **** //
const VIPStatus = () => {
  const { width } = useWindowDimensions();
  const { is_Vip, vipPeriod, _id } = userStore((store) => store);
  const { translations } = translationStore((store) => store);
  const navigation = useNavigation<any>();

  const handlePressVIP = () => {
    navigation.navigate("VIPScreen", { postTitle: translations.memberCentre });
  };

  return (
    <Box>
      <Pressable onPress={handlePressVIP}>
        <VStack my={5}>
          <HStack
            alignItems="center"
            alignSelf="flex-end"
            backgroundColor="#F09536"
            justifyContent="space-between"
            py=".5"
            pl="4"
            borderTopRightRadius={5}
            borderTopLeftRadius={20}
            space={2}
          >
            <Text style={styles.subscribe}>
              {is_Vip ? translations.renewVIP : translations.subscribeToVIP}
            </Text>
            <Entypo
              name="chevron-small-right"
              color={GLOBAL_COLORS.primaryTextColor}
              size={15}
            />
          </HStack>
          <HStack
            backgroundColor={is_Vip ? "#4a3e34" : "#363e47"}
            py={3}
            pl="2.5"
            pr="6"
            alignItems="center"
            borderLeftRadius={5}
            borderBottomRightRadius={5}
          >
            <Image
              source={is_Vip ? VIPActive : VIPNotActive}
              style={styles.vipImage}
            />
            <VStack pl={2.5} flexGrow={1}>
              {is_Vip ? (
                <Text style={[styles.vipTitle, { color: "#F09536" }]}>
                  {translations.vipPeriod} :{" "}
                  {moment(vipPeriod).format("MM/DD/YYYY")}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.vipTitle,
                    { color: GLOBAL_COLORS.primaryTextColor },
                  ]}
                >
                  {translations.notYetMember}
                </Text>
              )}
              <Text
                style={{
                  color: is_Vip ? "#DBAD7D" : "#73787F",
                  width: width < GLOBAL_SCREEN_SIZE.mobile ? width * 0.7 : null,
                }}
                numberOfLines={1}
              >
                {translations.userID} : {_id}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Pressable>
    </Box>
  );
};
// **** VIP COMPONENT END CODE **** //

// **** LANGUAGE TRANSLATION COMPONENT START CODE **** //
const LanguageTranlation = ({ setOpen, language }) => {
  const { translations } = translationStore((store) => store);
  const handlePress = (event) => {
    setOpen(true);
  };
  return (
    <Pressable onPress={handlePress}>
      <HStack py={3} pl={1} alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" space={4}>
          <Image source={LanguageImg} style={styles.langImg} />
          <Text style={styles.langText}>{translations.language}</Text>
        </HStack>
        <HStack alignItems="center" space={3}>
          <Image source={language.flag} style={styles.flagImg} />
          <Text style={styles.langText}>{language.title}</Text>
          <Entypo
            name="chevron-small-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={28}
          />
        </HStack>
      </HStack>
    </Pressable>
  );
};
// **** LANGUAGE TRANSLATION COMPONENT END CODE **** //

// **** SECTION LIST COMPONENT START CODE **** //
const LinkList = () => {
  // **** GLOBAL STATE
  const navigation = useNavigation<any>();
  const { translations } = translationStore((store) => store);
  const toast = useToast();

  const lists = [
    {
      title: translations.recordingHistory,
      icon: HistoryIcon,
      navigate: () => {
        navigation.navigate("Videos", {
          postTitle: translations.recordingHistory,
        });
      },
    },
    {
      title: translations.offlineCache,
      icon: DownloadIcon,
      navigate: () => {
        navigation.navigate("Videos", {
          postTitle: translations.offlineCache,
        });
      },
    },
    {
      title: translations.sharingPromotion,
      icon: ShareIcon,
      navigate: () => {
        navigation.navigate("SharingPromotion", {
          postTitle: translations.sharingPromotion,
        });
      },
    },
    {
      title: translations.accountCredentials,
      icon: AccountIcon,
      navigate: () => {
        navigation.navigate("AccountCredentials", {
          postTitle: translations.accountCredentials,
        });
      },
    },
    {
      title: translations.onlineService,
      icon: ServiceIcon,
      navigate: () => {
        navigation.navigate("SingleChatScreen", {
          postTitle: "Customer Service Chat",
        });
      },
    },
    // {
    //   title: translations.bestApps,
    //   icon: ApplicationIcon,
    //   navigate: () => {},
    // },
    // {
    //   title: translations.officialGroup,
    //   icon: OfficialIcon,
    //   navigate: () => {},
    // },
    {
      title: `${translations.officialEmail}: butterflyproject@gmail.com`,
      icon: EmailIcon,
      icon2: CopyIcon,
      navigate: () => {},
    },
  ];

  const handleCopy = async () => {
    await Clipboard.setStringAsync("butterflyproject@gmail.com");
    toast.show({
      description: translations.copied,
      duration: 3000,
      backgroundColor: GLOBAL_COLORS.secondaryColor,
    });
  };

  return (
    <>
      {lists.map((item, index) => (
        <Pressable onPress={item.navigate}>
          <HStack
            py={3}
            pl={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack alignItems="center" space={4}>
              <Image source={item.icon} style={styles.langImg} />
              <Text
                numberOfLines={1}
                style={[styles.langText, { width: "80%" }]}
              >
                {item.title}
              </Text>
            </HStack>
            {!!item?.icon2 ? (
              <Pressable onPress={handleCopy}>
                <Image source={item.icon2} style={styles.langImg2} />
              </Pressable>
            ) : (
              <Entypo
                name="chevron-small-right"
                color={GLOBAL_COLORS.primaryTextColor}
                size={28}
              />
            )}
          </HStack>
        </Pressable>
      ))}
    </>
  );
};
// **** SECTION LIST COMPONENT END CODE **** //

// **** DOWNLOAD COMPONENT START CODE **** //
const Download = () => {
  const { translations } = translationStore((store) => store);
  const navigation = useNavigation<any>();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Downloads", { postTitle: translations.download })
      }
    >
      <HStack py={3} pl={1} alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" space={4}>
          <Image source={SaveIcon} style={styles.langImg} />
          <Text style={styles.langText}>{translations.gotoDownload}</Text>
        </HStack>
        <HStack alignItems="center">
          <Entypo
            name="chevron-small-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={28}
          />
        </HStack>
      </HStack>
    </Pressable>
  );
};
// **** DOWNLOAD COMPONENT END CODE **** //

// **** MODAL COMPONENT START CODE **** //
const LanguageModal = ({ open, setOpen, setLanguage }) => {
  const route = useRoute<any>();
  // **** GLOBAL STATES
  const setAdsGlobalStore = adsGlobalStore((state) => state.setAdvertisement);
  const { translations, lang } = translationStore((store) => store);
  const [setLang, setTranslations] = translationStore((state) => [
    state.setLang,
    state.setTranslations,
  ]);
  // **** STATES
  const [fetch, setFetch] = useState(false);
  const [country, setCountry] = useState(lang);
  // **** API
  const { getAds } = SiteSettingsService();

  const data = [
    {
      id: "en_us",
      title: "English - US",
      image: FlagUSA,
    },
    {
      id: "zh_cn",
      title: "Chinese - China",
      image: FlagChina,
    },
  ];

  const {} = useQuery({
    queryKey: ["ads", lang],
    queryFn: () => getAds({ lang: lang === "en_us" ? "en" : "zh_cn" }),
    onSuccess: (data) => {
      if (data && data.length) {
        console.log("=== Ads Fetched from backend! ===");
        // fetch ads from backend and put into ads global store
        setAdsGlobalStore(
          // all arrays
          { photo_url: data[0].banners.photo_url, url: data[0].banners.url },
          { photo_url: data[1].banners.photo_url, url: data[1].banners.url },
          data[2].banners,
          { photo_url: data[3].banners.photo_url, url: data[3].banners.url }
        );

        // store ads to local app cache
        storeDataObject("AdvertisementCacheData", {
          localCache_fullscreen_banner: {
            photo_url: data[0].banners.photo_url,
            url: data[0].banners.url,
          },
          localCache_popup_banner: {
            photo_url: data[1].banners.photo_url,
            url: data[1].banners.url,
          },
          localCache_carousel_banner: data[2].banners,
          localCache_single_banner: {
            photo_url: data[3].banners.photo_url,
            url: data[3].banners.url,
          },
        });
      } else {
        console.log("=== No ads available. ===");
      }

      captureSuccess(route.name, "storeDataObject(AdvertisementCacheData)");
      // navigation.dispatch(StackActions.replace("TermsOfService"));
    },
    onError: (error) => {
      console.log("getAds Error", error);
      captureError(error, route.name, "queryFn: () => getAds()");
    },
    enabled: fetch,
  });

  const handleChangeLang = (item) => {
    setLang(item.id);
    setTranslations(localizations[item.id]);
    setLanguage({ title: item.title, flag: item.image });
    setCountry(item.id);
    setOpen(false);
    setFetch(true);
    storeDataString("locale", item.id);
  };

  return (
    <Modal
      mt="auto"
      mb="auto"
      closeOnOverlayClick
      isOpen={open}
      onClose={() => setOpen(false)}
      safeAreaTop={true}
      backdropVisible
      backgroundColor="#00000090"
    >
      <VStack
        py={2}
        width="2/3"
        backgroundColor="#202833"
        borderRadius={5}
        maxHeight="1/2"
      >
        <Text style={styles.modalTitle}>{translations.chooseLanguage}</Text>
        <Divider color="#202833" />
        <VStack mx={2} py={2} alignItems="center" maxHeight="96">
          <FlatList
            width="100%"
            data={data}
            keyExtractor={(_, index) => "" + index}
            renderItem={({ item, index }) => (
              <Pressable onPress={() => handleChangeLang(item)}>
                <HStack
                  key={index}
                  alignItems="center"
                  justifyContent="center"
                  space="3"
                  m={2}
                  py="1.5"
                  px="3"
                >
                  <Image source={item.image} style={styles.modalFlag} />
                  <Text
                    style={{
                      color:
                        country === item.id
                          ? GLOBAL_COLORS.secondaryColor
                          : GLOBAL_COLORS.primaryTextColor,
                    }}
                  >
                    {item.title}
                  </Text>
                </HStack>
              </Pressable>
            )}
          />
        </VStack>
      </VStack>
    </Modal>
  );
};
// **** MODAL COMPONENT END CODE **** //

const MainProfile = () => {
  const isFocus = useIsFocused();
  // ** GLOBAL STORE
  const { api_token } = userStore();
  const userStoreData = userStore((store) => store);
  const setUserStore = userStore((state) => state.setUserData);
  const { lang } = translationStore((store) => store);

  // ** STATES
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState({
    flag: lang === "en_us" ? FlagUSA : FlagChina,
    title: lang === "en_us" ? "English - US" : "Chinese - China",
  });

  // ** HOOKS
  const queryClient = useQueryClient();

  // ** API
  const { getCustomerProfile } = CustomerService();
  const { isRefetching, data } = useQuery({
    queryKey: ["customerProfile"],
    queryFn: () => getCustomerProfile(api_token),
    onSuccess: (data) => {
      console.log("onSuccess customerProfile", data);

      // Update userStore data here
      setUserStore({
        ...userStoreData,
        coins: data.coins,
        is_Vip: data.is_Vip,
        vipPeriod: data.vip,
      });
    },
    onError: (error) => {
      console.log("onError customerProfile", error);
    },
    enabled: isFocus,
  });

  // ** EVENTS
  const onRefresh = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["customerProfile"],
    });
  }, []);

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[GLOBAL_COLORS.secondaryColor]}
            refreshing={isRefetching}
            onRefresh={onRefresh}
          />
        }
      >
        <Layout>
          <Header />
          <User data={data} />
          <VIPStatus />
        </Layout>
        <Layout style={{ marginVertical: 15 }}>
          <LanguageTranlation setOpen={setOpen} language={language} />
        </Layout>
        <Layout>
          <LinkList />
        </Layout>
        <Layout style={{ marginVertical: 15 }}>
          <Download />
        </Layout>
      </ScrollView>
      <LanguageModal open={open} setOpen={setOpen} setLanguage={setLanguage} />
    </Container>
  );
};

export default MainProfile;

const styles = StyleSheet.create({
  // **** HEADER **** //
  icon: {
    marginLeft: 20,
  },
  // **** COUNTRY SELECT **** //
  container: {
    backgroundColor: GLOBAL_COLORS.primaryColor,
    borderWidth: 1,
    borderColor: GLOBAL_COLORS.primaryTextColor,
    width: 150,
    position: "relative",
  },
  dropdown: {
    height: 30,
    width: 70,
    backgroundColor: GLOBAL_COLORS.primaryColor,
    borderRadius: 22,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: GLOBAL_COLORS.primaryTextColor,
    marginRight: 10,
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
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 14,
    textAlign: "center",
  },
  iconStyle: {
    width: 30,
    height: 15,
  },
  // **** USER **** //
  profileImg: {
    height: 45,
    width: 45,
    borderRadius: 25,
  },
  vipText: {
    paddingTop: 2,
    textAlign: "center",
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#F7D3A5",
    fontSize: 10,
    marginVertical: 3,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: GLOBAL_COLORS.primaryTextColor,
  },
  middleText: {
    color: GLOBAL_COLORS.inactiveTextColor,
    fontSize: 12,
  },
  bottomTopText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomText: {
    color: GLOBAL_COLORS.inactiveTextColor,
  },
  // **** VIP STATUS **** //
  subscribe: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 14,
    textAlign: "center",
  },
  textContainer: {
    position: "absolute",
    left: 76,
    top: 30,
  },
  vipImage: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  vipTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  // **** LANGUAGE TRANSLATION **** //
  langImg: {
    height: 22,
    width: 22,
    resizeMode: "contain",
  },
  langImg2: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    marginRight: 10,
  },
  langText: {
    fontWeight: "500",
    fontSize: 14,
    color: GLOBAL_COLORS.primaryTextColor,
  },
  flagImg: {
    height: 28,
    width: 28,
    borderRadius: 14,
  },
  // **** EMAIL **** //
  emailBtn: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 2,
  },
  emailText: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  emailTextBtn: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  // **** MODAL **** //
  modalTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: GLOBAL_COLORS.primaryTextColor,
    paddingBottom: 10,
  },
  modalFlag: {
    height: 30,
    width: 30,
    borderRadius: 20,
  },
});
