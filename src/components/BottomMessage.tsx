import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const BottomMessage = (props: Props) => {
  return (
    <View>
      <Text style={styles.bottomText}>人家也是有底线的啦！</Text>
    </View>
  );
};

export default BottomMessage;

const styles = StyleSheet.create({
  bottomText: {
    textAlign: "center",
    color: "#999",
    marginVertical: 24,
    fontSize: 14,
  },
});
