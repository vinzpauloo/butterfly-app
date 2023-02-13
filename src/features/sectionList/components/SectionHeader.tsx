import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import { globalStyle } from "globalStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SectionHeader = ({ title }) => {
  const navigation = useNavigation<any>();

  const handlePress = (title: string) => {
    navigation.navigate("SingleSection", { postTitle: title });
  };

  return (
    <View style={styles.titleContent}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={() => handlePress(title)}>
        <MaterialCommunityIcons
          name="chevron-triple-right"
          color={globalStyle.secondaryColor}
          size={20}
        />
      </Pressable>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  titleContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    width: "100%",
    marginBottom: 15,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    paddingHorizontal: 10,
    borderLeftColor: globalStyle.secondaryColor,
    borderLeftWidth: 4,
    textAlign: "center",
  },
});
