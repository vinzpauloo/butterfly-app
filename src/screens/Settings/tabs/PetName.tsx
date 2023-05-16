import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import InputText from "components/forms/InputText";
import Buttons from "components/forms/Buttons";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import { GLOBAL_COLORS } from "../../../global";

const PetName = () => {
  const { height } = useWindowDimensions();
  return (
    <ScrollView style={[styles.container, { maxHeight: height }]}>
      {/*Title and Back Button  */}
      <UserProfileSettingsHeader title="昵称" btnRight={null} />

      <View>
        <View style={styles.inputContainer}>
          <InputText
            maxLength={10}
            placeholder="受伤的期待"
            placeholderTextColor="grey"
          />
        </View>

        <Text style={styles.details1}>每个自然月仅允许修改一次</Text>

        <Text style={styles.details2}>
          请勿设置任何广告相关内容,可能导致禁止留言。
        </Text>

        <View style={styles.btnContainer}>
          <Buttons
            title={"提交"}
            onPress={() => alert("PetName button test")}
            backgroundColor={GLOBAL_COLORS.btnColor}
            color={GLOBAL_COLORS.primaryTextColor}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 0,
    backgroundColor: "#191d26",
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
    marginTop: 20,
  },
  btnContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
});

export default PetName;
