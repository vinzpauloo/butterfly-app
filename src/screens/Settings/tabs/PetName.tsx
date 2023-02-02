import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import InputText from "../../../components/forms/InputText";
import Buttons from "../../../components/forms/Buttons";

const PetName = () => {

  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      {/*Title and Back Button  */}
      <View style={styles.titleContainer}>
        <View style={styles.backBtn}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>昵称</Text>
        </View>
      </View>

      <View>
        <View style={styles.inputContainer}>
          <InputText maxLength={10} placeholder='受伤的期待' placeholderTextColor='grey'/>
        </View>

        <Text style={styles.details1}>每个自然月仅允许修改一次</Text>

        <Text style={styles.details2}>
          请勿设置任何广告相关内容,可能导致禁止留言。
        </Text>

        <View style={styles.btnContainer}>
          <Buttons props={'提交'}/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get("window").height,
    marginVertical: 0,
    backgroundColor: "#191d26",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
    backgroundColor: "#262632",
    height: 50,
  },
  backBtn: {
    position: "absolute",
    left: 5,
  },
  titleTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
  },
  details1: {
    textAlign: "center",
    marginTop: 35,
    marginHorizontal: 40,
    color: "white",
    fontSize: 12,
  },
  details2: {
    textAlign: "center",
    marginHorizontal: 40,
    color: "white",
    fontSize: 12,
  },
  inputContainer: {
    marginHorizontal: 21,
    marginTop: 20
  },
  btnContainer: {
    marginVertical: 20,
    marginHorizontal: 20
  }
});

export default PetName;
