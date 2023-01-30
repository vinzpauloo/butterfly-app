import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  AntDesign,
  SimpleLineIcons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import Container from "components/Container";
import profilePhoto from "assets/images/profilePhoto.jpg";

const MainSettings = (navigation: any) => {
  return (
    <>
      {/*Profile Photo*/}
      <TouchableOpacity onPress={() => navigation.navigate("ProfilePhoto")}>
        <View style={styles.profilePhotoContainer}>
          <Text style={styles.itemTitle}>头像</Text>
          <View style={styles.profilePhotoInnerContainer}>
            <Image style={styles.profilePhoto} source={profilePhoto} />
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>

      {/*System Name Given*/}
      <TouchableOpacity onPress={() => navigation.navigate("PetName")}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>昵称</Text>
          <View style={styles.itemInnerContainer}>
            <Text style={styles.itemDetails}>受伤的期待</Text>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>

      {/*Gender*/}
      <TouchableOpacity>
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
      <TouchableOpacity
        onPress={() => navigation.navigate("MobileBindRequest")}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>手机号</Text>
          <View style={styles.itemInnerContainer}>
            <Text style={styles.itemDetails}>去绑定</Text>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>

      {/*Introduction*/}
      <TouchableOpacity onPress={() => navigation.navigate("Introduction")}>
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
        onPress={() => navigation.navigate("AccountCertificate")}
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
      <TouchableOpacity onPress={() => navigation.navigate("AccountRetrieval")}>
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
      <TouchableOpacity onPress={() => navigation.navigate("RequestCode")}>
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

const OtherSettings = (navigation: any) => {
  return (
    <>
      <View style={styles.actionAndOthersContainer}>
        <Text style={styles.accountAndOthersTitle}>其他</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <View style={styles.itemContainer}>
          <View style={styles.itemInnerContainer}>
            <AntDesign name="customerservice" size={20} color="white" />
            <Text style={styles.accountAndOthersSection}>联系客服</Text>
          </View>
          <View style={styles.itemInnerContainer}>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>

      {/*Privacy Policy*/}
      <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
        <View style={styles.itemContainer}>
          <View style={styles.itemInnerContainer}>
            <MaterialIcons name="policy" size={20} color="white" />
            <Text style={styles.accountAndOthersSection}>隐私政策</Text>
          </View>
          <View style={styles.itemInnerContainer}>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>

      {/*Service Provisions*/}
      <TouchableOpacity
        onPress={() => navigation.navigate("ServiceProvisions")}
      >
        <View style={styles.itemContainer}>
          <View style={styles.itemInnerContainer}>
            <MaterialIcons name="notes" size={20} color="white" />
            <Text style={styles.accountAndOthersSection}>服务条款</Text>
          </View>
          <View style={styles.itemInnerContainer}>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>

      {/*About*/}
      <TouchableOpacity onPress={() => navigation.navigate("About")}>
        <View style={styles.itemContainer}>
          <View style={styles.itemInnerContainer}>
            <MaterialCommunityIcons
              name="heart-pulse"
              size={20}
              color="white"
            />
            <Text style={styles.accountAndOthersSection}>关于糖心</Text>
          </View>
          <View style={styles.itemInnerContainer}>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("PasscodeLock")}>
        <View style={styles.itemContainer}>
          <View style={styles.itemInnerContainer}>
            <SimpleLineIcons name="lock" size={20} color="white" />
            <Text style={styles.accountAndOthersSection}>应用锁</Text>
          </View>
          <View style={styles.itemInnerContainer}>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </View>
      </TouchableOpacity>
    </>
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
});
