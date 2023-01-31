import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MobileBindRequest = () => {
  const navigation = useNavigation<any>();

  const [message1, setMessage1] = useState("请输入需要绑定的手机号");
  const [message2, setMessage2] = useState("请输入短信验证码");

  return (
    <ScrollView style={styles.container}>
      {/*Title and Back Button  */}
      <View style={styles.titleContainer}>
        <View style={styles.backBtn}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.titleTextContainer}>绑定邀请码</Text>
        </View>
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          onChangeText={setMessage1}
          value={message1}
          style={styles.textInput}
        />
      </View>

      <View style={styles.textInputContainer2}>
        <View style={styles.textInputInnerContainer2}>
          <TextInput
            onChangeText={setMessage2}
            value={message2}
            style={styles.textInput2}
            placeholder="Enter your message here"
          />
        </View>

        <View style={{ flex: 4, backgroundColor: "#FF474E", borderRadius: 5 }}>
          <TouchableOpacity style={{ height: 51, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", color: "#FFFFFF" }}>
              获取短信验证码
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 20, marginHorizontal: 25 }}>
        <Button title="绑定邀请码" color="#FF474E"></Button>
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
  textInputContainer2: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
  },
  textInputInnerContainer2: {
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
});

export default MobileBindRequest;
