import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import CoinIcon from "assets/images/coinIcon.png";
import { translationStore } from "../zustand/translationStore";

interface IVIPTag {
  isAbsolute?: boolean;
  item?: any | null;
}

const VIPTag = ({ item = null, isAbsolute }: IVIPTag) => {
  const { translations } = translationStore((store) => store);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{translations.vip}</Text>
      </View>
    );
  }

  return (
    <>
      {item.available_to === "vip" ? (
        <View style={[styles.container, isAbsolute && styles.absolute]}>
          <Text style={styles.text}>{translations.vip}</Text>
        </View>
      ) : (
        <View style={[styles.coin, isAbsolute && styles.absolute]}>
          <Image source={CoinIcon} style={styles.icon} />
          <Text style={styles.text}>{item.coin_amount}</Text>
        </View>
      )}
    </>
  );
};

export default VIPTag;

const styles = StyleSheet.create({
  container: {
    marginLeft: "auto",
    paddingHorizontal: 10,
    backgroundColor: "#F7D3A5",
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    paddingBottom: 2,
  },
  coin: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    paddingHorizontal: 7,
    paddingBottom: 2,
    backgroundColor: "#F7D3A5",
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  text: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "bold",
  },
  absolute: {
    position: "absolute",
    right: 0,
    zIndex: 2,
  },
  icon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    marginRight: 2,
  },
});
