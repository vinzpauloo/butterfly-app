import React, { useState, useEffect } from "react";
import {
  Button,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AreaText from "components/forms/AreaText";
import Buttons from "components/forms/Buttons";

const Introduction = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      {/*Title and Back Button  */}
      <View style={styles.titleAndBackBtnContainer}>
        <View style={styles.backBtnContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>签名</Text>
        </View>
      </View>

      <View style={styles.textArea}>
        <AreaText placeholder='用户很懒,什么也没留下' placeholderTextColor='grey' maxLength={100}/>
      </View>

      <View style={styles.btnContainer}>
        <Buttons props={'提交'}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get("window").height,
    maxWidth: Dimensions.get("window").width,
    backgroundColor: "#191d26",
  },
  titleAndBackBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#262632",
    height: 50,
  },
  backBtnContainer: {
    position: "absolute",
    left: 5,
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
  },
  btnContainer: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  textArea: {
    padding: 15
  }
});

export default Introduction;
