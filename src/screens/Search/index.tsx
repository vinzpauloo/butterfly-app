import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "native-base";

import Container from "components/Container";
import { globalStyle } from "globalStyles";

const { width } = Dimensions.get("window");

const SearchBar = () => {
  return (
    <>
      <StatusBar backgroundColor="#262632" />
      <View style={styles.headerContainer}>
        <Ionicons name="chevron-back" color="#fff" size={30} />
        <View style={styles.inputFieldContainer}>
          <Feather
            name="search"
            color="#aaa"
            size={20}
            style={{ marginHorizontal: 10 }}
          />
          <TextInput
            placeholder="search model name"
            style={styles.inputField}
          />
          <AntDesign
            name="closecircle"
            color="#aaa"
            size={15}
            style={{ marginHorizontal: 10 }}
          />
        </View>
        <Pressable style={styles.searchBtn}>
          <Text style={styles.searchText}>Search</Text>
        </Pressable>
      </View>
    </>
  );
};

const index = () => {
  return (
    <Container>
      <SearchBar />
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: width,
    backgroundColor: "#262632",
    paddingHorizontal: 10,
  },
  inputFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginLeft: 10,
  },
  inputField: {
    width: width * 0.48,
  },
  searchBtn: {
    backgroundColor: globalStyle.secondaryColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  searchText: {
    color: "#fff",
  },
});
