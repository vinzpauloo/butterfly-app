import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import { Box, HStack, ScrollView, Stack, VStack } from "native-base";

import Container from "components/Container";
import Download from "assets/images/download.png";
import DownloadWhite from "assets/images/download_white.png";
import ForeverVIP from "assets/images/foreverVIP.png";
import ForeverVIPWhite from "assets/images/foreverVIP_white.png";
import Live from "assets/images/live.png";
import LiveWhite from "assets/images/live_white.png";
import LiveChat from "assets/images/liveChat.png";
import LiveChatWhite from "assets/images/liveChat_white.png";
import Photos from "assets/images/photos.png";
import PhotosWhite from "assets/images/photos_white.png";
import Profile from "assets/images/profilePhoto.jpg";
import VideoCall from "assets/images/vidoecall.png";
import VideoCallWhite from "assets/images/videocall_white.png";
import Videos from "assets/images/videos.png";
import VideosWhite from "assets/images/videocall_white.png";
import WalletBanner from "assets/images/wallet_banner.png";
import WatchTicket from "assets/images/watchTicket.png";
import WatchTicketWhite from "assets/images/watchTicket_white.png";
import { GLOBAL_COLORS } from "global";
import { LinearGradient } from "expo-linear-gradient";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { log } from "react-native-reanimated";
import { userStore } from "../../zustand/userStore";

const Tab = createMaterialTopTabNavigator();

const Header = () => {
  return (
    <LinearGradient
      colors={["#280B2B", "#280B2B", "#070307"]}
      locations={[0.25, 1, 0.25]}
    >
      <HStack alignItems="center" justifyContent="space-between" px={6} py={4}>
        <HStack space={2} alignItems="center">
          <Image source={Profile} style={styles.profileImg} />
          <VStack>
            <Text style={styles.headerTitle}>犹豫的香气</Text>
            <Text style={styles.headerSubtitle}>您目前不是会员</Text>
          </VStack>
        </HStack>
        <Pressable style={styles.headerBtn}>
          <Text style={styles.headerBtnText}>使用兑换码</Text>
        </Pressable>
      </HStack>
    </LinearGradient>
  );
};

// START OF MEMBER TAB CODES

const VIPChoices = () => {
  const [active, setActive] = useState("five");
  const activeColorScheme = {
    //Y500
    five: {
      color: "#3C4B64",
      gradient: ["#F1F0ED", "#E5E4E2", "#D9D8D6", "#FFFFFF", "#5C6C7B"],
    },
    //Y400
    four: {
      color: "#B87D0F",
      gradient: ["#FFDAA8", "#FAECD9", "#DEAD1B", "#B87D0F"],
    },
    //Y300
    three: {
      color: "#777 ",
      gradient: ["#AEB2B8", "#E8EEF3", "#CDCDCD"],
    },
    //Y100
    one: {
      color: "#FFFFFF",
      gradient: ["#DA8A68", "#F5B993", "#D4785C", "#CB6D51"],
    },
  };

  const inactiveColorScheme = {
    color: "#FFFFFF",
    gradient: ["#666F80", "#666F80"],
  };

  const choices = [
    {
      id: "five",
      title: "遥控女友卡",
      amount: "¥500",
      amountDesc: "永久使用",
      subtitle: "金币免费",
      text: "超值礼包 裸聊照片和视频",
    },
    {
      id: "four",
      title: "遥控女友卡",
      amount: "¥400",
      amountDesc: "永久使用",
      subtitle: "金币免费",
      text: "最强权益，选择我!",
    },
    {
      id: "three",
      title: "遥控女友卡",
      amount: "¥300",
      amountDesc: "永久使用",
      subtitle: "金币免费",
      text: "会员当月选择",
    },
    {
      id: "one",
      title: "遥控女友卡",
      amount: "¥100",
      amountDesc: "永久使用",
      subtitle: "金币免费",
      text: "短期访问，买我!",
    },
  ];
  const handlePress = (id) => {
    setActive(id);
  };
  return (
    <HStack>
      {choices.map((item, index) => (
        <Box key={index} borderWidth={3} borderColor="#3C4B64" w="25%">
          <Pressable onPress={() => handlePress(item.id)}>
            <LinearGradient
              colors={
                item.id === active
                  ? activeColorScheme[active].gradient
                  : inactiveColorScheme.gradient
              }
            >
              <VStack alignItems="center" height={150}>
                <Text
                  style={[
                    styles.boxTitle,
                    {
                      color:
                        item.id === active
                          ? activeColorScheme[active].color
                          : inactiveColorScheme.color,
                    },
                  ]}
                >
                  {item.title}
                </Text>
                <VStack
                  position="relative"
                  alignItems="center"
                  borderWidth={1}
                  borderColor="#3C4B64"
                  width="103%"
                >
                  <Text
                    style={[
                      styles.boxPriceTag,
                      {
                        color:
                          item.id === active
                            ? activeColorScheme[active].color
                            : inactiveColorScheme.color,
                      },
                    ]}
                  >
                    {item.amount}
                  </Text>
                  <Text
                    style={[
                      styles.boxPriceTagText,
                      {
                        color:
                          item.id === active
                            ? activeColorScheme[active].color
                            : inactiveColorScheme.color,
                      },
                    ]}
                  >
                    {item.amountDesc}
                  </Text>
                </VStack>
                <Text
                  style={[
                    styles.boxBottomTextTitle,
                    {
                      color:
                        item.id === active
                          ? activeColorScheme[active].color
                          : inactiveColorScheme.color,
                    },
                  ]}
                >
                  {item.subtitle}
                </Text>
                <Text
                  style={[
                    styles.boxBottomTextSubtitle,
                    {
                      color:
                        item.id === active
                          ? activeColorScheme[active].color
                          : inactiveColorScheme.color,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {item.text}
                </Text>
              </VStack>
            </LinearGradient>
          </Pressable>
        </Box>
      ))}
    </HStack>
  );
};

const PromotionalPackage = () => {
  const lists = [
    {
      image: Videos,
      title: "videos",
    },
    {
      image: Photos,
      title: "photos",
    },
    {
      image: Live,
      title: "live",
    },
    {
      image: VideoCall,
      title: "video call",
    },
    {
      image: LiveChat,
      title: "live chat",
    },
    {
      image: ForeverVIP,
      title: "forever vip",
    },
    {
      image: Download,
      title: "download",
    },
    {
      image: WatchTicket,
      title: "watch ticket",
    },
  ];
  return (
    <Box style={styles.imagesContainer}>
      <Text style={styles.imagesTitle}>促销包</Text>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {lists.map((item, index) => (
          <Box key={index} width="25%" alignItems="center" mt={2}>
            <Box alignItems="center">
              <Image source={item.image} style={styles.images} />
              <Text style={styles.imagesText}>{item.title}</Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Comment = () => {
  return (
    <Box style={styles.commentContainer}>
      <Text style={styles.commentText}>
        Lorem ipsum dolor sit amet consectetur. Enim vel elit venenatis ultrices
        vel feugiat varius aenean. Pellentesque nisl dolor et magna neque
        pharetra in porttitor. Sit id rhoncus viverra et. Pharetra nulla sit
        facilisis scelerisque et ultricies eu aliquet. Eu habitasse tincidunt
        sed id id malesuada interdum. psum dolor sit amet consectetur. Enim vel
        elit venenatis ultrices vel feugiat varius aenean. Pellentesque nisl
        dolor
      </Text>
    </Box>
  );
};

const Button = () => {
  return (
    <Box alignItems="center">
      <Pressable style={styles.bottomBtn}>
        <Text style={styles.bottomBtnText}>Get Offer</Text>
      </Pressable>
    </Box>
  );
};

const Member = () => {
  return (
    <Container>
      <VIPChoices />
      <PromotionalPackage />
      <Comment />
      <Button />
    </Container>
  );
};

// END OF MEMBER TAB CODES

// START OF WALLET TAB CODES

const Wallet = () => {
  const coinList = [500, 400, 300, 100];
  return (
    <Container>
      <ScrollView>
        {coinList.map((item, index) => (
          <VStack key={index} alignItems="center" space={2} position="relative">
            <ImageBackground source={WalletBanner} style={styles.walletImg} />
            <Box style={styles.coins}>
              <Text style={styles.coinText}>{item} Gold Coins</Text>
            </Box>
          </VStack>
        ))}
      </ScrollView>
    </Container>
  );
};

// END OF WALLET TAB CODES

// Menu Tab

const VIPMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: GLOBAL_COLORS.primaryColor },
        tabBarActiveTintColor: "#FF35F0",
        tabBarInactiveTintColor: "#C6C1C1",
        tabBarLabelStyle: { fontSize: 20, fontWeight: "bold" },
      }}
    >
      <Tab.Screen name="VIP会员" component={Member} />
      <Tab.Screen name="钱包" component={Wallet} />
    </Tab.Navigator>
  );
};

const index = () => {
  const id = userStore((store) => store._id);
  console.log("###", id);

  return (
    <Container>
      <Header />
      <VIPMenu />
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  // HEADER
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: GLOBAL_COLORS.primaryTextColor,
  },
  headerTitle: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  headerSubtitle: { color: GLOBAL_COLORS.primaryTextColor, fontSize: 10 },
  headerBtn: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  headerBtnText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 12,
  },
  // **** MEMBER **** //
  // VIPChoices
  boxTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  boxPriceTag: {
    fontSize: 30,
    fontWeight: "bold",
  },
  boxPriceTagText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  boxBottomTextTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  boxBottomTextSubtitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  // PromotionalPackage
  imagesContainer: {
    backgroundColor: "#b9b8b8",
    marginHorizontal: 15,
    marginVertical: 20,
    padding: 15,
    borderRadius: 10,
  },
  imagesTitle: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  images: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    marginVertical: 5,
  },
  imagesText: {
    color: "#FFF",
    textTransform: "uppercase",
  },
  // Comment
  commentContainer: {
    backgroundColor: "#c0c3c2",
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 10,
  },
  commentText: {
    fontSize: 14,
    color: "#540B55",
    textAlign: "justify",
    lineHeight: 20,
  },
  // Button
  bottomBtn: {
    backgroundColor: "#02d113",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    marginVertical: 15,
  },
  bottomBtnText: {
    color: GLOBAL_COLORS.primaryTextColor,
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
  },
  // **** WALLET **** //
  walletImg: {
    width: "100%",
    height: 140,
  },
  coins: {
    position: "absolute",
    left: 30,
    bottom: 30,
    fontSize: 20,
    color: GLOBAL_COLORS.primaryTextColor,
    fontWeight: "bold",
    backgroundColor: "#646464",
    opacity: 0.75,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  coinText: {
    fontSize: 20,
    color: GLOBAL_COLORS.primaryTextColor,
    fontWeight: "bold",
  },
});
