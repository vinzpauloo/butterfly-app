import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

import { Box, HStack, Image, VStack } from "native-base";
import QRCode from "react-native-qrcode-svg";

import ButterflyLogo from "assets/images/butterflyLogo.png";
import Container from "components/Container";
import CredentialDownloadIcon from "assets/images/credentialDownloadIcon.png";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../zustand/userStore";

const QRCodes = () => {
  const _id = userStore((store) => store._id);
  return (
    <VStack alignItems="center" p={5}>
      <Text style={styles.header}>色情的新品种 一键分享你的性生活</Text>
      <VStack
        position="relative"
        alignItems="center"
        m="5"
        mt="16"
        pt="12"
        p="10"
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
    <VStack alignItems="center" space={5} m={2}>
      <HStack
        alignItems="center"
        justifyContent="center"
        px={5}
        style={styles.downloadContent}
      >
        <Image source={CredentialDownloadIcon} style={styles.downloadIcon} />
        <Text style={styles.title}>将帐户凭据保存到手机</Text>
      </HStack>
      <Text style={styles.text1}>
        账号丢失，请进入 设置-找回账号-账号-凭证找回-上传或扫描凭证
      </Text>
      <Text style={styles.text2}>账号丢失不用担心，保存凭证解决后顾之忧!</Text>
      <Text style={styles.paragraph}>
        由于行业的特殊性，当APP无法使用时，需重新下载
      </Text>
    </VStack>
  );
};

const index = () => {
  return (
    <Container>
      <ScrollView>
        <QRCodes />
        <BottomText />
      </ScrollView>
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
    height: 90,
    width: 90,
    top: -45,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 45,
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
    fontSize: 16,
    textAlign: "center",
    paddingTop: 10,
    marginBottom: 10,
  },
  text1: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  text2: {
    fontSize: 12,
    color: GLOBAL_COLORS.primaryTextColor,
    textAlign: "center",
    backgroundColor: "#F09536",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  paragraph: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  downloadContent: {
    backgroundColor: "#C79765",
    borderRadius: 20,
  },
  downloadIcon: {
    height: 18,
    width: 18,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
});
