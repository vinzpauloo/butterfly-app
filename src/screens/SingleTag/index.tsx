import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Banner10 from "assets/images/banner10.jpg";
import SingleTagTabs from "./tabs/SingleTagTabs";
import { translationStore } from "../../zustand/translationStore";

const { height, width } = Dimensions.get("window");

const ProfileBanner = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const translations = translationStore((state) => state.translations);

  return (
    <View style={styles.bannerContainer}>
      <ImageBackground
        source={Banner10}
        resizeMode="cover"
        style={styles.bgImg}
      />
      <View style={styles.bannerContent}>
        <Ionicons
          name="chevron-back"
          color="#fff"
          size={30}
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{route.params?.tag}</Text>
          <Text style={styles.description}>{translations.like}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleTag = () => {
  return (
    <>
      <ProfileBanner />
      <SingleTagTabs />
    </>
  );
};

export default SingleTag;

const styles = StyleSheet.create({
  bannerContainer: {
    height: height * 0.15,
    width: width,
    position: "relative",
  },
  bgImg: {
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.15,
    width: width,
    position: "absolute",
  },
  bannerContent: {
    backgroundColor: "rgba(0,0,0, 0.3)",
    height: height * 0.15,
    width: width,
    position: "relative",
  },
  backIcon: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  descriptionContainer: {
    marginLeft: 15,
    marginTop: 45,
  },
  description: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 36,
  },
});
