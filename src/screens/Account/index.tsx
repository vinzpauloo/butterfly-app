import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";

import Container from "components/Container";
import profilePhoto from "assets/images/profilePhoto.jpg";
import { profileTabSubNav } from "data/profileTabSubNav";

const Header = () => {
  return (
    <View style={styles.header}>
      <Fontisto name="bell" color="#fff" size={25} style={styles.icon} />
      <Ionicons
        name="settings-outline"
        color="#fff"
        size={25}
        style={styles.icon}
      />
    </View>
  );
};

const Summary = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.innerContainer}>
      <View style={styles.firstContainer}>
        <View style={styles.profilePhotoContainer}>
          <Image style={styles.profilePhoto} source={profilePhoto} />
          <View style={styles.profileDetails}>
            <View>
              <Text style={styles.profileName}>受伤的期待</Text>
              <View style={styles.coinTicketFreeWatchContainer}>
                <Text style={styles.goldCoin}>金币: 0</Text>
                <Text style={styles.profileDetails2}>观影券: 0</Text>
                <Text style={styles.profileDetails2}>免费观看 : 0</Text>
              </View>
            </View>
            <View style={styles.homeButtonContainer}>
              <Text style={styles.homeButton}>主页</Text>
              <FontAwesome5 name="angle-right" size={15} color="white" />
            </View>
          </View>
        </View>
        <View style={styles.horizontalRule}></View>
        <View style={styles.profileDetails3}>
          <Text style={styles.profileDetails3Text}>动态 0</Text>
          <Text style={styles.profileDetails3Text}>关注 0</Text>
          <Text style={styles.profileDetails3Text}>粉丝 0</Text>
        </View>
      </View>
    </View>
  );
};

const LinkList = () => {
  return (
    <View style={styles.innerContainer}>
      <View style={styles.fifthContainer}>
        {profileTabSubNav?.map((item, index) => (
          <View style={styles.sectionContainer} key={index}>
            <View style={styles.textAndBtn}>
              <Text style={styles.fifthText}>{item.title}</Text>
              <FontAwesome5 name="angle-right" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.fifthHorizontalRule}></View>
          </View>
        ))}

        <View style={styles.emailContainer}>
          <Text style={styles.fifthText}>官方邮箱linnannan101@gmail.com</Text>
          <TouchableOpacity>
            <View style={styles.copyBtnContainer}>
              <Text style={styles.copyBtn}>复制</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const AccountTab = () => {
  return (
    <Container>
      <Header />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Summary />
          <LinkList />
        </ScrollView>
      </View>
    </Container>
  );
};

export default AccountTab;

const gap = 8;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  scrollView: {
    flex: 1,
    paddingVertical: gap / -2,
  },
  container: {
    flex: 1,
    maxHeight: Dimensions.get("window").height,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  icon: {
    marginHorizontal: 10,
  },
  innerContainer: {
    marginVertical: gap / 1,
  },

  // First Container
  firstContainer: {
    backgroundColor: "#262632",
    borderRadius: 5,
    height: 100,
    flex: 1,
  },
  profilePhotoContainer: {
    flexDirection: "row",
    padding: 10,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileDetails: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
  },
  profileName: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  coinTicketFreeWatchContainer: {
    flexDirection: "row",
    paddingHorizontal: gap / -2,
  },
  goldCoin: {
    color: "white",
    fontSize: 11,
  },
  profileDetails2: {
    color: "white",
    fontSize: 11,
    marginHorizontal: gap / 2,
  },
  homeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: -100,
  },
  homeButton: {
    color: "white",
    fontSize: 13,
    marginRight: 5,
  },
  horizontalRule: {
    borderTopColor: "white",
    borderTopWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 10,
  },
  profileDetails3: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 50,
    paddingTop: 5,
  },
  profileDetails3Text: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },

  // Fifth Container
  fifthContainer: {
    backgroundColor: "#262632",
    height: 450,
    borderRadius: 5,
    padding: 12,
  },
  sectionContainer: {
    marginHorizontal: 5,
    marginTop: 10,
  },
  textAndBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 3,
  },
  fifthText: {
    color: "white",
    fontSize: 12,
  },
  fifthHorizontalRule: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginTop: 10,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  copyBtnContainer: {
    backgroundColor: "#FF474E",
    width: 55,
    height: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  copyBtn: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
});
