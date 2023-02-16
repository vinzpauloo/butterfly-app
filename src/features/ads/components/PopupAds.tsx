import { Dimensions, Image, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";

import * as Linking from "expo-linking";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Modal } from "native-base";

import CustomModal from "components/CustomModal";
import { adsGlobalStore } from "../../../zustand/adsGlobalStore";

const { width } = Dimensions.get("window");

const Content = ({ setOpen }) => {

  // subscribe to ads global store
  const [popup_banner] = adsGlobalStore(
    (state) => [state.popup_banner],
  )

  let imgURL = ""
  let adsURL = ""

  popup_banner.map((item: any) => {
    imgURL = item.photo_url
    adsURL = item.url
  })

  return (
    <Modal.Content backgroundColor="contrastThreshold" width={width}>
      <Modal.Body alignItems="center">
        <Pressable onPress={() => Linking.openURL(adsURL)}>
          <Image source={{ uri: imgURL }} style={styles.ads} />
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

const PopupAds = () => {
  const [open, setOpen] = useState(true);
  return (
    <CustomModal open={open} setOpen={setOpen}>
      <Content setOpen={setOpen} />
    </CustomModal>
  );
};

export default PopupAds;

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
