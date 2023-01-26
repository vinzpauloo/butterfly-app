import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import * as Linking from "expo-linking";

import adsFullscreen from "assets/images/ads-fullscreen.jpg";
import { useNavigation } from "@react-navigation/native";

const adsURL = "https://docs.expo.dev/guides/linking/";

const Preloading = ({}) => {
  const navigation = useNavigation<any>();

  const handleAdPress = async () => {
    await Linking.openURL(adsURL);
  };

  const handleButtonpress = () => {
    console.log("Navigating to home page ...");
    navigation.navigate("BottomNav");
  };

  return (
    <Pressable style={styles.container} onPressOut={handleAdPress}>
      <ImageBackground
        source={adsFullscreen}
        resizeMode="cover"
        style={styles.image}
      >
        <Pressable style={styles.button} onPressOut={handleButtonpress}>
          <Text style={styles.text}>Go to Home</Text>
        </Pressable>
      </ImageBackground>
    </Pressable>
  );
};

export default Preloading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  button: {
    margin: 15,
    marginLeft: "auto",
  },
  text: {
    backgroundColor: "#000000c0",
    borderRadius: 12,
    color: "white",
    fontSize: 12,
    lineHeight: 36,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 12,
  },
});
