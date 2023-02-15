import React from "react";
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
import { HStack, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";

import Container from "components/Container";
import profilePhoto from "assets/images/profilePhoto.jpg";
import { profileTabSubNav } from "data/profileTabSubNav";
import { GLOBAL_COLORS } from "global";

const Header = () => {
  const navigation = useNavigation<any>();

  const handlePressSettings = () => {
    navigation.navigate("Settings", { postTitle: "设置" });
  };

  return (
    <HStack justifyContent={"flex-end"} pr={2}>
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
          <Text style={styles.homeBtn}>主页</Text>
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
  return (
    <View style={styles.vipContainer}>
      <Text style={styles.copyBtn}>VIP Section</Text>
    </View>
  );
};

const LinkList = () => {
  const navigation = useNavigation<any>();

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
        <Text style={styles.fifthText}>官方邮箱linnannan101@gmail.com</Text>
        <TouchableOpacity>
          <View style={styles.copyBtnContainer}>
            <Text style={styles.copyBtn}>复制</Text>
          </View>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
};

const AccountTab = () => {
  return (
    <Container>
      <Header />
      <ScrollView>
        <VStack style={{ flex: 1 }} space={4} p={3}>
          <Summary />
          <VIP />
          <LinkList />
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
    height: 80,
    flex: 1,
    justifyContent: "center",
    marginBottom: 5,
  },
});
