import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";

import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import {
  Box,
  Divider,
  FlatList,
  HStack,
  Modal,
  VStack,
  useDisclose,
} from "native-base";

import AccountIcon from "assets/images/account_icon.png";
import ApplicationIcon from "assets/images/application_icon.png";
import Container from "components/Container";
import DownloadIcon from "assets/images/download_icon.png";
import Entypo from "react-native-vector-icons/Entypo";
import FlagUSA from "assets/images/Flag-USA.png";
import FlagChina from "assets/images/Flag-China.webp";
import Fontisto from "react-native-vector-icons/Fontisto";
import HistoryIcon from "assets/images/history_icon.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import LanguageImg from "assets/images/language.png";
import localizations from "i18n/localizations";
import NotVIPDiamondImage from "assets/images/not_vip_diamond.png";
import OfficialIcon from "assets/images/official_icon.png";
import SaveIcon from "assets/images/save_icon.png";
import ServiceIcon from "assets/images/service_icon.png";
import ShareIcon from "assets/images/share_icon.png";
import VIPDiamondImage from "assets/images/vip_diamond.png";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../zustand/translationStore";
import { userStore } from "../../zustand/userStore";
import { useNavigation } from "@react-navigation/native";
import UserService from "services/api/UserService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CustomerService from "services/api/CustomerService";

// **** COMPONENTS START **** //
const Layout = (props) => {
  return (
    <VStack backgroundColor="#202833" borderRadius={5} {...props}>
      {props.children}
    </VStack>
  );
};
// **** COMPONENTS END **** //

// **** HEADER COMPONENT START CODE **** //
const Header = () => {
  const navigation = useNavigation<any>();

  const handlePressSettings = () => {
    navigation.navigate("Settings", { postTitle: "设置" });
  };

  return (
    <HStack py={2} justifyContent={"flex-end"} pr={2} alignItems="center">
      <Fontisto name="bell" color="#fff" size={25} style={styles.icon} />
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
const User = () => {
  const { alias, photo, is_Vip } = userStore((store) => store);
  const { translations } = translationStore((store) => store);

  return (
    <Box style={styles.mainContainer}>
      <VStack p={3}>
        <HStack>
          <Box ml="3" mr="2.5" position="relative">
            <Image
              source={{ uri: BASE_URL_FILE_SERVER + photo }}
              style={styles.profileImg}
            />
            {is_Vip ? <Text style={styles.vipText}>VIP</Text> : null}
          </Box>
          <VStack justifyContent="space-evenly">
            <HStack w="72" justifyContent="space-between">
              <Text style={styles.usernameText}>{alias}</Text>
              {/* <HStack alignItems="center" space={1}>
                  <Text style={styles.bottomText}>轮廓</Text>
                  <Entypo
                    name="chevron-right"
                    color={GLOBAL_COLORS.primaryTextColor}
                    size={18}
                  />
                </HStack> */}
            </HStack>
            <HStack space={5}>
              <Text style={styles.middleText}>{translations.coin} : 0</Text>
              <Text style={styles.middleText}>
                {translations.movieTicket} : 0
              </Text>
              <Text style={styles.middleText}>
                {translations.watchForFree} : 0/0
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <Divider bg="#565656" thickness="1" my={2} />
        <HStack justifyContent="space-evenly" ml="9">
          <Text style={styles.bottomText}>{translations.talkAbout} : 0</Text>
          <Text style={styles.bottomText}>{translations.follow} : 0</Text>
          <Text style={styles.bottomText}>{translations.fan} : 0</Text>
        </HStack>
      </VStack>
    </Box>
  );
};
// **** USER COMPONENT END CODE **** //

// **** VIP COMPONENT START CODE **** //
const VIPStatus = () => {
  const { is_Vip, _id } = userStore((store) => store);
  const { translations } = translationStore((store) => store);
  const navigation = useNavigation<any>();

  const handlePressVIP = () => {
    navigation.navigate("VIPScreen", { postTitle: translations.memberCentre });
  };

  return (
    <Box p={1} style={styles.mainContainer}>
      <Pressable onPress={handlePressVIP}>
        <VStack m={1}>
          <Box
            alignSelf="flex-end"
            backgroundColor="#EF9535"
            py=".5"
            px="4"
            borderTopRightRadius={5}
            borderTopLeftRadius={20}
          >
            <Text style={styles.subscribe}>
              {is_Vip ? translations.renewVIP : translations.subscribeToVIP}
            </Text>
          </Box>
          <HStack
            backgroundColor={is_Vip ? "#694C2A" : "#373E48"}
            py={3}
            px="2.5"
            alignItems="center"
            borderLeftRadius={5}
            borderBottomRightRadius={5}
          >
            <Image source={is_Vip ? VIPDiamondImage : NotVIPDiamondImage} />
            <VStack pl={2.5}>
              <Text style={styles.vipTitle}>
                {translations.vipPeriod} :{" "}
                {is_Vip ? "2023-05-19" : translations.notYetMember}
              </Text>
              <Text style={styles.vipSubtitle}>
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
      <HStack
        py={3}
        pl={6}
        pr={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack alignItems="center" space="xl">
          <Image source={LanguageImg} style={styles.langImg} />
          <Text style={styles.langText}>{translations.language}</Text>
        </HStack>
        <HStack alignItems="center" space={3}>
          <Image source={language.flag} style={styles.flagImg} />
          <Text style={styles.langText}>{language.title}</Text>
          <Entypo
            name="chevron-right"
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
  const navigation = useNavigation<any>();
  const { translations } = translationStore((store) => store);

  const lists = [
    {
      title: translations.recordingHistory,
      icon: HistoryIcon,
      navigate: () => {},
    },
    {
      title: translations.offlineCache,
      icon: DownloadIcon,
      navigate: () => {},
    },
    {
      title: translations.sharingPromotion,
      icon: ShareIcon,
      navigate: () => {},
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
      navigate: () => {},
    },
    {
      title: translations.bestApps,
      icon: ApplicationIcon,
      navigate: () => {},
    },
    {
      title: translations.officialGroup,
      icon: OfficialIcon,
      navigate: () => {},
    },
  ];
  return (
    <>
      {lists.map((item, index) => (
        <Pressable onPress={item.navigate}>
          <HStack
            py={3}
            pl={6}
            pr={4}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack alignItems="center" space="xl">
              <Image source={item.icon} style={styles.langImg} />
              <Text style={styles.langText}>{item.title}</Text>
            </HStack>
            <Entypo
              name="chevron-right"
              color={GLOBAL_COLORS.primaryTextColor}
              size={28}
            />
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
      <HStack
        py={3}
        pl={6}
        pr={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack alignItems="center" space="xl">
          <Image source={SaveIcon} style={styles.langImg} />
          <Text style={styles.langText}>{translations.recordingHistory}</Text>
        </HStack>
        <HStack alignItems="center">
          <Entypo
            name="chevron-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={28}
          />
        </HStack>
      </HStack>
    </Pressable>
  );
};
// **** DOWNLOAD COMPONENT END CODE **** //

// **** EMAIL COMPONENT START CODE **** //
const Email = () => {
  const { translations } = translationStore((store) => store);
  return (
    <HStack mb={3} alignItems="center" justifyContent="center" space={5}>
      <Text style={styles.emailText}>
        {translations.officialEmail}: butterflyproject@gmail.com
      </Text>
      <Pressable style={styles.emailBtn}>
        <Text style={styles.emailTextBtn}>{translations.copy}</Text>
      </Pressable>
    </HStack>
  );
};
// **** EMAIL COMPONENT END CODE **** //

// **** MODAL COMPONENT START CODE **** //
const LanguageModal = ({ open, setOpen, setLanguage }) => {
  const { translations } = translationStore((store) => store);
  const [country, setCountry] = useState("en_us");
  const [setLang, setTranslations] = translationStore((state) => [
    state.setLang,
    state.setTranslations,
  ]);

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

  const handleChangeLang = (item) => {
    setLang(item.id);
    setTranslations(localizations[item.id]);
    setLanguage({ title: item.title, flag: item.image });
    setCountry(item.id);
    setOpen(false);
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
  // ** GLOBAL STORE
  const { api_token } = userStore();
  const userStoreData = userStore((store) => store);
  const setUserStore = userStore((state) => state.setUserData);

  // ** STATES
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState({
    flag: FlagUSA,
    title: "English - US",
  });

  // ** HOOKS
  const queryClient = useQueryClient();

  // ** API
  const { getCustomerProfile } = CustomerService();
  const { isRefetching } = useQuery({
    queryKey: ["customerProfile"],
    queryFn: () => getCustomerProfile(api_token),
    onSuccess: (data) => {
      console.log("onSuccess customerProfile", data);

      // Update userStore data here
      setUserStore({
        ...userStoreData,
        coins: data.coins,
        is_Vip: data.is_Vip,
      });
    },
    onError: (error) => {
      console.log("onError customerProfile", error);
    },
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
          <User />
          <VIPStatus />
        </Layout>
        <Layout my={5}>
          <LanguageTranlation setOpen={setOpen} language={language} />
        </Layout>
        <Layout>
          <LinkList />
        </Layout>
        <Layout my={5}>
          <Download />
        </Layout>
        <Email />
      </ScrollView>
      <LanguageModal open={open} setOpen={setOpen} setLanguage={setLanguage} />
    </Container>
  );
};

export default MainProfile;

const styles = StyleSheet.create({
  // **** HEADER **** //
  icon: {
    marginHorizontal: 10,
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
  mainContainer: {
    borderRadius: 10,
  },
  profileImg: {
    height: 45,
    width: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: GLOBAL_COLORS.primaryTextColor,
  },
  vipText: {
    position: "absolute",
    bottom: -3,
    left: 14,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 10,
    fontWeight: "bold",
  },
  usernameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: GLOBAL_COLORS.primaryTextColor,
  },
  middleText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 12,
  },
  bottomText: {
    color: GLOBAL_COLORS.primaryTextColor,
    paddingLeft: 3,
  },
  // **** VIP STATUS **** //
  subscribe: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 16,
    textAlign: "center",
  },
  textContainer: {
    position: "absolute",
    left: 76,
    top: 30,
  },
  vipTitle: {
    fontSize: 20,
    color: GLOBAL_COLORS.primaryTextColor,
    fontWeight: "bold",
  },
  vipSubtitle: { color: GLOBAL_COLORS.primaryTextColor },
  // **** LANGUAGE TRANSLATION **** //
  langImg: {
    height: 28,
    width: 28,
    resizeMode: "contain",
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
