import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  SafeAreaView,
  Button,
  Linking,
  Pressable,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, Link } from "@react-navigation/native";

const data = [
  { key: "官网地址:", text: "txvlog.com" },
  { key: "备用地址:", text: "tangxin.one" },
];

import qrImage from "../../../assets/images/profilePhoto.jpg";

const AccountCertificate = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      {/*Title and Back Button  */}
      <View style={styles.titleAndBackBtnContainer}>
        <View style={styles.backBtnContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>账号凭证</Text>
        </View>
      </View>

      {/*QR CODE*/}
      <View style={styles.qrCodeContainer}>
        <View style={styles.qrCodeInnerContainer}>
          <Image style={styles.qrCodeInnerImage} source={qrImage} />
          <Text style={styles.qrCodeTitle}>
            网黄UP主的性爱博客{"\n"}
            分享你我的性福生活
          </Text>
        </View>

        <View style={styles.qrCode}>
          <Image style={styles.qrImage} source={qrImage} />

          <View>
            <Text style={styles.qrDetails}>官网地址: txvlog.com</Text>
            <Text style={styles.qrDetails}>备用地址: tangxin.one</Text>
            <Text style={styles.qrDetails2}> tangxin.best</Text>
          </View>
        </View>

        <View style={styles.leftCircle}></View>

        <View style={styles.qrFooterContainer}>
          <Text style={styles.qrFooterText}>
            如果账号丢失,请到设置-找回账号-账号凭证 找回,上传凭证或扫描凭证
          </Text>
        </View>

        <View style={styles.rightCircle}></View>
      </View>

      <View style={styles.btnContainer}>
        <Button title="保存账号凭证到手机" color="#FF474E"></Button>
      </View>

      <View style={styles.warningContainer}>
        <Text style={styles.warningText}>账号丢失不用愁, 保存凭证解君忧!</Text>
      </View>

      <View style={styles.questionsContainer}>
        <Text style={styles.whiteText}>为什么要保存账号凭证?</Text>
        <Text style={styles.whiteText}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由于行业特殊性,当app无法使用需要下载新的安装
          包,以及系统升级等原因,用户进入app后自动生成了新
          的账号,从而导致原账号丢失。
        </Text>
        <Text style={styles.whiteText}>
          对此,账号丢失的用户可在
          <TouchableOpacity
            onPress={() => Linking.openURL("https://example.com")}
            style={styles.link}
          >
            <Text style={styles.linkText}>
              我的-设置-找回账号-账号 凭证找找
            </Text>
          </TouchableOpacity>
          ,扫描或上传该凭证二维码,即可找回升级更
          新前的原账号,而原账号的VIP等级等全套资料也将得到 恢复。
        </Text>
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
  titleAndBackBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#262632",
    height: 50,
  },
  backBtnContainer: {
    position: "absolute",
    left: 5,
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
  },
  qrCodeContainer: {
    backgroundColor: "#FFFFFF",
    height: 400,
    marginHorizontal: 20,
    borderRadius: 7,
    marginTop: 20,
  },
  qrCodeInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  qrCodeInnerImage: {
    width: 35,
    height: 35,
  },
  qrCodeTitle: {
    color: "grey",
  },
  qrCode: {
    alignItems: "center",
    justifyContent: "center",
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  qrDetails: {
    color: "grey",
    textAlign: "justify",
  },
  qrDetails2: {
    color: "grey",
    textAlign: "justify",
    paddingLeft: 60,
  },
  leftCircle: {
    width: 20,
    height: 20,
    borderRadius: 60,
    backgroundColor: "#191d26",
    position: "absolute",
    bottom: 60,
    left: -10,
    zIndex: 1,
  },
  qrFooterContainer: {
    borderTopWidth: 0.2,
    borderTopColor: "black",
    marginHorizontal: 25,
    top: 25,
    padding: 5,
  },
  qrFooterText: {
    fontSize: 14,
    color: "grey",
  },
  rightCircle: {
    width: 20,
    height: 20,
    borderRadius: 60,
    backgroundColor: "#191d26",
    position: "absolute",
    bottom: 60,
    right: -10,
    zIndex: 1,
  },
  btnContainer: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  warningContainer: {
    marginTop: 20,
  },
  warningText: {
    color: "#FF474E",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 17,
  },
  questionsContainer: {
    marginTop: 5,
    padding: 10,
  },
  whiteText: {
    color: "#FFFFFF",
  },
  link: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  linkText: {
    color: "#4362A5",
  },
});

export default AccountCertificate;
