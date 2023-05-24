import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import cacheImage from "../../../assets/images/cacheImage.png";
import { translationStore } from "../../../zustand/translationStore";
import { GLOBAL_COLORS } from "global";

const NoCacheMessage = () => {
  const { translations } = translationStore((store) => store);
  return (
    <View style={styles.noCacheContainer}>
      <Image source={cacheImage} style={styles.cacheImage} />
      <Text style={styles.cacheText}>{translations.noData}</Text>
    </View>
  );
};

export default NoCacheMessage;

const styles = StyleSheet.create({
  noCacheContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  cacheImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  cacheText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 16,
  },
});
