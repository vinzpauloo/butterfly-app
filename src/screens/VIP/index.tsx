import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import { Box, FlatList, HStack, ScrollView, VStack } from "native-base";

import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
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
import SubscriptionsBundle from "services/api/SubscriptionBundle";
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
import { userStore } from "../../zustand/userStore";
import { useMutation, useQuery } from "@tanstack/react-query";

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

const VIPChoices = ({ active, setActive, bundle }) => {
  const activeColorScheme = {
    gradient: ["#9747FF", "#C74FFF"],
    border: "#EF44BF",
    primaryText: "#FFFFFF",
    secondaryText: "#3C4B64",
  };

  const inactiveColorScheme = {
    gradient: ["#666F80", "#666F80"],
    border: "#3C4B64",
    primaryText: "#FFFFFF",
    secondaryText: "#666F80",
  };

  const handlePress = (id) => {
    setActive(id);
  };
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={bundle}
        keyExtractor={(_, index) => "" + index}
        renderItem={({ item, index }: any) => (
          <Box
            key={index}
            borderWidth={3}
            borderColor={
              index === active
                ? activeColorScheme.border
                : inactiveColorScheme.border
            }
            height={172}
          >
            <Pressable onPress={() => handlePress(index)}>
              <LinearGradient
                colors={
                  index === active
                    ? activeColorScheme.gradient
                    : inactiveColorScheme.gradient
                }
              >
                <VStack alignItems="center" height={150} m={2}>
                  <Text
                    style={[
                      styles.boxTitle,
                      {
                        color: activeColorScheme.primaryText,
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <VStack
                    position="relative"
                    alignItems="center"
                    borderWidth={0.5}
                    borderColor="#3C4B64"
                    width="127%"
                    backgroundColor={"#FFFFFF"}
                  >
                    <Text
                      style={[
                        styles.boxPriceTag,
                        {
                          color:
                            index === active
                              ? activeColorScheme.secondaryText
                              : inactiveColorScheme.secondaryText,
                        },
                      ]}
                    >
                      {item.price}
                    </Text>
                    <Text
                      style={[
                        styles.boxPriceTagText,
                        {
                          color:
                            index === active
                              ? activeColorScheme.secondaryText
                              : inactiveColorScheme.secondaryText,
                        },
                      ]}
                    >
                      永久使用
                    </Text>
                  </VStack>
                  <Text
                    style={[
                      styles.boxBottomTextTitle,
                      {
                        color: activeColorScheme.primaryText,
                      },
                    ]}
                  >
                    金币免费
                  </Text>
                  <Text
                    style={[
                      styles.boxBottomTextSubtitle,
                      {
                        color: activeColorScheme.primaryText,
                      },
                    ]}
                    numberOfLines={2}
                  >
                    短期访问，买我!
                  </Text>
                </VStack>
              </LinearGradient>
            </Pressable>
          </Box>
        )}
      />
    </View>
  );
};

const PromotionalPackage = ({ isLoading, perks }) => {
  const lists = [
    {
      active_image: Videos,
      inactive_image: VideosWhite,
      title: "videos",
      isActive: isLoading || perks["videos"],
    },
    {
      active_image: Photos,
      inactive_image: PhotosWhite,
      title: "photos",
      isActive: isLoading || perks["photos"],
    },
    {
      active_image: Live,
      inactive_image: LiveWhite,
      title: "live",
      isActive: isLoading || perks["live_streaming"],
    },
    {
      active_image: VideoCall,
      inactive_image: VideoCallWhite,
      title: "video call",
      isActive: isLoading || perks["video_call"],
    },
    {
      active_image: LiveChat,
      inactive_image: LiveChatWhite,
      title: "live chat",
      isActive: isLoading || perks["live_chat"],
    },
    {
      active_image: ForeverVIP,
      inactive_image: ForeverVIPWhite,
      title: "forever vip",
      isActive: isLoading || perks["forever_vip"],
    },
    {
      active_image: Download,
      inactive_image: DownloadWhite,
      title: "download",
      isActive: isLoading || perks["download"],
    },
    {
      active_image: WatchTicket,
      inactive_image: WatchTicketWhite,
      title: "watch ticket",
      isActive: isLoading || perks["watch_ticket"],
    },
  ];
  return (
    <Box style={styles.imagesContainer}>
      <Text style={styles.imagesTitle}>促销包</Text>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {lists.map((item, index) => (
          <Box key={index} width="25%" alignItems="center" mt={2}>
            <Box alignItems="center">
              <Image
                source={item.isActive ? item.active_image : item.inactive_image}
                style={styles.images}
              />
              <Text style={styles.imagesText}>{item.title}</Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Description = ({ isLoading, description }) => {
  return (
    <Box style={styles.commentContainer}>
      <Text style={styles.commentText}>{isLoading ? "..." : description}</Text>
    </Box>
  );
};

const Button = () => {
  const { is_Vip, setVip, api_token: token } = userStore((state) => state);
  const { subscribeToVIP } = CustomerService(); // change if the "Buy Subscription Bundle API" is working

  const { mutate: mutateSubscribe } = useMutation(subscribeToVIP, {
    onSuccess: (data) => {
      console.log("subscribeToVIP", data);

      /* Update is_vip state */
      setVip(true);
    },
    onError: (error) => {
      console.log("subscribeToVIP", error);
    },
  });

  const handlePress = () => {
    mutateSubscribe({
      data: { amount: 200.0, title: "Diamond Privillege Card" }, // change if the "Buy Subscription Bundle API" is working
      token,
    });
  };

  return (
    <Box alignItems="center">
      <Pressable
        style={[
          styles.bottomBtn,
          { backgroundColor: is_Vip ? "#666F80" : "#02d113" },
        ]}
        onPress={handlePress}
        disabled={is_Vip}
      >
        <Text
          style={[
            styles.bottomBtnText,
            { color: is_Vip ? "#333333" : GLOBAL_COLORS.primaryTextColor },
          ]}
        >
          Get Offer
        </Text>
      </Pressable>
    </Box>
  );
};

const Member = () => {
  const [active, setActive] = useState(0);
  const [bundle, setBundle] = useState([]);

  const { api_token } = userStore((store) => store);
  const { getAllSubscriptionBundle } = SubscriptionsBundle();

  const { isLoading, isFetching } = useQuery({
    queryKey: ["subscription bundle"],
    queryFn: () =>
      getAllSubscriptionBundle({ data: { active: true }, token: api_token }),
    onSuccess: (data) => {
      console.log("####", data);

      const sortedData = data.data.sort(
        (firstItem, secondItem) => secondItem.price - firstItem.price
      );
      setBundle(sortedData);
    },
    onError: (error) => {
      console.log("Subscription Bundle: ", error);
    },
  });

  return (
    <Container>
      <VIPChoices active={active} setActive={setActive} bundle={bundle} />
      <PromotionalPackage
        isLoading={isLoading || isFetching}
        perks={bundle[active]?.perks}
      />
      <Description
        isLoading={isLoading || isFetching}
        description={bundle[active]?.description}
      />
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
    // backgroundColor: "#02d113",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    marginVertical: 15,
  },
  bottomBtnText: {
    // color: GLOBAL_COLORS.primaryTextColor,
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
