import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";

import Logo from "assets/images/profilePhoto3.jpg";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      {/*Title and Back Button  */}
      <UserProfileSettingsHeader title={null} btnRight={null}/>

      <View style={styles.contentContainer}>
        <Image style={styles.logoImage} source={Logo} />
        <Text style={styles.linkText}>txvlog.com</Text>
        <Text style={styles.title}>隐私政策</Text>
        <Text style={styles.details}>
          本隐私条款说明当您使用我们的网站、手机应用程式或
          其他线上产品和服务(以下统称为「服务」),或者当
          您以其他方式与我们互动时,您的资讯将如何被收集并
          使用于「糖心」。我们可能会随时更改此隐私权条款,
          因此我们鼓励您在使用服务时,随时查看并了解我们最
          新的隐私权条款,以便帮助保护您的资讯隐私。 您所提供给我们的资讯
          我们会收集您直接提供给我们的资讯。例如,我们会收
          集所有您创建帐户时的资讯,以及使用服务来发送或接
          收的讯息(包含透过我们的服务「糖心」所拍摄的照片
          或影片,以及透过客服或与其他方式与我们沟通时所产
          生的讯息。)我们可能收集的资讯包含用户名称、帐户
          密码、电子邮件地址、电话号码、年龄、性别以及任何
          您选择提供的其他资讯。 我们诚心地建议您提供您拥有版权的内容(例如讯息、
          照片、影片、标题)。我们无法防范他人储存您的内容
          (例如拍摄截图),如果您不希望有心人士储存您的某。 些内容,那么您不应使用
          糖心发送该内容。 我们在您使用服务时所收集的资讯
          当您使用我们的服务时,我们会自动收集您的以下资 讯: •
          使用纪录:当您透过我们的服务发送或接收讯
          息,我们会收集这些讯息资讯,包括时间、日
          期、发件人和收件人等资讯。我们还会收集您发
          送与接收的讯息数量,以及您较常传送讯息的朋
          友名单。我们也会收集您使用我们的服务时的资
          讯,包含您的浏览器类型、语言、使用时间、IP 位址等。
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
  contentContainer: {
    marginHorizontal: 30,
    alignItems: "center",
  },
  logoImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  linkText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 15,
  },
  details: {
    color: "#FFFFFF",
  },
});

export default PrivacyPolicy;
