import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Box, Image, VStack } from "native-base";
import QRCode from "react-native-qrcode-svg";

import ButterflyLogo from "assets/images/butterflyLogo.png";
import Container from "components/Container";
import { GLOBAL_COLORS } from "global";
import { LinearGradient } from "expo-linear-gradient";
import { userStore } from "../../zustand/userStore";

const QRCodes = () => {
  const _id = userStore((store) => store._id);
  return (
    <VStack alignItems="center" p={5}>
      <Text style={styles.header}>色情的新品种 一键分享你的性生活</Text>
      <VStack
        position="relative"
        alignItems="center"
        m={5}
        mt={20}
        p={10}
        style={styles.qrContent}
      >
        <Image source={ButterflyLogo} style={styles.butterflyLogo} />
        <Text style={styles.qrTitle}>The Butterfly Project</Text>
        <Text style={styles.qrSubtitle}>蝴蝶计划</Text>
        <Box mt={5}>
          <QRCode value={_id} size={150} />
        </Box>
      </VStack>
      <VStack alignItems="center">
        <Text style={styles.email}>官方网站 : TheButterflyProject.com</Text>
        <Text style={styles.link}>备用站点 : TBP.net</Text>
      </VStack>
    </VStack>
  );
};

const BottomText = () => {
  return (
    <VStack alignItems="center">
      <LinearGradient
        colors={["#280B2B", "#280B2B", "#070307"]}
        style={{ width: "100%" }}
      >
        <Text style={styles.title}>将帐户凭据保存到手机</Text>
      </LinearGradient>
      <Text style={styles.text1}>
        账号丢失，请进入 设置-找回账号-账号-凭据找回-上传或扫描凭据
      </Text>
      <VStack alignItems="center">
        <Text style={styles.text2}>
          账号丢失不用担心，保存凭证解决后顾之忧!
        </Text>
        <Text style={styles.paragraph}>
          由于行业的特殊性，当APP无法使用时，需要重新下载安装包，升级系统。用户进入APP后，自动生成新账号，导致原账号丢失。对此，账号丢失的用户可前
          <Text style={styles.paragraph2}>
            往我的-设置-找回账号-账号证书找回
          </Text>
          ，扫描或上传证书二维码即可找回更新前的原账号，以及原账号的VIP等级全套数据也将被恢复。
        </Text>
      </VStack>
    </VStack>
  );
};

const index = () => {
  return (
    <Container>
      <QRCodes />
      <BottomText />
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  // **** QRCode **** //
  header: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  qrContent: {
    backgroundColor: GLOBAL_COLORS.primaryTextColor,
    borderRadius: 20,
  },
  butterflyLogo: {
    position: "absolute",
    height: 94,
    width: 94,
    top: -60,
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  qrSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 16,
  },
  link: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 16,
  },
  // **** BottomText **** //
  title: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 16,
    width: "100%",
    textAlign: "center",
    paddingTop: 10,
    marginBottom: 10,
  },
  text1: {
    color: GLOBAL_COLORS.primaryTextColor,
    marginVertical: 10,
  },
  text2: {
    fontSize: 12,
    color: "#FF0000",
    textAlign: "center",
    backgroundColor: GLOBAL_COLORS.primaryTextColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FF0000",
    margin: 10,
  },
  paragraph: {
    color: "#FFBEBE",
    paddingHorizontal: 20,
    textAlign: "justify",
  },
  paragraph2: {
    color: "#00BDE6",
  },
});
