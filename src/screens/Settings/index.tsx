import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Linking,
} from "react-native";
import Modal from "react-native-modal";

import { useNavigation } from "@react-navigation/native";

import {
  Ionicons,
  AntDesign,
  SimpleLineIcons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import Container from "components/Container";
import profilePhoto from "assets/images/profilePhoto.jpg";
import { GLOBAL_COLORS } from "../../global";
import { HStack, VStack } from "native-base";
import { settingsOthersList } from "../../data/settingsOthersList";
const MainSettings = (navigation: any) => {
  const [selected, setSelected] = useState(null);
  const [image, setImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const ChangeGenderModal = () => {
    const handlePress = async (id) => {
      setSelected(id);
    };

    const handlePress2 = async (id) => {
      if (selected) {
        setImage(
          id === 1 ? (
            <Ionicons name="male" size={24} color="#4362A5" />
          ) : (
            <Ionicons name="female" size={24} color="#FF474E" />
          )
        );
      }
    };

    return (
      <SafeAreaView>
        <View style={styles.changeGenderModal}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelBtn}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handlePress2;
              setModalVisible(false);
            }}
          >
            <Text style={styles.acceptBtn}>确定</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[
              styles.textContainer,
              selected === 1 && styles.selectedTextHighlight,
            ]}
            onPress={() => handlePress(1)}
          >
            <Text
              style={[
                styles.text,
                selected === 1 && styles.selectedTextChangeColor,
              ]}
            >
              男
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.textContainer,
              selected === 2 && styles.selectedTextHighlight,
            ]}
            onPress={() => handlePress(2)}
          >
            <Text
              style={[
                styles.text,
                selected === 2 && styles.selectedTextChangeColor,
              ]}
            >
              女
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const navigate = useNavigation<any>();

  return (
    <>
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
          <ChangeGenderModal />
        </View>
      </Modal>
      {/*Profile Photo*/}
      <TouchableOpacity onPress={() => navigate.navigate("ProfilePhoto")}>
        <View style={styles.profilePhotoContainer}>
          <Text style={styles.itemTitle}>头像</Text>
          <View style={styles.profilePhotoInnerContainer}>
            <Image style={styles.profilePhoto} source={profilePhoto} />
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>
      {/*System Name Given*/}
      <TouchableOpacity onPress={() => navigate.navigate("PetName")}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>昵称</Text>
          <View style={styles.itemInnerContainer}>
            <Text style={styles.itemDetails}>受伤的期待</Text>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>
      {/*Gender*/}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>性别</Text>
          <View style={styles.itemInnerContainer}>
            <View style={styles.genderContainer}>
              <Text>
                <Ionicons name="male" size={24} color="#4362A5" />
                <Ionicons name="female" size={24} color="#FF474E" />
              </Text>
            </View>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>
      {/*Mobile Number*/}
      <TouchableOpacity onPress={() => navigate.navigate("MobileBindRequest")}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>手机号</Text>
          <View style={styles.itemInnerContainer}>
            <Text style={styles.itemDetails}>去绑定</Text>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>
      {/*Introduction*/}
      <TouchableOpacity onPress={() => navigate.navigate("Introduction")}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>个人简介</Text>
          <View style={styles.itemInnerContainer}>
            <Text style={styles.itemDetails}>用户很懒,什么也没留下</Text>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const AccountSettings = (navigation: any) => {
  const navigate = useNavigation<any>();

  return (
    <>
      <View style={styles.actionAndOthersContainer}>
        <Text style={styles.accountAndOthersTitle}>账号</Text>
      </View>

      <View style={styles.itemContainer}>
        <View style={styles.itemInnerContainer}>
          <SimpleLineIcons name="user" size={20} color="white" />
          <Text style={styles.accountAndOthersSection}>账号ID</Text>
        </View>
        <View style={styles.itemInnerContainer}>
          <Text style={{ color: "white" }}>CDWQMC</Text>
          <TouchableOpacity>
            <View style={styles.copyBtnContainer}>
              <Text style={styles.copyBtn}>复制</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/*Account Certificate*/}
      <TouchableOpacity
        onPress={() => navigate.navigate("AccountVerification")}
      >
        <View style={styles.itemContainer}>
          <View style={styles.itemInnerContainer}>
            <MaterialCommunityIcons
              name="file-certificate-outline"
              size={20}
              color="white"
            />
            <Text style={styles.accountAndOthersSection}>账号凭证</Text>
          </View>
          <AntDesign name="right" size={18} color="white" />
        </View>
      </TouchableOpacity>

      {/*ACCOUNT RETRIEVAL*/}
      <TouchableOpacity onPress={() => navigate.navigate("AccountRetrieval")}>
        <View style={styles.itemContainer}>
          <View style={styles.itemInnerContainer}>
            <MaterialIcons name="person-search" size={20} color="white" />
            <Text style={styles.accountAndOthersSection}>找回账号</Text>
          </View>
          <View style={styles.itemInnerContainer}>
            <Text style={styles.itemDetails}>账号丢失极速找回</Text>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>

      {/*Code*/}
      <TouchableOpacity onPress={() => navigate.navigate("RequestCode")}>
        <View style={styles.itemContainer}>
          <View style={styles.itemInnerContainer}>
            <AntDesign name="codesquareo" size={20} color="white" />
            <Text style={styles.accountAndOthersSection}>绑定邀请码</Text>
          </View>
          <View style={styles.itemInnerContainer}>
            <Text style={styles.itemDetails}>去绑定</Text>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const OtherSettings = (props) => {
  const navigate = useNavigation<any>();

  return (
    <VStack
      backgroundColor={GLOBAL_COLORS.primaryColor}
      style={styles.otherSettings}
      space={5}
      mt={5}
      mb={5}
    >
      <Text style={styles.accountAndOthersTitle}>其他</Text>
      {settingsOthersList?.map((item, index) => (
        <VStack key={index}>
          <TouchableOpacity
            onPress={() => {
              item.screen === "OfficialGroup"
                ? Linking.openURL("https://t.me/StockPro_Official_BankNifty")
                : item.screen === "CustomerService"
                ? navigate.navigate(`${item.screen}`, item.params)
                : navigate.navigate(`${item.screen}`);
            }}
          >
            <HStack justifyContent={"space-between"}>
              <HStack alignItems={"center"}>
                {item.logo}
                <Text style={styles.accountAndOthersSection}>{item.title}</Text>
              </HStack>
              <AntDesign name="right" size={18} color="white" />
            </HStack>
          </TouchableOpacity>
          <View></View>
        </VStack>
      ))}
    </VStack>
  );
};

const Settings = () => {
  const navigation = useNavigation<any>();

  return (
    <Container>
      <ScrollView style={styles.mainContainer}>
        <MainSettings navigation={navigation} />
        <AccountSettings navigation={navigation} />
        <OtherSettings navigation={navigation} />
      </ScrollView>
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginVertical: 10,
  },
  innerContainer: {
    padding: 5,
  },

  // Profile Photo
  profilePhotoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  profilePhotoInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  // Items
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 30,
  },
  itemInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    color: "white",
    fontSize: 14,
  },
  itemDetails: {
    color: "white",
    fontSize: 14,
    marginRight: 10,
  },

  // Gender
  genderContainer: {
    marginRight: 5,
  },

  // Others
  actionAndOthersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 30,
  },
  accountAndOthersTitle: {
    color: "white",
    fontSize: 12,
  },
  accountAndOthersSection: {
    color: "white",
    fontSize: 14,
    marginLeft: 5,
  },
  copyBtnContainer: {
    backgroundColor: "#FF474E",
    width: 55,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 5,
  },
  copyBtn: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
  otherSettings: {
    marginHorizontal: 10,
  },
  //
  //
  modalContainer: {
    margin: 0,
    width: Dimensions.get("window").width,
  },
  modal: {
    backgroundColor: "#262632",
    height: Dimensions.get("window").height / 5,
    top: 290,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  textContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  //Modal
  changeGenderModal: {
    marginVertical: 10,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  cancelBtn: {
    color: "white",
  },
  acceptBtn: {
    color: "#FF474E",
  },
  selectedTextHighlight: {
    backgroundColor: "#191d26",
  },
  selectedTextChangeColor: {
    color: "#FF474E",
  },
});
