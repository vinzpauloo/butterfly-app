import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyle } from "globalStyles";

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
    backgroundColor: globalStyle.primaryColor,
    width: width,
  },
});
