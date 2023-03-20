import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { translationStore } from "../zustand/translationStore";

type Props = {
  isFromSingleVideo?: boolean;
};

const BottomMessage = (props: Props) => {
  const translations = translationStore((state) => state.translations);
  return (
    <View>
      <Text
        style={[
          styles.bottomText,
          props.isFromSingleVideo ? { marginBottom: 24 } : null,
        ]}
      >
        {translations.bottomMessage}
      </Text>
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
