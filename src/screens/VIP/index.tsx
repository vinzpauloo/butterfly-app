import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import {
  Actionsheet,
  Box,
  Center,
  Checkbox,
  Divider,
  FlatList,
  HStack,
  ScrollView,
  VStack,
  useDisclose,
} from "native-base";

import AlipayImg from "assets/images/alipay.png";
import CoinsBundle from "services/api/CoinBundle";
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
import LoadingSpinner from "components/LoadingSpinner";
import Photos from "assets/images/photos.png";
import PhotosWhite from "assets/images/photos_white.png";
import Profile from "assets/images/profilePhoto.jpg";
import SubscriptionsBundle from "services/api/SubscriptionBundle";
import TenpayImg from "assets/images/tenpay.png";
import UnionpayImg from "assets/images/unionpay.png";
import VideoCall from "assets/images/vidoecall.png";
import VideoCallWhite from "assets/images/videocall_white.png";
import Videos from "assets/images/videos.png";
import VideosWhite from "assets/images/videocall_white.png";
import WatchTicket from "assets/images/watchTicket.png";
import WatchTicketWhite from "assets/images/watchTicket_white.png";
import WepayImg from "assets/images/wepay.png";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GLOBAL_COLORS } from "global";
import { LinearGradient } from "expo-linear-gradient";
import { translationStore } from "../../zustand/translationStore";
import { userStore } from "../../zustand/userStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useIsFocused } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

// **** HEADER COMPONENT START CODE **** //
const Header = () => {
  const { alias } = userStore((state) => state);
  const { translations } = translationStore((store) => store);
  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      px={6}
      py={4}
      backgroundColor="#06090e"
    >
      <HStack space={2} alignItems="center">
        <Image source={Profile} style={styles.profileImg} />
        <VStack>
          <Text style={styles.headerTitle}>{alias}</Text>
          {/* <Text style={styles.headerSubtitle}>您目前不是会员</Text> */}
        </VStack>
      </HStack>
      <Pressable style={styles.headerBtn}>
        <Text style={styles.headerBtnText}>
          {translations.useRedemptionCode}
        </Text>
      </Pressable>
    </HStack>
  );
};
// **** HEADER COMPONENT END CODE **** //

// **** VIP CHOICES COMPONENT START CODE **** //
const VIPChoices = ({ active, setActive, bundle }) => {
  const { translations } = translationStore((store) => store);

  const activeColorScheme = {
    gradient: "#5b5b5b",
    border: "#FFFFFF",
    primaryText: "#FFFFFF",
    secondaryText: "#3C4B64",
  };

  const inactiveColorScheme = {
    gradient: GLOBAL_COLORS.primaryColor,
    border: GLOBAL_COLORS.primaryColor,
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
            backgroundColor={
              index === active
                ? activeColorScheme.gradient
                : inactiveColorScheme.gradient
            }
          >
            <Pressable onPress={() => handlePress(index)}>
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
                    {translations.permanentUse}
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
                  {translations.goldCoinsFree}
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
                  {translations.shortVisit}
                </Text>
              </VStack>
            </Pressable>
          </Box>
        )}
      />
    </View>
  );
};
// **** VIP CHOICES COMPONENT END CODE **** //

// **** PROMOTIONAL PACKAGE COMPONENT START CODE **** //
const PromotionalPackage = ({ perks }) => {
  const { translations } = translationStore((store) => store);
  const lists = [
    {
      active_image: Videos,
      inactive_image: VideosWhite,
      title: translations.videos,
      isActive: !!perks && perks["videos"],
    },
    {
      active_image: Photos,
      inactive_image: PhotosWhite,
      title: translations.photo,
      isActive: !!perks && perks["photos"],
    },
    {
      active_image: Live,
      inactive_image: LiveWhite,
      title: translations.live,
      isActive: !!perks && perks["live_streaming"],
    },
    {
      active_image: VideoCall,
      inactive_image: VideoCallWhite,
      title: translations.videoCall,
      isActive: !!perks && perks["video_call"],
    },
    {
      active_image: LiveChat,
      inactive_image: LiveChatWhite,
      title: translations.liveChat,
      isActive: !!perks && perks["live_chat"],
    },
    {
      active_image: ForeverVIP,
      inactive_image: ForeverVIPWhite,
      title: translations.foreverVIP,
      isActive: !!perks && perks["forever_vip"],
    },
    {
      active_image: Download,
      inactive_image: DownloadWhite,
      title: translations.download,
      isActive: !!perks && perks["download"],
    },
    {
      active_image: WatchTicket,
      inactive_image: WatchTicketWhite,
      title: translations.watchTicket,
      isActive: !!perks && perks["watch_ticket"],
    },
  ];
  return (
    <Box style={styles.imagesContainer}>
      <Text style={styles.imagesTitle}>{translations.promotionPackage}</Text>
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
// **** PROMOTIONAL PACKAGE COMPONENT END CODE **** //

// **** DESCRIPTION COMPONENT START CODE **** //
const Description = ({ description }) => {
  return (
    <Box style={styles.commentContainer}>
      <Text style={styles.commentText}> {description}</Text>
    </Box>
  );
};

const Button = ({ onOpen }) => {
  const { is_Vip } = userStore((state) => state);
  const { translations } = translationStore((store) => store);

  const handlePress = (event) => {
    onOpen({ onOpen });
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
          {translations.getOffer}
        </Text>
      </Pressable>
    </Box>
  );
};
// **** DESCRIPTION COMPONENT END CODE **** //

// **** MEMBER COMPONENT START CODE **** //
const Member = ({ onOpen }) => {
  const [active, setActive] = useState(0);
  const [bundle, setBundle] = useState([]);

  const { api_token } = userStore((store) => store);
  const isFocused = useIsFocused();
  const { getAllSubscriptionBundle } = SubscriptionsBundle();

  const { isLoading, isRefetching } = useQuery({
    queryKey: ["subscription bundle"],
    queryFn: () =>
      getAllSubscriptionBundle({ data: { active: true }, token: api_token }),
    onSuccess: (data) => {
      const sortedData = data.data.sort(
        (firstItem, secondItem) => secondItem.price - firstItem.price
      );
      setBundle(sortedData);
    },
    onError: (error) => {
      console.log("Subscription Bundle: ", error);
    },
    enabled: isFocused,
  });

  if (isLoading || isRefetching) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container>
      <VIPChoices active={active} setActive={setActive} bundle={bundle} />
      <PromotionalPackage perks={bundle[active]?.perks} />
      <Description description={bundle[active]?.description} />
      <Button onOpen={onOpen} />
    </Container>
  );
};
// **** MEMBER COMPONENT END CODE **** //

// **** WALLET COMPONENT START CODE **** //
const Wallet = ({ onOpen }) => {
  const { api_token } = userStore((store) => store);
  const { translations } = translationStore((store) => store);
  const { getAllCoinBundle } = CoinsBundle();
  const isFocused = useIsFocused();
  const { isLoading, isRefetching, data } = useQuery({
    queryKey: ["Coins Bundle"],
    queryFn: () =>
      getAllCoinBundle({ data: { with: "sites" }, token: api_token }),
    enabled: isFocused,
  });

  const handlePayment = (event) => {
    onOpen(event);
  };

  if (isLoading || isRefetching) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container>
      <HStack width="full" height="16" backgroundColor="#000711">
        <VStack
          style={styles.leftHeader}
          alignItems="center"
          justifyContent="center"
          height="full"
          width="1/2"
        >
          <Text style={styles.smallText}>{translations.currentBalance}</Text>
          <Text style={styles.largeText}>0元</Text>
          <Text style={styles.smallText}>{translations.balanceDetails}</Text>
        </VStack>
        <VStack
          style={styles.rightHeader}
          alignItems="center"
          justifyContent="center"
          height="full"
          width="1/2"
        >
          <Text style={styles.smallText}>{translations.cumulativeIncome}</Text>
          <Text style={styles.largeText}>0元</Text>
          <Text style={styles.smallText}>{translations.withdrawnProceeds}</Text>
        </VStack>
      </HStack>
      <ScrollView>
        <VStack alignItems="center" p={3}>
          {data?.data.map((item, index) => (
            <HStack
              key={index}
              alignItems="center"
              style={styles.boxContent}
              my={5}
              h="24"
            >
              <Box
                alignItems="center"
                justifyContent="center"
                height="full"
                style={styles.leftBox}
              >
                <Text style={styles.leftText}>{item.amount}元</Text>
              </Box>
              <VStack style={styles.rightBox} height="full">
                <Box
                  px={1}
                  alignItems="center"
                  justifyContent="center"
                  style={styles.rightTopBox}
                  height="1/2"
                >
                  <Text style={styles.rightText}>{item.description}</Text>
                </Box>
                <Box
                  px={1}
                  alignItems="center"
                  justifyContent="center"
                  height="1/2"
                >
                  <Text style={styles.rightText}>{item.name}</Text>
                </Box>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </ScrollView>
      <VStack w="full">
        <Pressable onPress={handlePayment}>
          <Text style={styles.paymentBtn}>购买黄金包</Text>
        </Pressable>
      </VStack>
    </Container>
  );
};
// **** WALLET COMPONENT END CODE **** //

// **** PAYMENT MODAL COMPONENT START CODE **** //
const PaymentModal = ({ isOpen, onClose }) => {
  const { setVip, api_token } = userStore((state) => state);
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
  const handlePay = (event) => {
    mutateSubscribe({
      data: { amount: 200.0, title: "Diamond Privillege Card" }, // change if the "Buy Subscription Bundle API" is working
      token: api_token,
    });
    onClose(event);
  };
  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content
          borderTopRadius="0"
          backgroundColor="#202833"
          borderWidth={1}
        >
          <VStack width="full" alignItems="center">
            <Text style={styles.modalHeader}>请选择付款方式</Text>
            <Divider color="#EF44BF" />
            <VStack p={5} width="full">
              <HStack alignItems="center" justifyContent="space-between">
                <Image source={AlipayImg} style={styles.paymentImg} />
                <Checkbox colorScheme="green" value={""} size="md" />
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Image source={WepayImg} style={styles.paymentImg} />
                <Checkbox colorScheme="green" value={""} size="md" />
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Image source={UnionpayImg} style={styles.paymentImg} />
                <Checkbox colorScheme="green" value={""} size="md" />
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Image source={TenpayImg} style={styles.paymentImg} />
                <Checkbox colorScheme="green" value={""} size="md" />
              </HStack>
            </VStack>
            <VStack alignItems="flex-start">
              <Text style={styles.warningText}>付款提示</Text>
              <VStack my={3}>
                <Text style={styles.descriptionText}>
                  1. 请跳转后支付i时间，超时支付收不到，必须重新发起
                </Text>
                <Text style={styles.descriptionText}>
                  2. 每天发起支付的次数不能超过 5 次。如果连续发起付款而未付款,
                  该账户可能会被加入黑名单
                </Text>
                <Text style={styles.descriptionText}>
                  3.
                  支付通道在夜间繁忙。为了保证您的观看体验，您可以选择白天付费，晚上观看。谢谢你的理解`
                </Text>
              </VStack>
            </VStack>
            <VStack w="full">
              <Pressable onPress={handlePay}>
                <Text style={styles.paymentBtn}>
                  立即付款并享受独家性爱视频
                </Text>
              </Pressable>
            </VStack>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};
// **** PAYMENT MODAL COMPONENT END CODE **** //

// **** MENU TAB COMPONENT START CODE **** //
const VIPMenu = ({ onOpen }) => {
  const { translations } = translationStore((store) => store);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: GLOBAL_COLORS.primaryColor },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#C6C1C1",
        tabBarLabelStyle: { fontSize: 20, fontWeight: "bold" },
      }}
    >
      <Tab.Screen
        name={translations.vipMember}
        component={() => <Member onOpen={onOpen} />}
      />
      <Tab.Screen
        name={translations.wallet}
        component={() => <Wallet onOpen={onOpen} />}
      />
    </Tab.Navigator>
  );
};
// **** MENU TAB COMPONENT END CODE **** //

const index = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Container>
      <Header />
      <VIPMenu onOpen={onOpen} />
      <PaymentModal isOpen={isOpen} onClose={onClose} />
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
    backgroundColor: "#323A44",
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
  leftHeader: {
    borderRightWidth: 1,
    borderRightColor: "#FFFFFF",
  },
  rightHeader: { borderLeftWidth: 1, borderLeftColor: "#FFFFFF" },
  smallText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontWeight: "bold",
  },
  largeText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontWeight: "bold",
    fontSize: 20,
  },
  boxContent: {
    borderWidth: 2,
    borderColor: GLOBAL_COLORS.primaryTextColor,
    borderRadius: 5,
    width: "100%",
  },
  leftBox: {
    borderRightWidth: 2,
    borderRightColor: GLOBAL_COLORS.primaryTextColor,
    width: "50%",
  },
  leftText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 45,
    lineHeight: 48,
    fontWeight: "bold",
    textAlign: "center",
  },
  rightBox: {
    width: "50%",
  },
  rightTopBox: {
    borderBottomWidth: 2,
    borderBottomColor: GLOBAL_COLORS.primaryTextColor,
  },
  rightText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  // **** PAYMENT MODAL **** //
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: GLOBAL_COLORS.primaryTextColor,
    paddingVertical: 5,
  },
  paymentImg: {
    width: 100,
    height: 40,
    resizeMode: "contain",
    marginVertical: 5,
  },
  warningText: {
    color: GLOBAL_COLORS.primaryTextColor,
    backgroundColor: "#FF0000",
    borderColor: GLOBAL_COLORS.primaryTextColor,
    borderWidth: 0.5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  descriptionText: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  paymentBtn: {
    backgroundColor: "#FF0000",
    width: "100%",
    textAlign: "center",
    paddingVertical: 15,
    borderRadius: 5,
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 16,
    fontWeight: "bold",
  },
});
