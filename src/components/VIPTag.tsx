import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { userStore } from "../zustand/userStore";
import { translationStore } from "../zustand/translationStore";

interface IVIPTag {
  isAbsolute?: boolean;
}

const VIPTag: React.FC<IVIPTag> = ({ isAbsolute }) => {
  const { is_Vip } = userStore((state) => state);
  const { translations } = translationStore((store) => store);

  const navigation = useNavigation<any>();

  const handlePress = () => {
    if (!is_Vip)
      navigation.navigate("VIPScreen", {
        postTitle: translations.memberCentre,
      });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, isAbsolute && styles.absolute]}
    >
      <Text style={styles.text}>VIP</Text>
    </Pressable>
  );
};

export default VIPTag;

const styles = StyleSheet.create({
  container: {
    marginLeft: "auto",
    paddingHorizontal: 10,
    backgroundColor: "#F7D3A5",
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
  text: {
    color: "#000000",
    fontSize: 10,
    fontWeight: "bold",
  },
  absolute: {
    position: "absolute",
    right: 0,
    zIndex: 2,
  },
});
