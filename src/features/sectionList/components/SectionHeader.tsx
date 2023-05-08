import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

import { GLOBAL_COLORS } from "global";

const SectionHeader = ({ id, title }) => {
  const navigation = useNavigation<any>();

  const handlePress = (title: string) => {
    navigation.navigate("SingleSection", { postTitle: title, id: id });
  };

  return (
    <View style={styles.titleContent}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Pressable onPress={() => handlePress(title)}>
        <Feather
          name="chevron-right"
          color={GLOBAL_COLORS.primaryTextColor}
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
    borderLeftColor: GLOBAL_COLORS.secondaryColor,
    borderLeftWidth: 4,
    textAlign: "center",
  },
});
