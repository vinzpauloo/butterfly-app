import React from "react";
import {
  useWindowDimensions,
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

import InputText from "components/forms/InputText";
import Buttons from "components/forms/Buttons";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import { GLOBAL_COLORS } from "../../../global";

const RequestCode = () => {
  const { height, width } = useWindowDimensions();
  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <ScrollView
        style={[
          styles.container,
          {
            maxHeight: height,
            maxWidth: width,
          },
        ]}
      >
        {/*Title and Back Button  */}
        <UserProfileSettingsHeader title={"填写邀请码"} btnRight={null} />

        <View style={styles.textInputContainer}>
          <InputText
            placeholder="请填写邀请码"
            placeholderTextColor="grey"
            maxLength={null}
          />
        </View>

        <View style={styles.btnContainer}>
          <Buttons
            title={"确定"}
            onPress={() => alert("Test RequestCode Btn")}
            backgroundColor={GLOBAL_COLORS.btnColor}
            color={GLOBAL_COLORS.primaryTextColor}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191d26",
  },
  textInputContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  btnContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
});

export default RequestCode;
