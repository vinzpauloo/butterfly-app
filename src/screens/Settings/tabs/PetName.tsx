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

const PetName = () => {
  const [text, setText] = useState("请输入新的昵称");
  const [charactersLeft, setCharactersLeft] = useState(10);
  const handleTextChange = (input) => {
    if (input.length > 10) {
      return;
    }
    setText(input);
    setCharactersLeft(10 - input.length);
  };

  const [message, setMessage] = useState(`受伤的期待`);

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

      <View style={styles.innerContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={handleTextChange}
          value={text}
          maxLength={10}
        />
        <Text style={styles.charactersLeft}>{charactersLeft}/10</Text>

        <Text style={styles.details1}>每个自然月仅允许修改一次</Text>

        <Text style={styles.details2}>
          请勿设置任何广告相关内容,可能导致禁止留言。
        </Text>

        <View style={styles.btnContainer}>
          <Button title="提交" color="#FF474E"></Button>
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
  innerContainer: {
    marginTop: 50,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#FF474E",
    marginHorizontal: 40,
    color: "white",
  },
  charactersLeft: {
    textAlign: "right",
    marginHorizontal: 40,
    color: "white",
    fontSize: 10,
  },
  details1: {
    textAlign: "center",
    marginTop: 50,
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
  btnContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});

export default PetName;
