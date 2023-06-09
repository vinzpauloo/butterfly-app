import { Dimensions, Image, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";

import * as Linking from "expo-linking";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Modal } from "native-base";

import CustomModal from "components/CustomModal";
import { adsGlobalStore } from "../../../zustand/adsGlobalStore";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

const { width } = Dimensions.get("window");

const Content = ({ setOpen }) => {
  // subscribe to ads global store
  const popup_banner = adsGlobalStore((state) => state.popup_banner);

  let imgURL = popup_banner.photo_url;
  let adsURL = popup_banner.url;

  return (
    <Modal.Content
      h={400}
      borderRadius={0}
      backgroundColor="contrastThreshold"
      shadow="none"
      width={width}
    >
      <Modal.Body alignItems="center">
        <Pressable onPress={() => Linking.openURL(adsURL)}>
          <Image
            source={{ uri: BASE_URL_FILE_SERVER + imgURL }}
            style={styles.ads}
          />
        </Pressable>
      </Modal.Body>
    </Modal.Content>
  );
};

const PopupAds = () => {
  const [open, setOpen] = useState(true);
  return (
    <CustomModal open={open} setOpen={setOpen}>
      <Content setOpen={setOpen} />
      <AntDesign
        name="close"
        size={25}
        color="#fff"
        style={styles.closeBtn}
        onPress={() => setOpen(false)}
      />
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
    marginTop: 30,
  },
});
