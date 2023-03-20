import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  isFromSingleVideo?: boolean
};

const BottomMessage = (props: Props) => {
  return (
    <View>
      <Text style={[styles.bottomText, props.isFromSingleVideo ? { marginBottom: 24 } : null]}>人家也是有底线的啦！</Text>
    </View>
  );
};

export default BottomMessage;

const styles = StyleSheet.create({
  bottomText: {
    textAlign: "center",
    color: "#999",
    marginVertical: 12,
    fontSize: 14,
  },
});
