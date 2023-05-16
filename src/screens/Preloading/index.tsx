import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  AppState,
  BackHandler,
  useWindowDimensions,
} from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { GLOBAL_COLORS } from "global";
import { adsGlobalStore } from "../../zustand/adsGlobalStore";
import { useState } from "react";
import * as Updates from "expo-updates";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

const Preloading = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const [appState, setAppState] = useState(AppState.currentState);
  const [backWasPressed, setBackWasPressed] = useState(false);

  const goToMainHome = () => {
    navigation.dispatch(StackActions.replace("BottomNav"));
  };

  // subscribe to ads global store
  const fullscreen_banner = adsGlobalStore((state) => state.fullscreen_banner);

  let imgURL = fullscreen_banner.photo_url;
  let adsURL = fullscreen_banner.url;

  const handleAppStateChange = (nextAppState) => {
    if (
      backWasPressed &&
      appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // reloads the app on coming back from tab
      Updates.reloadAsync();
    }
    setAppState(nextAppState);
  };

  AppState.addEventListener("change", handleAppStateChange);

  BackHandler.addEventListener("hardwareBackPress", () => {
    setBackWasPressed(true);
    navigation.navigate("OnAppExitScreen");
    BackHandler.exitApp();
    // if possible change the - animation: "slide_from_right"
    // in StackScreen options, specifically for "OnAppExitScreen" to fade instead
    return true;
  });

  return (
    <Pressable onPress={() => Linking.openURL(adsURL)}>
      <ImageBackground
        source={{ uri: BASE_URL_FILE_SERVER + imgURL }}
        resizeMode="cover"
        style={{ height: height }}
      >
        <Pressable style={styles.button} onPress={goToMainHome}>
          <Text style={styles.text}>Go to Home</Text>
        </Pressable>
      </ImageBackground>
    </Pressable>
  );
};

export default Preloading;

const styles = StyleSheet.create({
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
  loaderContainer: {
    backgroundColor: GLOBAL_COLORS.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
