import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

interface IVIPTag {
  isAbsolute?: boolean;
}

const VIPTag: React.FC<IVIPTag> = ({ isAbsolute }) => {
  const handlePress = () => {
    Alert.alert("VIP Pressed!");
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
    borderRadius: 4,
    backgroundColor: "red",
    margin: 4,
  },
  text: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  absolute: {
    position: "absolute",
    right: 0,
    zIndex: 2,
  },
});
