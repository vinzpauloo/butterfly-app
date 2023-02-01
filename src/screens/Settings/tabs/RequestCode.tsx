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

const RequestCode = () => {
  const navigation = useNavigation<any>();

  const [message1, setMessage1] = useState("请填写邀请码");
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
          <TextInput
            onChangeText={setMessage1}
            value={message1}
            style={styles.textInput}
          />
        </View>

        <View style={styles.btnContainer}>
          <Button title="确定" color="#FF474E"></Button>
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
    marginHorizontal: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#FF474E",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
  },
  btnContainer: {
    marginTop: 150,
    marginHorizontal: 15,
  },
});

export default RequestCode;
