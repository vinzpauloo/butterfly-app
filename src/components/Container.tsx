import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GLOBAL_COLORS } from "global";

interface DataTypes {
  children: any;
}

const { width } = Dimensions.get("window");

const Container: React.FC<DataTypes> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBAL_COLORS.primaryColor,
    width: width,
  },
});
