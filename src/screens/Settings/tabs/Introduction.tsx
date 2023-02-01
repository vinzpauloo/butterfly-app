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

const Introduction = () => {
  const navigation = useNavigation<any>();

  const [text, setText] = useState("用户很懒,什么也没留下");
  const [charactersLeft, setCharactersLeft] = useState(100);
  const handleTextChange = (input) => {
    if (input.length > 100) {
      return;
    }
    setText(input);
    setCharactersLeft(100 - input.length);
  };

  return (
    <ScrollView style={styles.container}>
      {/*Title and Back Button  */}
      <View style={styles.titleAndBackBtnContainer}>
        <View style={styles.backBtnContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <Text style={styles.title}>签名</Text>
        </View>
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={handleTextChange}
          value={text}
          maxLength={100}
        />

        <Text style={styles.charactersLeftText}>{charactersLeft}/100</Text>
      </View>

      <View style={styles.btnContainer}>
        <Button title="提交" color="#FF474E"></Button>
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
  textInputContainer: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    marginHorizontal: 15,
    borderRadius: 5,
    height: 300,
    marginTop: 20,
  },
  textInput: {
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
  charactersLeftText: {
    textAlign: "right",
    position: "absolute",
    bottom: 20,
    right: 20,
    color: "#FFFFFF",
  },
  btnContainer: {
    marginTop: 20,
    marginHorizontal: 15,
  },
});

export default Introduction;
