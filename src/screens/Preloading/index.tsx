import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { GLOBAL_COLORS } from "global";
import { useFullScreenBannerStore } from "../../zustand/adsGlobalStore"

const { height } = Dimensions.get("window");
const Preloading = () => {
  const navigation = useNavigation<any>();

  const handleButtonpress = () => {
    navigation.dispatch(StackActions.replace("BottomNav"));
  };

  // SUBSCRIBE TO GLOBAL STORE
  const [bannerURL, adsURL] = useFullScreenBannerStore(
    (state) => [state.photoURL, state.adsURL],
  )

  console.log(bannerURL)
  console.log(adsURL)

  return (
    <Pressable onPress={() => Linking.openURL(adsURL)}>
      <ImageBackground
        source={{ uri: bannerURL }}
        resizeMode="cover"
        style={styles.image}
      >
        <Pressable style={styles.button} onPress={handleButtonpress}>
          <Text style={styles.text}>Go to Home</Text>
        </Pressable>
      </ImageBackground>
    </Pressable>
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
  loaderContainer: {
    backgroundColor: GLOBAL_COLORS.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
