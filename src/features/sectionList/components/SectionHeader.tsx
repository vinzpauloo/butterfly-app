import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { globalStyle } from "globalStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SectionHeader = ({ title }) => {
  return (
    <View style={styles.titleContent}>
      <Text style={styles.title}>{title}</Text>
      <MaterialCommunityIcons
        name="chevron-triple-right"
        color={globalStyle.secondaryColor}
        size={20}
      />
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
