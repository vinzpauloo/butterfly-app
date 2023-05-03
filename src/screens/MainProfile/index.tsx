import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import {
  Actionsheet,
  Box,
  Center,
  Divider,
  HStack,
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
import NotVIPImage from "assets/images/not_vip.png";
import NotVIPDiamondImage from "assets/images/not_vip_diamond.png";
import OfficialIcon from "assets/images/official_icon.png";
import SaveIcon from "assets/images/save_icon.png";
import ServiceIcon from "assets/images/service_icon.png";
import ShareIcon from "assets/images/share_icon.png";
import VIPImage from "assets/images/vip.png";
import VIPDiamondImage from "assets/images/vip_diamond.png";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../zustand/translationStore";
import { userStore } from "../../zustand/userStore";
import { useNavigation } from "@react-navigation/native";

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
        <HStack justifyContent="space-evenly">
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
    <Box p={1} style={styles.mainContainer} position="relative">
      <Pressable onPress={handlePressVIP}>
        <Image
          source={is_Vip ? VIPDiamondImage : NotVIPDiamondImage}
          style={styles.diamondImg}
        />
        <ImageBackground
          source={is_Vip ? VIPImage : NotVIPImage}
          style={{ width: "100%", height: 90 }}
        >
          <View style={styles.subscribeContainer}>
            <Text style={styles.subscribe}>
              {is_Vip ? translations.renewVIP : translations.subscribeToVIP}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.vipTitle}>
              {translations.vipPeriod} :{" "}
              {is_Vip ? "2023-05-19" : translations.notYetMember}
            </Text>
            <Text style={styles.vipSubtitle}>
              {translations.userID} : {_id}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </Box>
  );
};
// **** VIP COMPONENT END CODE **** //

// **** LANGUAGE TRANSLATION COMPONENT START CODE **** //
const LanguageTranlation = ({ onOpen, language }) => {
  const { translations } = translationStore((store) => store);
  const handlePress = (event) => {
    onOpen(event);
  };
  return (
    <Pressable onPress={handlePress}>
      <HStack
        py={3}
        pl={6}
        pr={3}
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
            pr={3}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack alignItems="center" space="xl">
              <Image source={item.icon} style={styles.langImg} />
              <Text style={styles.langText}>{item.title}</Text>
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
      ))}
    </>
  );
};
// **** SECTION LIST COMPONENT END CODE **** //

// **** DOWNLOAD COMPONENT START CODE **** //
const Download = () => {
  const { translations } = translationStore((store) => store);
  return (
    <HStack
      py={3}
      pl={6}
      pr={3}
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
const LanguageModal = ({ isOpen, onClose, setLanguage }) => {
  const { translations } = translationStore((store) => store);
  const [country, setCountry] = useState("en_us");
  const [flag, setFlag] = useState("");
  const [title, setTitle] = useState("");
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
    setCountry(item.id);
    setFlag(item.image);
    setTitle(item.title);
  };

  const handleSave = (event) => {
    setLang(country);
    setTranslations(localizations[country]);
    setLanguage({ title, flag });
    onClose(event);
  };

  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content backgroundColor="#202833">
          <VStack width="full">
            <Text style={styles.modalTitle}>{translations.chooseLanguage}</Text>
            <Divider color="#202833" />
            <Box mx={2} flexDirection="row" flexWrap="wrap" py={2}>
              {data.map((item, index) => (
                <Pressable onPress={() => handleChangeLang(item)}>
                  <HStack
                    key={index}
                    width="40"
                    alignItems="center"
                    space="3"
                    m={2}
                    background="#272e39"
                    py="1.5"
                    px="3"
                    borderRadius="5"
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
              ))}
            </Box>
            <Pressable onPress={handleSave}>
              <Text style={styles.buttonText}>{translations.choose}</Text>
            </Pressable>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};
// **** MODAL COMPONENT END CODE **** //

const index = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [language, setLanguage] = useState({
    flag: FlagUSA,
    title: "English - US",
  });

  return (
    <Container>
      <ScrollView>
        <Layout>
          <Header />
          <User />
          <VIPStatus />
        </Layout>
        <Layout my={5}>
          <LanguageTranlation onOpen={onOpen} language={language} />
        </Layout>
        <Layout>
          <LinkList />
        </Layout>
        <Layout my={5}>
          <Download />
        </Layout>
        <Email />
      </ScrollView>
      <LanguageModal
        isOpen={isOpen}
        onClose={onClose}
        setLanguage={setLanguage}
      />
    </Container>
  );
};

export default index;

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
  },
  // **** VIP STATUS **** //
  diamondImg: {
    position: "absolute",
    zIndex: 10,
    left: 18,
    top: 30,
  },
  subscribeContainer: {
    position: "absolute",
    right: 30,
    top: 0,
  },
  subscribe: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 16,
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
  buttonText: {
    color: GLOBAL_COLORS.primaryTextColor,
    backgroundColor: "#c60000",
    padding: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 5,
  },
});
