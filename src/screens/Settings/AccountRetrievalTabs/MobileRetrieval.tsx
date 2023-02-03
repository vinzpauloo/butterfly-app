import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import InputText from "components/forms/InputText";
import Buttons from "components/forms/Buttons";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";

const MobileRetrieval = () => {

  return (
    <ScrollView style={styles.container}>

      {/*Header*/}
      <UserProfileSettingsHeader title={'手机号找'} btnRight={null}/>

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
