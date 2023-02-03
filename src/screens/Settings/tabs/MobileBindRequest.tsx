import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import InputText from "components/forms/InputText";
import Buttons from "components/forms/Buttons";

const MobileBindRequest = () => {
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
        <View>
          <Text style={styles.titleTextContainer}>绑定邀请码</Text>
        </View>
      </View>

      <View style={styles.textInputContainer}>
        <InputText placeholder='请输入需要绑定的手机号' placeholderTextColor='grey' maxLength={null}/>
      </View>

      <View style={styles.textInputContainer2}>

        <View style={styles.flexOne}>
          <InputText placeholder='请输入短信验证码' placeholderTextColor='grey' maxLength={null}/>
        </View>

        <View style={styles.flexTwo}>
          <Buttons props={'获取短信验证码'}/>
        </View>
      </View>

      <View style={{marginHorizontal: 20}}>
        <Buttons props={'绑定邀请码'}/>
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
    marginHorizontal: 20,
    marginTop: 25
  },
  textInputContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 25
  },
  textInput2: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    color: "white",
    padding: 10,
    borderRadius: 5,
    height: 50,
  },
  flexOne: {
    flex: 0.6
  },
  flexTwo: {
    flex: 0.4,
    marginLeft: 10
  }
});

export default MobileBindRequest;
