import { ImageBackground, Pressable, StyleSheet, Text } from "react-native";
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

import Container from "components/Container";
import DeviceIDBg from "assets/images/deviceIDBg.png";
import FlagUSA from "assets/images/Flag-USA.png";
import FlagChina from "assets/images/Flag-China.webp";
import localizations from "i18n/localizations";
import Profile from "assets/images/profilePhoto.jpg";
import ReferralBackground from "assets/images/referralBg.png";
import VipBanner from "assets/images/vip_banner.png";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../zustand/translationStore";
import { useNavigation } from "@react-navigation/native";

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
  return (
    <Box m={2} style={styles.mainContainer}>
      <LinearGradient colors={["#280B2B", "#280B2B", "#070307"]}>
        <VStack p={3}>
          <HStack>
            <Box mx={2} position="relative">
              <Image source={Profile} style={styles.profileImg} />
              <Text style={styles.vipText}>VIP</Text>
            </Box>
            <VStack justifyContent="space-evenly">
              <HStack w="72" justifyContent="space-between">
                <Text style={styles.usernameText}>犹豫的香气</Text>
                <HStack alignItems="center" space={1}>
                  <Text style={styles.bottomText}>轮廓</Text>
                  <Entypo
                    name="chevron-right"
                    color={GLOBAL_COLORS.primaryTextColor}
                    size={18}
                  />
                </HStack>
              </HStack>
              <HStack space={5}>
                <Text style={styles.middleText}>金币 : 0</Text>
                <Text style={styles.middleText}>电影票 : 0 </Text>
                <Text style={styles.middleText}>免费观看 : 0/0</Text>
              </HStack>
            </VStack>
          </HStack>
          <Divider bg="#7D0680" thickness="1" my={2} />
          <HStack justifyContent="space-evenly">
            <Text style={styles.bottomText}>说说 0</Text>
            <Text style={styles.bottomText}>跟随 0</Text>
            <Text style={styles.bottomText}>粉丝 0</Text>
          </HStack>
        </VStack>
      </LinearGradient>
    </Box>
  );
};

const VIP = () => {
  return (
    <Box m={1} style={styles.mainContainer}>
      <Image source={VipBanner} style={{ width: "100%", height: 90 }} />
    </Box>
  );
};

const Referral = () => {
  return (
    <Box m={2} style={styles.mainContainer}>
      <ImageBackground source={ReferralBackground} resizeMode="cover">
        <VStack alignItems="center">
          <Text style={styles.referralTitle}>输入推荐码</Text>
          <HStack mb={3} alignItems="center" space={2}>
            <Stack w="75%">
              <Input
                size="md"
                placeholder="Please enter referral code"
                style={styles.referralInput}
              />
            </Stack>
            <Pressable style={styles.referralBtn}>
              <Text style={styles.referralBtnText}>提交</Text>
            </Pressable>
          </HStack>
        </VStack>
      </ImageBackground>
    </Box>
  );
};

const DeviceID = () => {
  return (
    <Box m={2} style={styles.mainContainer}>
      <ImageBackground source={DeviceIDBg} resizeMode="cover">
        <VStack alignItems="center">
          <Text style={styles.referralTitle}>链接设备ID</Text>
          <HStack mb={3} alignItems="center" space={2}>
            <Stack w="75%">
              <Input
                size="md"
                placeholder="Please enter device ID"
                style={styles.referralInput}
              />
            </Stack>
            <Pressable style={styles.deviceIDBtn}>
              <Text style={styles.deviceIDBtnText}>提交</Text>
            </Pressable>
          </HStack>
        </VStack>
      </ImageBackground>
    </Box>
  );
};

const LinkList = () => {
  const lists = [
    "历史记录",
    "离线缓存",
    "分享推广",
    "账户凭证",
    "在线服务",
    "精品应用",
    "官方组",
  ];
  return (
    <Box m={2} style={styles.mainContainer}>
      <VStack style={styles.linkListContainer}>
        {lists.map((item, index) => (
          <HStack
            py={1}
            key={index}
            pl={5}
            pr={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text style={styles.listText}>{item}</Text>
            <Entypo
              name="chevron-right"
              color={GLOBAL_COLORS.primaryTextColor}
              size={30}
            />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

const Email = () => {
  return (
    <HStack my={1} mb={3} alignItems="center" justifyContent="center" space={5}>
      <Text style={styles.emailText}>官方邮箱butterflyproject@gmail.com</Text>
      <Pressable style={styles.emailBtn}>
        <Text style={styles.emailTextBtn}>复制</Text>
      </Pressable>
    </HStack>
  );
};

const index = () => {
  return (
    <Container>
      <Header />
      <ScrollView>
        <User />
        <VIP />
        <Referral />
        <DeviceID />
        <LinkList />
        <Email />
      </ScrollView>
    </Container>
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
    backgroundColor: "#c6f348",
    borderWidth: 1,
    borderColor: GLOBAL_COLORS.primaryTextColor,
    height: 45,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  deviceIDBtnText: {
    color: "#4A0075",
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
    backgroundColor: "#ae1128",
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
});
