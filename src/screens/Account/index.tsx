import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Linking,
} from "react-native";
import { Button, HStack, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";

import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import FlagUSA from "assets/images/Flag-USA.png";
import FlagChina from "assets/images/Flag-China.webp";
import localizations from "i18n/localizations";
import profilePhoto from "assets/images/profilePhoto.jpg";
import { GLOBAL_COLORS } from "global";
// import { profileTabSubNav } from "data/profileTabSubNav";
import { translationStore } from "../../zustand/translationStore";
import { useMutation } from "@tanstack/react-query";
import { userStore } from "../../zustand/userStore";
import { Dropdown, SelectCountry } from "react-native-element-dropdown";

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

  const renderItem = (item) => {
    return (
      <View style={{ width: 500 }}>
        <Text style={styles.imageStyle}>{item.label}</Text>

        <Image source={FlagUSA} />
      </View>
    );
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
    // <Dropdown
    //   itemContainerStyle={{ width: 500 }}
    //   containerStyle={{ width: 500, lef }}
    //   style={styles.dropdown}
    //   data={local_data}
    //   labelField="label"
    //   valueField="value"
    //   search={false}
    //   renderItem={renderItem}
    //   onChange={(e) => console.log(e)}
    // />
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

const Summary = () => {
  const navigation = useNavigation<any>();
  const translations = translationStore((store) => store.translations);

  return (
    <HStack
      justifyContent={"space-between"}
      alignItems={"center"}
      p={5}
      backgroundColor={GLOBAL_COLORS.headerBasicBg}
    >
      <HStack alignItems={"center"}>
        <Image style={styles.profileImage} source={profilePhoto} />
        <Text style={styles.givenName}>受伤的期待</Text>
      </HStack>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SingleUser", { previousScreen: "Account" })
        }
      >
        <HStack>
          <Text style={styles.homeBtn}>{translations.profile}</Text>
          <FontAwesome5
            name="angle-right"
            size={15}
            color={GLOBAL_COLORS.primaryTextColor}
          />
        </HStack>
      </TouchableOpacity>
    </HStack>
  );
};

const VIP = () => {
  const [token, isVip, userId, setVip] = userStore((state) => [
    state.api_token,
    state.is_Vip,
    state._id,
    state.setVip,
  ]);
  const { subscribeToVIP } = CustomerService();

  const { mutate: mutateSubscribe } = useMutation(subscribeToVIP, {
    onSuccess: (data) => {
      console.log("subscribeToVIP", data);

      /* Update is_vip state */
      setVip(true);
    },
    onError: (error) => {
      console.log("subscribeToVIP", error);
    },
  });

  const handlePress = () => {
    console.log("vip pressed!");
    mutateSubscribe({
      data: { amount: 200.0, title: "Diamond Privillege Card" },
      token,
    });
  };

  return (
    <View style={styles.vipContainer}>
      <Text style={styles.copyBtn}>VIP Section</Text>

      <Text style={styles.copyBtn}>User ID: {userId}</Text>
      <Text style={styles.copyBtn}>Is VIP?: {isVip.toString()}</Text>

      {!isVip && (
        <Button style={styles.btnVip} onPress={handlePress}>
          Subscribe to VIP
        </Button>
      )}
    </View>
  );
};

const LinkList = () => {
  const navigation = useNavigation<any>();
  const translations = translationStore((store) => store.translations);

  const profileTabSubNav = [
    {
      title: translations.recordingHistory,
      screen: "RecordingHistory",
    },
    {
      title: translations.offlineCache,
      screen: "OfflineCache",
    },
    {
      title: translations.sharingPromotion,
      screen: "SharingPromotion",
    },
    {
      title: translations.accountVerification,
      screen: "AccountVerification",
    },
    {
      title: translations.onlineCustomerService,
      screen: "CustomerService",
      params: {
        postTitle: "Test Sender",
        senderUserName: "Test Sender Username",
        senderMessage: "Test Sender Message",
        senderImgURL: "https://randomuser.me/api/portraits/men/3.jpg",
        senderTimeStamp: "Test Date",
      },
    },
    {
      title: translations.bestApps,
      screen: "BestApps",
    },
    {
      title: translations.officialGroup,
      screen: "OfficialGroup",
    },
  ];

  return (
    <VStack p={3} backgroundColor={GLOBAL_COLORS.headerBasicBg}>
      {profileTabSubNav?.map((item, index) => (
        <VStack key={index} p={2}>
          <TouchableOpacity
            onPress={() => {
              item.screen === "OfficialGroup"
                ? Linking.openURL("https://t.me/StockPro_Official_BankNifty")
                : item.screen === "CustomerService"
                ? navigation.navigate(`${item.screen}`, item.params)
                : navigation.navigate(`${item.screen}`);
            }}
          >
            <HStack justifyContent={"space-between"} mx={2}>
              <Text style={styles.fifthText}>{item.title}</Text>
              <FontAwesome5
                name="angle-right"
                size={20}
                color={GLOBAL_COLORS.primaryTextColor}
              />
            </HStack>
          </TouchableOpacity>
          <View style={styles.fifthHorizontalRule}></View>
        </VStack>
      ))}

      <HStack justifyContent={"center"} alignItems={"center"} p={3}>
        <Text style={styles.fifthText}>
          {translations.officialEmail} linnannan101@gmail.com
        </Text>
        <TouchableOpacity>
          <View style={styles.copyBtnContainer}>
            <Text style={styles.copyBtn}>{translations.copy}</Text>
          </View>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
};

const AccountTab = () => {
  const navigation = useNavigation<any>();
  const translations = translationStore((store) => store.translations);

  return (
    <Container>
      <Header />
      <ScrollView>
        <VStack style={{ flex: 1 }} space={4} p={3}>
          <Summary />
          <VIP />
          <LinkList />
          <Pressable
            style={styles.downloadBtn}
            onPress={() =>
              navigation.navigate("Downloads", {
                previousScreen: "Account",
              })
            }
          >
            <Text style={styles.downloadText}>{translations.gotoDownload}</Text>
          </Pressable>
        </VStack>
      </ScrollView>
    </Container>
  );
};

export default AccountTab;

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  givenName: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 15,
    fontWeight: "600",
  },
  homeBtn: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 13,
    marginRight: 5,
  },
  fifthText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 12,
  },
  fifthHorizontalRule: {
    borderBottomColor: GLOBAL_COLORS.primaryTextColor,
    borderBottomWidth: 1,
    marginTop: 10,
  },
  copyBtnContainer: {
    backgroundColor: GLOBAL_COLORS.btnColor,
    width: 55,
    height: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  copyBtn: {
    color: GLOBAL_COLORS.primaryTextColor,
    textAlign: "center",
    fontSize: 12,
  },
  vipContainer: {
    backgroundColor: GLOBAL_COLORS.headerBasicBg,
    borderRadius: 5,
    height: 120,
    flex: 1,
    justifyContent: "center",
    marginBottom: 5,
  },
  btnVip: {
    marginTop: 10,
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
  //DOWNLOAD BUTTON
  downloadBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  downloadText: {
    fontSize: 20,
    color: GLOBAL_COLORS.primaryTextColor,
    textDecorationLine: "underline",
  },
});
