import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import InputText from "../../../components/forms/InputText";
import Buttons from "../../../components/forms/Buttons";

const RequestCode = () => {
  const navigation = useNavigation<any>();
  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/*Title and Back Button  */}
        <View style={styles.titleAndBackBtnContainer}>
          <View style={styles.backBtnContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>填写邀请码</Text>
          </View>
        </View>

        <View style={styles.textInputContainer}>
          <InputText placeholder='请填写邀请码' placeholderTextColor='grey' maxLength={null}/>
        </View>

        <View style={styles.btnContainer}>
          <Buttons props={'确定'}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginVertical: 10,
    backgroundColor: "#262632",
    height: 50,
  },
  backBtnContainer: {
    position: "absolute",
    left: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
  },
  textInputContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  btnContainer: {
    marginVertical: 20,
    marginHorizontal: 20
  }
});

export default RequestCode;
