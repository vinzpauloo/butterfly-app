import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

import { useNavigation } from "@react-navigation/native";

import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";

const AccountRetrieval = () => {
  const navigation = useNavigation<any>();

  const [isModalVisible, setModalVisible] = useState(false);

  const [image, setImage] = useState(null);
  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const ButtonModal = () => {
    return (
      <View style={styles.btnModalContainer}>
        <TouchableOpacity
          style={styles.btnModalFirstBtnContainer}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate("CameraInit");
          }}
        >
          <Text style={styles.btnModalFirstBtnText}>扫描凭证</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnModalSecondBtnContainer}
          onPress={pickImageFromGallery}
        >
          <Text style={styles.btnModalSecondBtnText}>上传凭证</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnModalThirdBtnContainer}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.btnModalThirdBtnText}>取消</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/*============================================================================*/}
      {/*Modal*/}
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={styles.modalContainer}
      >
        <View style={styles.modal}>
          <ButtonModal />
        </View>
      </Modal>
      {/*============================================================================*/}
      {/*Title and Back Button  */}
      <UserProfileSettingsHeader title={'账号找回'} btnRight={null}/>

      <View style={styles.tabContainer}>
        {/*FIRST BUTTON*/}
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("MobileRetrieval")}
          >
            <View style={styles.tabInnerContainer}>
              <Text style={styles.tabText}>使用绑定手机号找回</Text>
              <FontAwesome5 name="angle-right" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <View style={styles.horizontalRule}></View>
        </View>

        {/*SECOND BUTTON*/}
        <View style={styles.tabMargin}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.tabInnerContainer}>
              <Text style={styles.tabText}>使用原账号身份卡找回</Text>
              <FontAwesome5 name="angle-right" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <View style={styles.horizontalRule}></View>
        </View>

        {/*THIRD BUTTON*/}
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("CustomerService", {
              postTitle: 'Test Sender',
              senderUserName: 'Test Sender Username',
              senderMessage: 'Test Sender Message',
              senderImgURL: 'https://randomuser.me/api/portraits/men/3.jpg',
              senderTimeStamp: 'Test Date',
            })}
          >
            <View style={styles.tabInnerContainer}>
              <Text style={styles.tabText}>联系客服找回</Text>
              <FontAwesome5 name="angle-right" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <View style={styles.horizontalRule}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    width: Dimensions.get("window").width,
  },
  modal: {
    backgroundColor: "transparent",
    height: Dimensions.get("window").height / 5,
    top: 270,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  btnModalContainer: {
    marginHorizontal: 20,
  },
  btnModalFirstBtnContainer: {
    backgroundColor: "#262632",
    height: 40,
    justifyContent: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
  },
  btnModalFirstBtnText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  btnModalSecondBtnContainer: {
    backgroundColor: "#262632",
    height: 40,
    justifyContent: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 7,
  },
  btnModalSecondBtnText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  btnModalThirdBtnContainer: {
    backgroundColor: "#262632",
    height: 40,
    justifyContent: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
  },
  btnModalThirdBtnText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  container: {
    flex: 1,
    maxHeight: Dimensions.get("window").height,
    maxWidth: Dimensions.get("window").width,
    backgroundColor: "#191d26",
  },
  tabContainer: {
    backgroundColor: "#262632",
    height: "auto",
    borderRadius: 5,
  },
  tabInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 3,
    marginHorizontal: 15,
  },
  tabText: {
    color: "white",
    fontSize: 12,
  },
  tabMargin: {
    marginVertical: 15,
  },
  horizontalRule: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginTop: 10,
  },
});
export default AccountRetrieval;
