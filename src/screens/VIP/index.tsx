import {
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";

import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import * as Linking from "expo-linking";
import {
  Actionsheet,
  Box,
  Center,
  Radio,
  Divider,
  FlatList,
  HStack,
  Input,
  Modal,
  ScrollView,
  VStack,
  useDisclose,
  Spinner,
  Stack,
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";

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
import PaymentService from "services/api/PaymentService";
import Photos from "assets/images/photos.png";
import PhotosWhite from "assets/images/photos_white.png";
import Profile from "assets/images/profilePhoto.jpg";
import SubscriptionsBundle from "services/api/SubscriptionBundle";
import VideoCall from "assets/images/vidoecall.png";
import VideoCallWhite from "assets/images/videocall_white.png";
import Videos from "assets/images/videos.png";
import VideosWhite from "assets/images/videos_white.png";
import VIPActive from "assets/images/VIPActive.png";
import WatchTicket from "assets/images/watchTicket.png";
import WatchTicketWhite from "assets/images/watchTicket_white.png";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GLOBAL_COLORS, GLOBAL_SCREEN_SIZE } from "global";
import { translationStore } from "../../zustand/translationStore";
import { userStore } from "../../zustand/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Tab = createMaterialTopTabNavigator();

// **** HEADER COMPONENT START CODE **** //
const Header = () => {
  const { alias } = userStore((state) => state);
  const { translations } = translationStore((store) => store);
  return (
    <HStack
      flexDirection={width < GLOBAL_SCREEN_SIZE.mobile ? "column" : "row"}
      alignItems="center"
      justifyContent="space-between"
      px={6}
      py={4}
    >
      <HStack
        space={2}
        alignItems="center"
        mb={width < GLOBAL_SCREEN_SIZE.mobile ? "2" : null}
      >
        <Image source={Profile} style={styles.profileImg} />
        <VStack>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {alias}
          </Text>
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
const VIPChoices = ({ active, setActive, bundle, setActiveBundleId }) => {
  // ** GLOBAL STORE
  const { translations } = translationStore((store) => store);

  const activeColorScheme = {
    gradient: ["#F8D2BF", "#FDF6F4", "#F4C8B0"],
    border: "#BB8D71",
    headerBg: "#E2C6B7",
    headerText: "#54382B",
    middleText: "#000000",
    middleBg: "#F8D0BD",
    bottomText: "#715A4D",
  };

  const inactiveColorScheme = {
    gradient: ["#202833", "#202833", "#202833"],
    border: "#3E404D",
    headerBg: "#454B5E",
    headerText: "#CAC0AA",
    middleText: "#CAC0AA",
    middleBg: "#36384B",
    bottomText: "#706E7A",
  };

  const handlePress = (index, bundleId) => {
    console.log("handlePress");
    console.log("index", index);
    console.log("bundleId", bundleId);
    setActive(index);
    setActiveBundleId(bundleId);
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
            borderRadius="10"
            borderColor={
              index === active
                ? activeColorScheme.border
                : inactiveColorScheme.border
            }
            height={172}
            mx={3}
            mt={5}
            width="32"
          >
            <LinearGradient
              colors={
                index === active
                  ? activeColorScheme.gradient
                  : inactiveColorScheme.gradient
              }
              style={{ borderRadius: 6 }}
            >
              <Pressable onPress={() => handlePress(index, item._id)}>
                <VStack
                  alignItems="center"
                  height="full"
                  justifyContent="space-between"
                >
                  <Text
                    style={[
                      styles.boxTitle,
                      {
                        color:
                          index === active
                            ? activeColorScheme.headerText
                            : inactiveColorScheme.headerText,
                        backgroundColor:
                          index === active
                            ? activeColorScheme.headerBg
                            : inactiveColorScheme.headerBg,
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <VStack position="relative" alignItems="center">
                    <Text
                      style={[
                        styles.boxPriceTag,
                        {
                          color:
                            index === active
                              ? activeColorScheme.middleText
                              : inactiveColorScheme.middleText,
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
                              ? activeColorScheme.middleText
                              : inactiveColorScheme.middleText,

                          backgroundColor:
                            index === active
                              ? activeColorScheme.middleBg
                              : inactiveColorScheme.middleBg,
                        },
                      ]}
                    >
                      {translations.permanentUse}
                    </Text>
                  </VStack>
                  <VStack alignItems="center">
                    <Text
                      style={[
                        styles.boxBottomTextTitle,
                        {
                          color:
                            index === active
                              ? activeColorScheme.bottomText
                              : inactiveColorScheme.bottomText,
                        },
                      ]}
                    >
                      {translations.goldCoinsFree}
                    </Text>
                    <Text
                      style={[
                        styles.boxBottomTextSubtitle,
                        {
                          color:
                            index === active
                              ? activeColorScheme.bottomText
                              : inactiveColorScheme.bottomText,
                        },
                      ]}
                      numberOfLines={2}
                    >
                      {translations.shortVisit}
                    </Text>
                  </VStack>
                </VStack>
              </Pressable>
            </LinearGradient>
          </Box>
        )}
      />
    </View>
  );
};
// **** VIP CHOICES COMPONENT END CODE **** //

const BindInvitationCode = () => {
  // ** GLOBAL STORE
  const { translations } = translationStore((store) => store);
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate("Settings", { postTitle: translations.setup });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.bindInvitationCodeContainer}>
        <Text style={styles.bindLeftText} numberOfLines={2}>
          {translations.bindInvitationCodeOrMobile}{" "}
          <Text style={{ color: GLOBAL_COLORS.secondaryColor }}>VIP</Text> 1{" "}
          {translations.day}
        </Text>
        <HStack width="16" alignItems="center">
          <Text style={styles.bindRightText}>{translations.toBind}</Text>
          <Entypo
            name="chevron-small-right"
            color={GLOBAL_COLORS.secondaryColor}
            size={25}
          />
        </HStack>
      </View>
    </Pressable>
  );
};

// **** PROMOTIONAL PACKAGE COMPONENT START CODE **** //
const PromotionalPackage = ({ perks }) => {
  // ** GLOBAL STORE
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
      <HStack alignItems="center">
        <Image source={VIPActive} style={styles.vipImg} />
        <Text style={styles.imagesTitle}>
          {translations.memberEnjoyBenefits}
        </Text>
      </HStack>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {lists.map((item, index) => (
          <Box key={index} width="25%" alignItems="center" my={4}>
            <Box alignItems="center">
              <View
                style={{
                  backgroundColor: "#3A3942",
                  borderRadius: 25,
                  height: 50,
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={
                    item.isActive ? item.active_image : item.inactive_image
                  }
                  style={styles.images}
                />
              </View>
              <Text style={styles.imagesText}>{item.title}</Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
// **** PROMOTIONAL PACKAGE COMPONENT END CODE **** //

// **** BUTTON COMPONENT START CODE **** //
const Button = ({ onOpen }) => {
  const { is_Vip } = userStore((state) => state);
  const { translations } = translationStore((store) => store);

  const handlePress = (event) => {
    onOpen(event);
  };

  return (
    <Box alignItems="center">
      <Pressable
        style={styles.bottomBtn}
        onPress={handlePress}
        disabled={is_Vip}
      >
        <Text style={styles.bottomBtnText}>{translations.getOffer}</Text>
      </Pressable>
    </Box>
  );
};
// **** BUTTON COMPONENT END CODE **** //

// **** MEMBER COMPONENT START CODE **** //
const Member = ({ route }) => {
  // ** GLOBAL STORE
  const { api_token } = userStore((store) => store);
  // ** STATE
  const [active, setActive] = useState(0);
  const [bundle, setBundle] = useState([]);
  // ** API
  const { getAllSubscriptionBundle } = SubscriptionsBundle();

  const { isLoading, isRefetching } = useQuery({
    queryKey: ["vipBundles"],
    queryFn: () =>
      getAllSubscriptionBundle({ data: { active: true }, token: api_token }),
    onSuccess: (data) => {
      const sortedData = data.data.sort(
        (firstItem, secondItem) => secondItem.price - firstItem.price
      );
      setBundle(sortedData);
      route.params.setActiveBundleId(sortedData[0]._id);
      route.params.setApiType("subscriptions");
    },
    onError: (error) => {
      console.log("Subscription Bundle: ", error);
    },
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
      <ScrollView>
        <VIPChoices
          active={active}
          setActive={setActive}
          bundle={bundle}
          setActiveBundleId={route.params.setActiveBundleId}
        />
        <BindInvitationCode />
        <PromotionalPackage perks={bundle[active]?.perks} />
        <Button onOpen={route.params.onOpen} />
      </ScrollView>
    </Container>
  );
};
// **** MEMBER COMPONENT END CODE **** //

// **** WALLET COMPONENT START CODE **** //
const Wallet = ({ route }) => {
  // ** GLOBAL STORE
  const { api_token, coins } = userStore((store) => store);
  const userStoreData = userStore((store) => store);
  const setUserStore = userStore((state) => state.setUserData);
  const { translations } = translationStore((store) => store);

  // ** STATES
  const [bundleID, setBundleID] = useState("");
  const [isRefetchProfile, setisRefetchProfile] = useState(false);
  const [active, setActive] = useState(0);

  // ** HOOKS
  const queryClient = useQueryClient();

  // ** API
  const { getAllCoinBundle } = CoinsBundle();
  const { isLoading, isRefetching, data } = useQuery({
    queryKey: ["coinsBundle"],
    queryFn: () =>
      getAllCoinBundle({ data: { with: "sites" }, token: api_token }),
  });

  const { getCustomerProfile } = CustomerService();
  const {} = useQuery({
    queryKey: ["customerProfileWallet"],
    queryFn: () => getCustomerProfile(api_token),
    onSuccess: (data) => {
      console.log("onSuccess customerProfile (WALLET)", data);

      // Update userStore data here
      setUserStore({
        ...userStoreData,
        coins: data.coins,
        is_Vip: data.is_Vip,
      });

      setisRefetchProfile(false);
    },
    onError: (error) => {
      console.log("onError customerProfile (WALLET)", error);
    },
    enabled: isRefetchProfile,
  });

  // ** EVENTS
  const onRefresh = useCallback(() => {
    // queryClient.invalidateQueries({
    //   queryKey: ["customerProfile"],
    // });
    setisRefetchProfile(true);
  }, []);

  const handlePayment = (event) => {
    route.params.onOpen(event);
  };

  // ** Choose the bundle
  const handlePress = (index, item) => {
    setBundleID(item._id);
    setActive(index);
    route.params.setActiveBundleId(item._id);
    route.params.setApiType("coins");
  };

  // ** Active Colours
  const activeColorScheme = {
    gradient: ["#F8D2BF", "#FDF6F4", "#F4C8B0"],
    border: "#BB8D71",
    headerText: "#54382B",
    middleText: "#000000",
    bottomText: "#FCF1ED",
    bottomBg: "#C79765",
  };
  // ** Inactive Colours
  const inactiveColorScheme = {
    gradient: ["#202833", "#202833", "#202833"],
    border: "#3E404D",
    headerText: "#CAC0AA",
    middleText: "#CAC0AA",
    bottomText: "#CAC0AA",
    bottomBg: "#36384B",
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
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[GLOBAL_COLORS.secondaryColor]}
            refreshing={isRefetching}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.headerContainer}>
          <VStack
            style={styles.leftHeader}
            alignItems="center"
            justifyContent="center"
            width="1/2"
          >
            <Text style={styles.largeText}>{coins}元</Text>
            <Text style={styles.smallText}>{translations.currentBalance}</Text>
          </VStack>
          <VStack
            style={styles.rightHeader}
            alignItems="center"
            justifyContent="center"
            width="1/2"
          >
            <Text style={styles.largeText}>0元</Text>
            <Text style={styles.smallText}>
              {translations.withdrawnProceeds}
            </Text>
          </VStack>
        </View>
        <BindInvitationCode />
        <Stack flexDirection="row" flexWrap="wrap" px={3} pt={3}>
          {data?.data.map((item, index) => (
            <Box
              key={index}
              borderWidth={3}
              borderRadius="10"
              borderColor={
                index === active
                  ? activeColorScheme.border
                  : inactiveColorScheme.border
              }
              height={172}
              mt={5}
              style={{
                width:
                  width < GLOBAL_SCREEN_SIZE.mobileMedium
                    ? width * 0.4
                    : width * 0.27,
                marginHorizontal:
                  width < GLOBAL_SCREEN_SIZE.mobileMedium
                    ? (width * 0.4) / 14
                    : (width * 0.27) / 12,
              }}
            >
              <LinearGradient
                colors={
                  index === active
                    ? activeColorScheme.gradient
                    : inactiveColorScheme.gradient
                }
                style={{ borderRadius: 6 }}
              >
                <Pressable onPress={() => handlePress(index, item)}>
                  <VStack
                    alignItems="center"
                    height="full"
                    justifyContent="center"
                  >
                    <Text
                      style={[
                        styles.boxTitle,
                        {
                          color:
                            index === active
                              ? activeColorScheme.headerText
                              : inactiveColorScheme.headerText,
                        },
                      ]}
                    >
                      {item.description}
                    </Text>
                    <VStack position="relative" alignItems="center">
                      <Text
                        style={[
                          styles.boxPriceTag,
                          {
                            color:
                              index === active
                                ? activeColorScheme.middleText
                                : inactiveColorScheme.middleText,
                          },
                        ]}
                      >
                        {item.amount}元
                      </Text>
                    </VStack>
                    <VStack alignItems="center">
                      <Text
                        style={[
                          styles.boxBottomTextTitle,
                          {
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            borderRadius: 15,
                            color:
                              index === active
                                ? activeColorScheme.bottomText
                                : inactiveColorScheme.bottomText,
                            backgroundColor:
                              index === active
                                ? activeColorScheme.bottomBg
                                : inactiveColorScheme.bottomBg,
                          },
                        ]}
                      >
                        {item.name}
                      </Text>
                    </VStack>
                  </VStack>
                </Pressable>
              </LinearGradient>
            </Box>
          ))}
        </Stack>
        <Box alignItems="center">
          <Pressable style={styles.bottomBtn} onPress={handlePayment}>
            <Text style={styles.bottomBtnText}>{translations.getOffer}</Text>
          </Pressable>
        </Box>
      </ScrollView>
    </Container>
  );
};
// **** WALLET COMPONENT END CODE **** //

// **** BIND ACCOUNT COMPONENT START CODE **** //
const BindAccount = ({ open, setOpen }) => {
  // ** GLOBAL STORE
  const { translations } = translationStore((store) => store);
  const handleSkip = () => {
    setOpen(false);
  };
  return (
    <Modal
      mt="auto"
      mb="auto"
      minH={400}
      closeOnOverlayClick
      isOpen={open}
      onClose={() => setOpen(false)}
      safeAreaTop={true}
      backdropVisible
      backgroundColor="#00000090"
    >
      <VStack
        width="full"
        alignItems="center"
        backgroundColor="#202833"
        pt={3}
        px={1}
      >
        <Text style={styles.modalTitle}>{translations.bindAccount}</Text>
        <Divider color="#202833" />
        <VStack my={3} mx={2} alignItems="center" py={3} width="full">
          <VStack
            mx={2}
            alignItems="center"
            p={3}
            space={4}
            backgroundColor="#BFBFBF"
            borderRadius={5}
          >
            <Text style={styles.inputTitle}>{translations.bindAccount}</Text>
            <Input
              placeholder={translations.agentAccount}
              variant="outline"
              backgroundColor="#FFFFFF"
              placeholderTextColor="#000000"
            />
            <Input
              placeholder={translations.pleaseEnterPhoneNumber}
              variant="outline"
              backgroundColor="#FFFFFF"
              placeholderTextColor="#000000"
            />
          </VStack>
          <Box alignItems="center" w="3/4" mt={4}>
            <Text style={styles.modalTitle}>
              {translations.bindMobilePhoneMessage}
            </Text>
          </Box>
        </VStack>
        <HStack>
          <Box width="1/2">
            <Pressable onPress={handleSkip}>
              <Text style={styles.buttonTextSkip}>
                {translations.skipForNow}
                <Feather name="chevrons-right" size={20} />
              </Text>
            </Pressable>
          </Box>
          <Box width="1/2">
            <Pressable onPress={handleSkip}>
              <Text style={styles.buttonText}>{translations.continue}</Text>
            </Pressable>
          </Box>
        </HStack>
      </VStack>
    </Modal>
  );
};
// **** BIND ACCOUNT COMPONENT END CODE **** //

// **** PAYMENT MODAL COMPONENT START CODE **** //
const PaymentModal = ({ isOpen, onClose, activeBundleId, apiType }) => {
  // ** GLOBAL STORE
  const { translations } = translationStore((store) => store);
  const { setVip, api_token } = userStore((state) => state);
  // ** STATE
  const [bankCode, setBankCode] = useState("1");
  // ** API
  const { subscribeToVIP } = CustomerService(); // change if the "Buy Subscription Bundle API" is working

  const { getPaymentMethods, postBuyBundle } = PaymentService(api_token);
  const { data: paymentMethodsData, isLoading } = useQuery({
    queryKey: ["paymentMethod"],
    queryFn: () => getPaymentMethods(),
    onSuccess: (data) => {
      console.log("onSuccess paymentMethod", data);
    },
    onError: (error) => {
      console.log("onError paymentMethod: ", error);
    },
  });

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

  const {
    mutate: mutateBuyBundle,
    isLoading: isLoadingBuyBundle,
    isSuccess: isSuccessBuyBundle,
    reset: resetBuyBundle,
  } = useMutation(postBuyBundle, {
    onSuccess: (data) => {
      console.log("mutateBuyBundle onSuccess", data);

      // Open payment link on browser
      const url = data.redirect_url;
      Linking.openURL(url);
    },
    onError: (error) => {
      console.log("mutateBuyBundle onError", error);
    },
  });

  const handlePay = (event) => {
    // mutateSubscribe({
    //   data: { amount: 200.0, title: "Diamond Privillege Card" }, // change if the "Buy Subscription Bundle API" is working
    //   token: api_token,
    // });
    // onClose(event);

    console.log("processing payment ...", activeBundleId);

    // FIXED data for testing. MUST update on production
    mutateBuyBundle({
      data: {
        callbackURL: "http://13.228.143.9:8000/test",
        bankcode: "testzfbsc",
      },
      token: api_token,
      bundleId: activeBundleId,
      apiType: apiType,
    });
  };

  const handlePayReset = (event) => {
    console.log("resetting buy bundle ...");
    resetBuyBundle();
  };

  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content
          borderTopRadius="0"
          backgroundColor="#202833"
          borderWidth={1}
        >
          <Radio.Group
            name="myRadioGroup"
            value={bankCode}
            onChange={(nextValue) => {
              console.log("bank code:", nextValue);
              setBankCode(nextValue);
            }}
            width="100%"
          >
            <VStack width="full" alignItems="center">
              <Text style={styles.modalHeader}>
                {translations.pleaseChoosePaymentMethod}
              </Text>
              <Divider color="#EF44BF" />

              {isSuccessBuyBundle && (
                <VStack p={5} space={2}>
                  <Text style={styles.processingText}>
                    Waiting for previous transaction ...
                  </Text>
                  <Pressable onPress={handlePayReset}>
                    <Text style={styles.paymentBtn}>Pay Again</Text>
                  </Pressable>
                </VStack>
              )}

              {(isLoading || isLoadingBuyBundle) && (
                <HStack p={5}>
                  <Spinner size="lg" />
                </HStack>
              )}

              {!isLoading && !isLoadingBuyBundle && !isSuccessBuyBundle && (
                <>
                  <VStack p={5} width="100%">
                    {/***** START: Payment methods *****/}
                    {/* @ts-ignore */}
                    {paymentMethodsData &&
                      paymentMethodsData.map((item, index) => {
                        return (
                          <HStack
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Image
                              source={{
                                uri: BASE_URL_FILE_SERVER + item.logo_path,
                              }}
                              style={styles.paymentImg}
                            />
                            <Radio
                              colorScheme="green"
                              value={item.bank_code}
                              size="md"
                            />
                          </HStack>
                        );
                      })}
                    {/***** END: Payment methods *****/}
                  </VStack>
                  <VStack alignItems="flex-start">
                    <Text style={styles.warningText}>
                      {translations.paymentReminders}
                    </Text>
                    <VStack my={3}>
                      <Text style={styles.descriptionText}>
                        1. {translations.paymentRemindersNo1}
                      </Text>
                      <Text style={styles.descriptionText}>
                        2. {translations.paymentRemindersNo2}
                      </Text>
                      <Text style={styles.descriptionText}>
                        3. {translations.paymentRemindersNo3}
                      </Text>
                    </VStack>
                  </VStack>
                  <VStack w="full">
                    <Pressable onPress={handlePay}>
                      <Text style={styles.paymentBtn}>
                        {translations.payNowAndEnjoy}
                      </Text>
                    </Pressable>
                  </VStack>
                </>
              )}
            </VStack>
          </Radio.Group>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};
// **** PAYMENT MODAL COMPONENT END CODE **** //

// **** MENU TAB COMPONENT START CODE **** //
const VIPMenu = ({ onOpen, setActiveBundleId, setApiType }) => {
  // ** GLOBAL STORE
  const { translations } = translationStore((store) => store);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: GLOBAL_COLORS.primaryColor },
        tabBarActiveTintColor: GLOBAL_COLORS.secondaryColor,
        tabBarInactiveTintColor: "#C6C1C1",
        tabBarIndicatorStyle: { backgroundColor: GLOBAL_COLORS.secondaryColor },
        tabBarLabelStyle: { fontSize: 20, fontWeight: "bold" },
      }}
    >
      <Tab.Screen
        name={translations.vipMember}
        component={Member}
        initialParams={{ onOpen, setActiveBundleId, setApiType }}
      />
      <Tab.Screen
        name={translations.wallet}
        component={Wallet}
        initialParams={{ onOpen, setActiveBundleId, setApiType }}
      />
    </Tab.Navigator>
  );
};
// **** MENU TAB COMPONENT END CODE **** //

const VIP = () => {
  // ** GLOBAL STORE
  const { recline } = userStore();
  // ** state
  const [open, setOpen] = useState(true);
  const [activeBundleId, setActiveBundleId] = useState("");
  const [apiType, setApiType] = useState(""); // have a two type the "subscriptions" and "coins"

  const {
    isOpen: paymentIsOpen,
    onOpen: paymentOnOpen,
    onClose: paymentOnClose,
  } = useDisclose();

  useEffect(() => {
    if (!!recline) {
      // Split by `|` and filter empty arrays
      const reclineArray = recline.split("|").filter((element) => element);
      console.log(reclineArray);
      if (reclineArray.length >= 2) {
        setOpen(false);
      }
    }
  }, []);

  return (
    <Container>
      <Header />
      <VIPMenu
        onOpen={paymentOnOpen}
        setActiveBundleId={setActiveBundleId}
        setApiType={setApiType}
      />
      <PaymentModal
        isOpen={paymentIsOpen}
        onClose={paymentOnClose}
        activeBundleId={activeBundleId}
        apiType={apiType}
      />
      {/* <BindAccount open={open} setOpen={setOpen} /> */}
    </Container>
  );
};

export default VIP;

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
    width:
      width > 400
        ? width * 0.5
        : width < GLOBAL_SCREEN_SIZE.mobile
        ? width * 0.6
        : width * 0.3,
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
    fontWeight: "bold",
  },
  // **** MEMBER **** //
  // VIPChoices
  boxTitle: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: 3,
    textAlign: "center",
    width: 80,
  },
  boxPriceTag: {
    fontSize: 30,
    fontWeight: "bold",
  },
  boxPriceTagText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 11,
  },
  boxBottomTextTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  boxBottomTextSubtitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  // Bind Invatation Code
  bindInvitationCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    backgroundColor: "#202833",
    marginTop: 15,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  bindLeftText: {
    width:
      width > 400
        ? width * 0.5
        : width < GLOBAL_SCREEN_SIZE.mobile
        ? width * 0.6
        : width * 0.65,
    color: GLOBAL_COLORS.primaryTextColor,
  },
  bindRightText: {
    color: GLOBAL_COLORS.secondaryColor,
  },
  // PromotionalPackage
  imagesContainer: {
    marginHorizontal: 15,
    marginVertical: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6D8D8",
  },
  vipImg: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  imagesTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 5,
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
    fontSize: width < GLOBAL_SCREEN_SIZE.mobile ? 11 : 12,
    marginTop: 5,
    textAlign: "center",
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
    backgroundColor: "#C79765",
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 30,
    marginVertical: 15,
  },
  bottomBtnText: {
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
  },
  // **** WALLET **** //
  headerContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    padding: 20,
    borderRadius: 10,
  },
  leftHeader: {
    borderRightWidth: 1,
    borderRightColor: "#FFFFFF",
  },
  rightHeader: { borderLeftWidth: 1, borderLeftColor: "#FFFFFF" },
  smallText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontWeight: "bold",
    textAlign: "center",
  },
  largeText: {
    color: "#F8D0BD",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  boxContent: {
    borderWidth: 2,
    borderColor: "#D9D9D9",
    borderRadius: 5,
    width: "100%",
  },
  leftBox: {
    borderRightWidth: 2,
    borderRightColor: "#D9D9D9",
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
    borderBottomColor: "#D9D9D9",
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
    marginVertical: 4,
  },
  processingText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 18,
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
  // **** ACCOUNT BIND MODAL **** //
  modalTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: GLOBAL_COLORS.primaryTextColor,
    paddingBottom: 10,
  },
  modalBg: {
    width: "100%",
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalFlag: {
    height: 30,
    width: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: GLOBAL_COLORS.primaryTextColor,
    backgroundColor: "#c60000",
    padding: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 5,
  },
  buttonTextSkip: {
    color: GLOBAL_COLORS.primaryTextColor,
    padding: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 5,
  },
});
