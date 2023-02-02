import { Dimensions, Image, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";

import * as Linking from "expo-linking";

import Girl from "assets/images/profilePhoto.jpg";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Modal } from "native-base";
import PopupAds from "features/ads/components/PopupAds";

const adsURL = "https://google.com/";

const { width, height } = Dimensions.get("window");

const Content = ({ setOpen }) => {
  const handleAdPress = () => {
    Linking.openURL(adsURL);
  };
  return (
    <Modal.Content backgroundColor="contrastThreshold" width={width}>
      <Modal.Body alignItems="center">
        <Pressable onPress={handleAdPress}>
          <Image source={Girl} style={styles.ads} />
        </Pressable>
        <AntDesign
          name="close"
          size={25}
          color="#fff"
          style={styles.closeBtn}
          onPress={() => setOpen(false)}
        />
      </Modal.Body>
    </Modal.Content>
  );
};

const Advertisements = () => {
  const [open, setOpen] = useState(true);
  return (
    <PopupAds open={open} setOpen={setOpen}>
      <Content setOpen={setOpen} />
    </PopupAds>
  );
};

export default Advertisements;

const styles = StyleSheet.create({
  content: {
    width: width,
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
