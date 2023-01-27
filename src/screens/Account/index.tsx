import { StyleSheet, View } from "react-native";
import React from "react";

import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";

import Container from "components/Container";

const Header = () => {
  return (
    <View style={styles.header}>
      <Fontisto name="bell" color="#fff" size={25} style={styles.icon} />
      <Ionicons
        name="settings-outline"
        color="#fff"
        size={25}
        style={styles.icon}
      />
    </View>
  );
};

const AccountTab = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
};

export default AccountTab;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    marginHorizontal: 10,
  },
});
