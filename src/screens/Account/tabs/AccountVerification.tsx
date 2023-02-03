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

import ImageTitle from "assets/images/profilePhoto.jpg";
import Buttons from "components/forms/Buttons";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";

const AccountVerification = () => {

  return (
    <ScrollView style={styles.container}>

      {/*Title and Back Button  */}
      <UserProfileSettingsHeader title='账号凭证' btnRight={null}/>

      {/* QRCODE */}
      <View style={styles.qrCodeMainContainer}>
        <View style={styles.qrCodeTitleContainer}>
          <Image style={styles.titleImage} source={ImageTitle} />
          <Text style={styles.qrTitle}>
            网黄UP主的性爱博客{"\n"}
            分享你我的性福生活
          </Text>
        </View>

        <View style={styles.qrCodeContainer}>
          <Image style={styles.qrCodeImage} source={ImageTitle} />

          <View>
            <Text style={styles.qrCodeText}>官网地址: txvlog.com</Text>
            <Text style={styles.qrCodeText}>备用地址: tangxin.one</Text>
            <Text style={styles.qrCodeText2}> tangxin.best</Text>
          </View>
        </View>

        <View style={styles.qrLeftCircle}></View>

        <View style={styles.qrCodeDetails}>
          <Text style={styles.qrCodeDetailsText}>
            如果账号丢失,请到设置-找回账号-账号凭证 找回,上传凭证或扫描凭证
          </Text>
        </View>

        <View style={styles.qrRightCircle}></View>
      </View>

      {/* Button */}
     <View style={styles.btnContainer}>
       <Buttons props={'保存账号凭证到手机'}/>
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
  qrCodeMainContainer: {
    backgroundColor: "#FFFFFF",
    height: 400,
    marginHorizontal: 20,
    borderRadius: 7,
    marginTop: 10,
  },
  qrCodeTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  titleImage: {
    width: 35,
    height: 35,
  },
  qrTitle: {
    color: "grey",
  },
  qrCodeContainer: {
    alignItems: "center",
    justifyContent: "center",
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
  qrLeftCircle: {
    width: 20,
    height: 20,
    borderRadius: 60,
    backgroundColor: "#191d26",
    position: "absolute",
    bottom: 60,
    left: -10,
    zIndex: 1,
  },
  qrCodeDetails: {
    borderTopWidth: 0.2,
    borderTopColor: "black",
    marginHorizontal: 25,
    top: 25,
    padding: 5,
  },
  qrRightCircle: {
    width: 20,
    height: 20,
    borderRadius: 60,
    backgroundColor: "#191d26",
    position: "absolute",
    bottom: 60,
    right: -10,
    zIndex: 1,
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
