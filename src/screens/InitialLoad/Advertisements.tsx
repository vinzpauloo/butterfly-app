import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";

import * as Linking from "expo-linking";

import Girl from "assets/images/profilePhoto.jpg";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDisclose } from "native-base";
import CenteredModal from "components/CenteredModal";

const adsURL = "https://google.com/";

const { width, height } = Dimensions.get("window");

const Content = ({ onClose }) => {
  const handleAdPress = () => {
    Linking.openURL(adsURL);
  };
  return (
    <View style={styles.content}>
      <Pressable onPress={handleAdPress}>
        <Image source={Girl} style={styles.ads} />
      </Pressable>
      <AntDesign
        name="close"
        size={25}
        color="#fff"
        style={styles.closeBtn}
        onPress={onClose}
      />
    </View>
  );
};

const Advertisements = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  useEffect(() => {
    //@ts-ignore
    onOpen(() => true);
  }, []);

  return (
    <CenteredModal isOpen={isOpen} onClose={onClose}>
      <Content onClose={onClose} />
    </CenteredModal>
  );
};

export default Advertisements;

const styles = StyleSheet.create({
  content: {
    marginBottom: 50,
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
