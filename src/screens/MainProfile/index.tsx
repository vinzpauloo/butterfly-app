import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { SelectCountry } from "react-native-element-dropdown";
import {
  Box,
  Divider,
  HStack,
  Image,
  Input,
  ScrollView,
  Stack,
  VStack,
} from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { storeDataObject } from "lib/asyncStorage";

import AccountIcon from "assets/images/account_icon.png";
import ApplicationIcon from "assets/images/application_icon.png";
import ButterflyLogo from "assets/images/butterflyLogo.png";
import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import DeviceIDBg from "assets/images/deviceIDBg.png";
import DownloadIcon from "assets/images/download_icon.png";
import FlagUSA from "assets/images/Flag-USA.png";
import FlagChina from "assets/images/Flag-China.webp";
import HistoryIcon from "assets/images/history_icon.png";
import localizations from "i18n/localizations";
import NotVIPImage from "assets/images/not_vip.png";
import OfficialIcon from "assets/images/official_icon.png";
import ReferralBackground from "assets/images/referralBg.png";
import ServiceIcon from "assets/images/service_icon.png";
import ShareIcon from "assets/images/share_icon.png";
import VipBanner from "assets/images/vip_banner.png";
import VIPImage from "assets/images/vip.png";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../zustand/translationStore";
import { useNavigation } from "@react-navigation/native";
import { userStore } from "../../zustand/userStore";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

const { height, width } = Dimensions.get("window");

// Change Language
const Intl = () => {
  const local_data = [
    {
      value: "1",
      label: "English - US",
      image: FlagUSA,
    },
    {
      value: "2",
      label: "Chinese - China",
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
        return "en_us";
      case "2":
        return "zh_cn";
      default:
        return "en_us";
    }
  };

  const toggleSwitch = (event) => {
    setCountry(event.value);

    let newLang = changeLanguage(event.value);
    setLang(newLang);
    setTranslations(localizations[newLang]);
  };

  return (
    <SelectCountry
      style={styles.dropdown}
      activeColor={GLOBAL_COLORS.inactiveTextColor}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      containerStyle={styles.container}
      imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      maxHeight={200}
      value={country}
      data={local_data}
      valueField="value"
      labelField="label"
      imageField="image"
      onChange={(event) => {
        toggleSwitch(event);
      }}
    />
  );
};

const Header = () => {
  const navigation = useNavigation<any>();

  const handlePressSettings = () => {
    navigation.navigate("Settings", { postTitle: "设置" });
  };

  return (
    <HStack justifyContent={"flex-end"} pr={2} alignItems="center">
      <Intl />
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

const User = () => {
  const { alias, photo } = userStore((store) => store);
  const { translations } = translationStore((store) => store);

  return (
    <Box m={2} style={styles.mainContainer}>
      <LinearGradient colors={["#280B2B", "#280B2B", "#070307"]}>
        <VStack p={3}>
          <HStack>
            <Box mx={2} position="relative">
              <Image
                source={{ uri: BASE_URL_FILE_SERVER + photo }}
                style={styles.profileImg}
              />
              <Text style={styles.vipText}>VIP</Text>
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
          <Divider bg="#7D0680" thickness="1" my={2} />
          <HStack justifyContent="space-evenly">
            <Text style={styles.bottomText}>{translations.talkAbout} : 0</Text>
            <Text style={styles.bottomText}>{translations.follow} : 0</Text>
            <Text style={styles.bottomText}>{translations.fan} : 0</Text>
          </HStack>
        </VStack>
      </LinearGradient>
    </Box>
  );
};

const VIPStatus = () => {
  const { is_Vip, _id } = userStore((store) => store);
  const { translations } = translationStore((store) => store);
  const navigation = useNavigation<any>();

  const handlePressVIP = () => {
    navigation.navigate("VIPScreen", { postTitle: translations.memberCentre });
  };

  return (
    <Box m={1} style={styles.mainContainer} position="relative">
      <Pressable onPress={handlePressVIP}>
        <ImageBackground
          source={is_Vip ? VIPImage : NotVIPImage}
          style={{ width: "100%", height: 90 }}
        >
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

const VIP = () => {
  const navigation = useNavigation<any>();
  const { translations } = translationStore((store) => store);

  const handlePressVIP = () => {
    navigation.navigate("VIPScreen", { postTitle: translations.memberCentre });
  };

  return (
    <Box m={1} style={styles.mainContainer}>
      <Pressable onPress={handlePressVIP}>
        <Image source={VipBanner} style={{ width: "100%", height: 90 }} />
      </Pressable>
    </Box>
  );
};

const DeviceID = ({ scannedID, setScanned }) => {
  const { translations } = translationStore((store) => store);
  const handlePress = () => {
    setScanned(true);
  };
  return (
    <Box m={2} style={styles.mainContainer} position="relative">
      <ImageBackground source={DeviceIDBg} resizeMode="cover">
        <VStack alignItems="center" py={2}>
          <Text style={styles.referralTitle}>
            {translations.bindingInformation}
          </Text>
          <Stack w="90%" mb={2}>
            <Input
              value={scannedID}
              size="md"
              placeholder={translations.agentAccount}
              style={styles.referralInput}
            />
          </Stack>
          <Stack w="90%" mb={2}>
            <Input
              value={scannedID}
              size="md"
              placeholder={translations.pleaseEnterPhoneNumber}
              style={styles.referralInput}
            />
          </Stack>
          <Pressable style={styles.deviceIDBtn} onPress={handlePress}>
            <Text style={styles.deviceIDBtnText}>{translations.submit}</Text>
          </Pressable>
        </VStack>
      </ImageBackground>
    </Box>
  );
};

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
    <Box m={2} style={styles.mainContainer}>
      <VStack style={styles.linkListContainer}>
        {lists.map((item, index) => (
          <Pressable onPress={item.navigate}>
            <HStack
              py={1}
              key={index}
              pl={5}
              pr={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack alignItems="center">
                <Image source={item.icon} style={styles.linkIcon} />
                <Text style={styles.listText}>{item.title}</Text>
              </HStack>
              <Entypo
                name="chevron-right"
                color={GLOBAL_COLORS.primaryTextColor}
                size={30}
              />
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </Box>
  );
};

const Email = () => {
  const { translations } = translationStore((store) => store);
  return (
    <HStack my={1} mb={3} alignItems="center" justifyContent="center" space={5}>
      <Text style={styles.emailText}>
        {translations.officialEmail}: butterflyproject@gmail.com
      </Text>
      <Pressable style={styles.emailBtn}>
        <Text style={styles.emailTextBtn}>{translations.copy}</Text>
      </Pressable>
    </HStack>
  );
};

const index = () => {
  const [scanned, setScanned] = useState(false);
  const [scannedID, setScannedID] = useState("");
  const { bindDevice } = CustomerService();
  const token = userStore((store) => store.api_token);
  const setUserStore = userStore((state) => state.setUserData);

  const { mutate } = useMutation(bindDevice, {
    onSuccess: (data) => {
      const userData = {
        _id: data.desired_account._id,
        site_id: data.desired_account.site_id,
        api_token: data.desired_account.api_token,
        alias: data.desired_account.alias,
        is_Vip: data.desired_account.is_Vip,
        photo: data.desired_account.photo,
      };

      // set user global store
      setUserStore(userData);

      // store user to device storage
      storeDataObject("UserCacheData", userData);
    },
    onError: (error) => {
      console.log("Bind Device", error);
    },
  });

  const handleBarCodeScanned = ({ type, data }) => {
    setScannedID(data);
    setScanned(false);
    mutate({ data: { id: data }, token });
  };

  return (
    <>
      <Container>
        <Header />
        <ScrollView>
          <User />
          <VIPStatus />
          <VIP />
          {/* <Referral /> */}
          <DeviceID scannedID={scannedID} setScanned={setScanned} />
          <LinkList />
          <Email />
        </ScrollView>
      </Container>

      {scanned ? (
        <VStack
          alignItems="center"
          height={height}
          width={width}
          backgroundColor={GLOBAL_COLORS.primaryColor}
        >
          <Text style={styles.mainHeader}>二维码扫描</Text>
          <Text style={styles.title}>The Butterfly Project</Text>
          <Text style={styles.subtitle}>蝴蝶计划</Text>
          <Box alignItems="center" mt={20} style={styles.scannerContent}>
            <Image source={ButterflyLogo} style={styles.butterflyLogo} />
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={{ height: 300, width: 300 }}
            />
          </Box>
          <Pressable style={styles.button} onPress={() => setScanned(false)}>
            <Text style={styles.buttonText}>停止扫描</Text>
          </Pressable>
        </VStack>
      ) : null}
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  // HEADER
  icon: {
    marginHorizontal: 10,
  },
  // COUNTRY SELECT
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
  // VIP STATUS
  textContainer: {
    position: "absolute",
    left: 90,
    top: 30,
  },
  vipTitle: {
    fontSize: 20,
    color: GLOBAL_COLORS.primaryTextColor,
    fontWeight: "bold",
  },
  vipSubtitle: { color: GLOBAL_COLORS.primaryTextColor },
  // USER
  mainContainer: {
    borderRadius: 10,
  },
  profileImg: {
    height: 50,
    width: 50,
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
  //REFERRAL
  referralTitle: {
    fontSize: 20,
    color: GLOBAL_COLORS.primaryTextColor,
    fontWeight: "bold",
    marginVertical: 5,
  },
  referralInput: {
    backgroundColor: GLOBAL_COLORS.primaryTextColor,
  },
  referralBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00b7e6",
    borderWidth: 1,
    borderColor: GLOBAL_COLORS.primaryTextColor,
    height: 45,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  referralBtnText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontWeight: "bold",
  },
  // DEVICE ID
  deviceIDBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#72E6FF",
    borderWidth: 1,
    borderColor: GLOBAL_COLORS.primaryTextColor,
    height: 30,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  deviceIDBtnText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontWeight: "bold",
  },
  // LINK LIST
  linkListContainer: {
    backgroundColor: "#220a24",
  },
  listText: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  // EMAIL
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
  // SCANNER
  mainHeader: {
    width: "100%",
    textAlign: "center",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 1,
    borderBottomColor: "#EF44BF",
    color: GLOBAL_COLORS.primaryTextColor,
  },
  linkIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginRight: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: GLOBAL_COLORS.primaryTextColor,
  },
  subtitle: {
    fontWeight: "bold",
    color: GLOBAL_COLORS.primaryTextColor,
    marginBottom: 30,
  },
  scannerContent: {
    width: 300,
    borderWidth: 1,
    borderColor: GLOBAL_COLORS.primaryTextColor,
    paddingVertical: 25,
    borderRadius: 20,
  },
  butterflyLogo: {
    position: "absolute",
    height: 94,
    width: 94,
    top: -80,
  },
  button: {
    marginBottom: 120,
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    zIndex: 15,
    marginTop: 20,
    width: 200,
  },
  buttonText: { color: "#FFF", fontSize: 20, textAlign: "center" },
});
