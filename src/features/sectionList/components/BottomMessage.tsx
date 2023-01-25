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
    color: "#fff",
    paddingTop: 5,
    paddingBottom: 20,
    fontSize: 14,
  },
});
