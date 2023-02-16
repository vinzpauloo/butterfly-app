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
import { adsGlobalStore } from "../../zustand/adsGlobalStore"

const { height } = Dimensions.get("window");
const Preloading = () => {
  const navigation = useNavigation<any>();

  const goToMainHome = () => {
    navigation.dispatch(StackActions.replace("BottomNav"));
  };

  // subscribe to ads global store
  const [fullscreen_banner] = adsGlobalStore(
    (state) => [state.fullscreen_banner],
  )

  let imgURL = ""
  let adsURL = ""
  
  fullscreen_banner.map((item: any) => {
    imgURL = item.photo_url
    adsURL = item.url
  })

  return (
    <Pressable onPress={() => Linking.openURL(adsURL)}>
      <ImageBackground
        source={{ uri: imgURL }}
        resizeMode="cover"
        style={styles.image}
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
