import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import * as Linking from "expo-linking";

import Girl from "assets/images/profilePhoto.jpg";
import AntDesign from "react-native-vector-icons/AntDesign";

const adsURL = "https://google.com/";

const { width, height } = Dimensions.get("window");

const Advertisements = ({ setCloseAds }) => {
  const handleCloseAds = () => {
    setCloseAds(false);
  };
  const handleAdPress = () => {
    Linking.openURL(adsURL);
  };
  return (
    <Pressable style={styles.container} onPress={handleCloseAds}>
      <View style={styles.content}>
        <Pressable onPress={handleAdPress}>
          <Image source={Girl} style={styles.ads} />
        </Pressable>
        <AntDesign
          name="close"
          size={25}
          color="#fff"
          style={styles.closeBtn}
          onPress={handleCloseAds}
        />
      </View>
    </Pressable>
  );
};

export default Advertisements;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    marginBottom: 50,
    alignItems: "center",
  },
  ads: {
    height: 400,
    width: width,
  },
  closeBtn: {
    marginVertical: 30,
  },
});
