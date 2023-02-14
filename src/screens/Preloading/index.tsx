import { Dimensions, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import * as Linking from "expo-linking";

import { StackActions, useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

import { useQuery } from "@tanstack/react-query";
import { useSiteSettings } from "hooks/useSiteSettings";
import { globalStyle } from "globalStyles";

import { storeDataObject, getDataObject } from "services/asyncStorage"

const Preloading = () => {
  const navigation = useNavigation<any>();

  const handleButtonpress = () => {
    navigation.dispatch(StackActions.replace("BottomNav"));
  };

  const [adsURL, setadsURL] = useState(null)
  const [bannerImgURL, setbannerImgURL] = useState(null)
  const [isQueryEnable, setIsQueryEnable] = useState(false)

  // see local storage first, if local storage has cache the banner image and ads URL use it
  getDataObject("PreloadingData").then((res: any) => {
    if (res.message === "Key not found or is empty") {
      console.log("fetch")
      console.log(res)
      setIsQueryEnable(true)
    }

    else {
      console.log("local")
      console.log(res)
      setIsQueryEnable(false)
      setadsURL(res.data1)
      setbannerImgURL(res.data2)
    }
  })

  // if local storage dont have cache, fetch from backend and store locally
  const { getAds } = useSiteSettings();
  const { isLoading, isError, data, error, status } = useQuery({
    queryKey: ["ads"],
    queryFn: () => getAds(),
    onSuccess: (data) => {
      console.log("fetch was called")
      setbannerImgURL(data[0].advertisement.fullscreen_banner[0].banners[0].photo_url)
      setadsURL(data[0].advertisement.fullscreen_banner[0].banners[0].url)
      storeDataObject("PreloadingData", { data1: adsURL, data2: bannerImgURL })
    },
    onError: (error) => {
      console.log("Error", error);
    },
    enabled: isQueryEnable,
  });

  return (
    <Pressable onPress={() => Linking.openURL(adsURL)}>
      <ImageBackground source={{ uri: bannerImgURL }} resizeMode="cover" style={styles.image}>
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
    backgroundColor: globalStyle.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
