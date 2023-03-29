import React from "react";
import { StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import * as Linking from "expo-linking";
import { adsGlobalStore } from "../../../zustand/adsGlobalStore";

type Props = {};

const BannerAds = (props: Props) => {
  // subscribe to ads global store
  const single_banner = adsGlobalStore((state) => state.single_banner);

  let imgURL = single_banner.photo_url;
  let adsURL = single_banner.url;

  return (
    <TouchableWithoutFeedback onPress={() => Linking.openURL(adsURL)}>
      <Image
        style={styles.bannerAds}
        source={{ uri: imgURL, cache: "only-if-cached" }}
        resizeMode={"cover"}
      />
    </TouchableWithoutFeedback>
  );
};

export default BannerAds;

const styles = StyleSheet.create({
  bannerAds: {
    height: 100,
  },
});
