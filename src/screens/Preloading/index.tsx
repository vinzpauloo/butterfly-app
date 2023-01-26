import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { useState, useEffect } from "react";

import * as Linking from "expo-linking";

import adsFullscreen from "assets/images/ads-fullscreen.jpg";
import { useNavigation } from "@react-navigation/native";

const adsURL = "https://google.com/";
const { height } = Dimensions.get("window");

const Preloading = ({}) => {
  const [counter, setCounter] = useState(5);
  const navigation = useNavigation<any>();

  const handleAdPress = () => {
    Linking.openURL(adsURL);
  };

  const handleButtonpress = () => {
    !counter && navigation.navigate("BottomNav");
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <ScrollView>
      <Pressable onPress={handleAdPress}>
        <ImageBackground
          source={adsFullscreen}
          resizeMode="cover"
          style={styles.image}
        >
          <Pressable style={styles.button} onPress={handleButtonpress}>
            <Text style={styles.text}>
              {counter ? `${counter}s` : "Go to Home"}
            </Text>
          </Pressable>
        </ImageBackground>
      </Pressable>
    </ScrollView>
  );
};

export default Preloading;

const styles = StyleSheet.create({
  image: {
    height: height,
  },
  button: {
    margin: 15,
    marginLeft: "auto",
    minWidth: 60,
  },
  text: {
    backgroundColor: "#000000c0",
    borderRadius: 16,
    color: "white",
    fontSize: 12,
    lineHeight: 36,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 12,
  },
});
