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

const MobileRetrieval = () => {
  const navigation = useNavigation<any>();

  const [message1, setMessage1] = useState("请输入原来绑定的手机号");
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
        <TextInput
          onChangeText={setMessage1}
          value={message1}
          style={styles.textInput}
        />
      </View>

      <View style={styles.textInputAndBtnContainer}>
        <View style={styles.textInputContainer2}>
          <TextInput
            onChangeText={setMessage2}
            value={message2}
            style={styles.textInput2}
            placeholder="Enter your message here"
          />
        </View>

        <View style={styles.firstBtnContainer}>
          <TouchableOpacity style={styles.firstBtnInnerContainer}>
            <Text style={styles.firstBtnText}>获取验证码</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secondBtnContainer}>
        <TouchableOpacity style={styles.secondBtnInnerContainer}>
          <Text style={styles.secondBtnText}>注意</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          手机号找回后将直接使用原手机号登录
        </Text>
      </View>

      <View style={styles.thirdBtnContainer}>
        <Button title="确定" color="#FF474E"></Button>
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
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  textInputAndBtnContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
  },
  textInputContainer2: {
    flex: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput2: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    color: "white",
    padding: 10,
    borderRadius: 5,
    height: 50,
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
  secondBtnContainer: {
    marginTop: 20,
    marginHorizontal: 25,
  },
  secondBtnInnerContainer: {
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
    marginTop: 25,
    marginHorizontal: 25,
  },
});

export default MobileRetrieval;
