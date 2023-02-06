import React from "react";
import {
  Dimensions,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";

import AreaText from "components/forms/AreaText";
import Buttons from "components/forms/Buttons";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";

const Introduction = () => {
  return (
    <ScrollView style={styles.container}>
      {/*Title and Back Button  */}
      <UserProfileSettingsHeader title={'签名'} btnRight={null}/>

      <View style={styles.textArea}>
        <AreaText placeholder='用户很懒,什么也没留下' placeholderTextColor='grey' maxLength={100}/>
      </View>

      <View style={styles.btnContainer}>
        <Buttons props={'提交'}/>
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
  btnContainer: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  textArea: {
    padding: 15
  }
});

export default Introduction;
