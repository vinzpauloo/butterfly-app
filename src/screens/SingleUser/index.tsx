import React from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Container from "components/Container";
import Banner2 from "assets/images/banner2.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const ProfileBanner = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.bannerContainer}>
      <ImageBackground
        source={Banner2}
        resizeMode="cover"
        style={styles.bgImg}
      />
      <Ionicons
        name="chevron-back"
        color="#fff"
        size={30}
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
      <Ionicons
        name="md-chatbox-ellipses-outline"
        color="#fff"
        size={25}
        style={styles.messageIcon}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const index = () => {
  return (
    <Container>
      <ProfileBanner />
      <Text>index</Text>
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  //ProfileBanner
  bannerContainer: {
    height: height * 0.35,
    width: width,
    position: "relative",
  },
  bgImg: {
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.35,
    width: width,
    position: "absolute",
  },
  backIcon: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  messageIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    transform: [{ scaleX: -1 }],
  },
});
