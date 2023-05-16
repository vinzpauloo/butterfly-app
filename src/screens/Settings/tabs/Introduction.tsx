import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import AreaText from "components/forms/AreaText";
import Buttons from "components/forms/Buttons";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import { GLOBAL_COLORS } from "../../../global";

const Introduction = () => {
  const { width, height } = useWindowDimensions();
  return (
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
      <UserProfileSettingsHeader title={"签名"} btnRight={null} />

      <View style={styles.textArea}>
        <AreaText
          placeholder="用户很懒,什么也没留下"
          placeholderTextColor="grey"
          maxLength={100}
        />
      </View>

      <View style={styles.btnContainer}>
        <Buttons
          title={"提交"}
          onPress={() => alert("Test Introduction")}
          backgroundColor={GLOBAL_COLORS.btnColor}
          color={GLOBAL_COLORS.primaryTextColor}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191d26",
  },
  btnContainer: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  textArea: {
    padding: 15,
  },
});

export default Introduction;
