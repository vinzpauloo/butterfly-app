import {
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";

import Feather from "react-native-vector-icons/Feather";
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
} from "native-base";

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
import VideosWhite from "assets/images/videocall_white.png";
import WatchTicket from "assets/images/watchTicket.png";
import WatchTicketWhite from "assets/images/watchTicket_white.png";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../zustand/translationStore";
import { userStore } from "../../zustand/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import * as Linking from "expo-linking";

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
const VIPChoices = ({ active, setActive, bundle, setActiveBundleId }) => {
  // ** GLOBAL STORE
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
            <Pressable onPress={() => handlePress(index, item._id)}>
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
    onOpen(event);
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
      <VIPChoices
        active={active}
        setActive={setActive}
        bundle={bundle}
        setActiveBundleId={route.params.setActiveBundleId}
      />
      <PromotionalPackage perks={bundle[active]?.perks} />
      <Description description={bundle[active]?.description} />
      <Button onOpen={route.params.onOpen} />
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
  const handlePress = (item) => {
    setBundleID(item._id);
    route.params.setActiveBundleId(item._id);
    route.params.setApiType("coins");
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
          <Text style={styles.largeText}>{coins}元</Text>
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
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[GLOBAL_COLORS.secondaryColor]}
            refreshing={isRefetching}
            onRefresh={onRefresh}
          />
        }
      >
        <VStack alignItems="center" p={3}>
          {data?.data.map((item, index) => (
            <Pressable onPress={() => handlePress(item)}>
              <HStack
                key={index}
                alignItems="center"
                style={styles.boxContent}
                my={5}
                h="24"
                backgroundColor={bundleID === item._id ? "#0696cd" : null}
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
            </Pressable>
          ))}
        </VStack>
      </ScrollView>
      <VStack w="full">
        <Pressable onPress={handlePayment}>
          <Text style={styles.paymentBtn}>{translations.buyGoldPack}</Text>
        </Pressable>
      </VStack>
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
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#C6C1C1",
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
