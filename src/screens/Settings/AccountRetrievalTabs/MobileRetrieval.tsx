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

import InputText from "../../../components/forms/InputText";
import Buttons from "../../../components/forms/Buttons";

const MobileRetrieval = () => {
  const navigation = useNavigation<any>();

  const [message2, setMessage2] = useState("请输入验证码");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleAndBackBtnContainer}>
        <View style={styles.backBtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AccountRetrieval")}
          >
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>手机号找</Text>
        </View>
      </View>

      <View style={styles.textInputContainer}>
        <InputText
            placeholder='请输入原来绑定的手机号'
            placeholderTextColor='grey'
            maxLength={null}
        />
      </View>

      <View style={styles.textInputContainer2}>

        <View style={styles.flexOne}>
          <InputText placeholder='请输入短信验证码' placeholderTextColor='grey' maxLength={null}/>
        </View>

        <View style={styles.flexTwo}>
          <Buttons props={'获取短信验证码'}/>
        </View>
      </View>

      <View style={styles.btnAndFooter}>
        <TouchableOpacity style={styles.secondBtn}>
          <Text style={styles.secondBtnText}>注意</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          手机号找回后将直接使用原手机号登录
        </Text>
      </View>

      <View style={styles.thirdBtnContainer}>
        <Buttons props={'确定'}/>
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
  backBtn: {
    position: "absolute",
    left: 5,
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
  },
  textInputContainer: {
    marginHorizontal: 25,
    marginTop: 20
  },
  textInputContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    marginVertical: 20
  },
  flexOne: {
    flex: 0.6
  },
  flexTwo: {
    flex: 0.4,
    marginLeft: 10
  },
  firstBtnContainer: {
    flex: 4,
    backgroundColor: "#FF474E",
    borderRadius: 5,
  },
  firstBtnInnerContainer: {
    height: 51,
    justifyContent: "center",
  },
  firstBtnText: {
    textAlign: "center",
    color: "#FFFFFF",
  },
  btnAndFooter: {
    marginHorizontal: 25,
  },
  secondBtn: {
    justifyContent: "center",
    backgroundColor: "#FF474E",
    width: 40,
    height: 25,
    borderRadius: 10,
  },
  secondBtnText: {
    textAlign: "center",
    color: "#FFFFFF",
  },
  footerText: {
    color: "white",
    fontSize: 12,
    marginTop: 10,
    marginHorizontal: 2,
  },
  thirdBtnContainer: {
    marginHorizontal: 25,
    marginVertical: 20
  },
});

export default MobileRetrieval;
