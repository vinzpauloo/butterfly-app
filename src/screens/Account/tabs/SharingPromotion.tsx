import { ScrollView, Text, View, StyleSheet, Image, ImageBackground, Pressable, Dimensions } from "react-native";
import { Avatar, HStack, VStack } from "native-base";
import { GLOBAL_COLORS, GLOBAL_SCREEN_SIZE } from "global";
import sharingQRContainer from "assets/images/sharingQRContainer.png";
import QR from "assets/images/QR.png";
import vincent from "assets/images/vincent-avatar.png";
import Container from "components/Container";
import React from "react";

const { width } = Dimensions.get("window");

const SharingPromotion = () => {
  return (
    <Container>
      <ScrollView>
        <View style={styles.container}>
          <VStack alignItems='center'>
            <ImageBackground resizeMode='contain' source={sharingQRContainer} style={styles.imageBackground}>
              <VStack pt={width < GLOBAL_SCREEN_SIZE.mobile? '10px' : '33px'} alignItems='center' space={width < GLOBAL_SCREEN_SIZE.mobile? 0 : 3}>
                <Text style={styles.headerText}>我的专属邀请码</Text>
                <Image source={QR} style={styles.QRImage} />
                <Text style={styles.redText}>分享好友立赠xx专享会员</Text>
                <Text style={[styles.redText, { marginTop: 35 }]} >邀请码：CDWQMC</Text>
              </VStack>
              <HStack style={styles.userContainer} space={2}>
                <Avatar source={vincent} size={42} borderWidth={2} borderColor='white' />
                <VStack>
                  <Text style={styles.whiteTextBold}>xxup主的博客</Text>
                  <Text style={styles.whiteText}>分享你我的生活</Text>
                </VStack>
              </HStack>
            </ImageBackground>
            <HStack space={4} mt={6} justifyContent={width < GLOBAL_SCREEN_SIZE.mobile ? 'center' : null}>
              <Pressable style={styles.button}>
                <Text style={styles.blackTextBold}>保存图片</Text>
              </Pressable>
              <Pressable style={styles.button}>
                <Text style={styles.blackTextBold}>复制链接</Text>
              </Pressable>
            </HStack>
            <VStack space={5} mt={6} maxW={336}>
              <VStack space={2}>
                <Text style={styles.whiteTextBold}>推广奖励</Text>
                <Text style={styles.whiteTextBold}>推广成功
                  <Text style={styles.brownText}> 1 </Text>
                  人，赠送：VIP
                  <Text style={styles.brownText}> 1 </Text>
                  天
                </Text>
                <Text style={styles.whiteTextBold}>
                  推广成功
                  <Text style={styles.brownText}> 3 </Text>
                  人，赠送：VIP
                  <Text style={styles.brownText}> 3 </Text>
                  天
                </Text>
                <Text style={styles.whiteTextBold}>
                  推广成功
                  <Text style={styles.brownText}> 10 </Text>
                  人，赠送：VIP
                  <Text style={styles.brownText}> 10 </Text>
                  天 + 观影券
                  <Text style={styles.brownText}> 5 </Text>
                  元
                </Text>
              </VStack>
              <VStack space={1}>
                <Text style={styles.whiteText}>注意事项：</Text>
                <Text style={styles.grayText}>观影优惠仅用于抵扣任意金币视频。</Text>
              </VStack>
              <VStack space={1}>
                <Text style={styles.whiteText}>操作说明：</Text>
                <Text style={styles.grayText}>点击各视频世界分享按钮，保存二维码及推广链接口，立即分享到微博、朋友圈、论坛分类。</Text>
              </VStack>
            </VStack>
          </VStack>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  imageBackground: {
    height: width < GLOBAL_SCREEN_SIZE.mobile ? 400 : 481,
    width: width < GLOBAL_SCREEN_SIZE.mobile ? '100%' : 343,
  },
  QRImage: {
    width: 200,
    height: 200
  },
  headerText: {
    color: GLOBAL_COLORS.secondaryColor,
    fontSize: 28,
    fontWeight: 'bold'
  },
  redText: {
    color: '#FF5949',
    fontSize: 14,
    fontWeight: 'bold'
  },
  userContainer: {
    paddingTop: width < GLOBAL_SCREEN_SIZE.mobile ? 25 : 30,
    paddingLeft: width < GLOBAL_SCREEN_SIZE.mobile ? 25 : 30
  },
  whiteText: {
    color: 'white',
  },
  whiteTextBold: {
    color: 'white',
    fontWeight: 'bold'
  },
  brownText: {
    color: '#C79765'
  },
  button: {
    backgroundColor: '#C79765',
    width: width < GLOBAL_SCREEN_SIZE.mobile ? 130 : 163,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  blackTextBold: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
  },
  grayText: {
    color: '#8B8E92',
    fontWeight: 'bold'
  }
});

export default SharingPromotion;
