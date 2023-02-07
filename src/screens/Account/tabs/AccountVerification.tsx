import React from "react";
import {
  ScrollView,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import {HStack, VStack} from "native-base";

import ImageTitle from "assets/images/profilePhoto.jpg";
import Buttons from "components/forms/Buttons";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import {globalStyle} from "globalStyles";

const QRCode= () => {
  return (
      <VStack justifyContent={'center'} alignItems={'center'} bg={globalStyle.primaryTextColor} p={5} mx={5} space={2} mt={2}>
        <HStack>
          <Image style={styles.titleImage} source={ImageTitle} />
          <Text style={styles.qrTitle}>
            网黄UP主的性爱博客{"\n"}
            分享你我的性福生活
          </Text>
        </HStack>

        <Image style={styles.qrCodeImage} source={ImageTitle} />

        <View>
          <Text style={styles.qrCodeText}>官网地址: txvlog.com</Text>
          <Text style={styles.qrCodeText}>备用地址: tangxin.one</Text>
          <Text style={styles.qrCodeText2}> tangxin.best</Text>
        </View>

        <HStack justifyContent={'space-between'} mx={-3}>
          <View style={styles.qrCircle}></View>
          <View style={styles.qrCodeDetails}>
            <Text style={styles.qrCodeDetailsText}>
              如果账号丢失,请到设置-找回账号-账号凭证 找回,上传凭证或扫描凭证
            </Text>
          </View>
          <View style={styles.qrCircle}></View>
        </HStack>
      </VStack>
  )
}
const AccountVerification = () => {

  return (
    <ScrollView style={styles.container}>
      <UserProfileSettingsHeader title='账号凭证' btnRight={null}/>
      <QRCode/>
      {/* Button */}
     <View style={styles.btnContainer}>
       <Buttons title={'保存账号凭证到手机'} onPress={() => alert('Test Verification Button')}/>
     </View>
      {/* WARNING */}
      <View style={styles.warning}>
        <Text style={styles.warningText}>账号丢失不用愁, 保存凭证解君忧!</Text>
      </View>

      {/* QUESTION */}
      <View style={styles.question}>
        <Text style={styles.otherInfoText}>为什么要保存账号凭证?</Text>
        <Text style={styles.otherInfoText}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由于行业特殊性,当app无法使用需要下载新的安装
          包,以及系统升级等原因,用户进入app后自动生成了新
          的账号,从而导致原账号丢失。
        </Text>
        <Text style={styles.otherInfoText}>
          对此,账号丢失的用户可在
          <TouchableOpacity
            onPress={() => Linking.openURL("https://example.com")}
            style={styles.linkText}
          >
            <Text style={styles.linkTextColor}>
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
    marginVertical: 0,
    maxWidth: Dimensions.get("window").width,
    backgroundColor: "#191d26",
  },
  titleImage: {
    width: 35,
    height: 35,
  },
  qrTitle: {
    color: "grey",
  },
  qrCodeImage: {
    width: 200,
    height: 200,
  },
  qrCodeText: {
    color: "grey",
    textAlign: "justify",
  },
  qrCodeText2: {
    color: "grey",
    textAlign: "justify",
    paddingLeft: 60,
  },
  qrCircle: {
    width: 20,
    height: 20,
    borderRadius: 60,
    backgroundColor: "#191d26",
  },
  qrCodeDetails: {
    borderTopWidth: 0.2,
    borderTopColor: "black",
    marginHorizontal: 25,
    top: 12,
    padding: 5,
  },
  qrCodeDetailsText: {
    fontSize: 14,
    color: "grey",
  },
  warning: {
    marginTop: 20,
  },
  warningText: {
    color: "#FF474E",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 17,
  },
  question: {
    marginTop: 5,
    padding: 10,
  },
  otherInfoText: {
    color: "#FFFFFF",
  },
  linkText: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  linkTextColor: {
    color: "#4362A5",
  },
  btnContainer: {
    marginHorizontal: 20,
    marginTop: 20
  }
});

export default AccountVerification;
