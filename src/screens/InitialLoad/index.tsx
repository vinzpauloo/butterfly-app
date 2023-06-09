import { Platform, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import localizations from "i18n/localizations";
import { Box, Center, Spinner, Text, VStack } from "native-base";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import { useCountdown } from "usehooks-ts";

import CustomerService from "services/api/CustomerService";
import initializePusher from "services/pusher";
import SiteSettingsService from "services/api/SiteSettingsService";
import {
  storeDataObject,
  getDataObject,
  getDataString,
} from "lib/asyncStorage";
import { getDeviceId, getCurrentVersion } from "lib/appInfo";
import { captureSuccess, captureError } from "services/sentry";
import { adsGlobalStore } from "../../zustand/adsGlobalStore";
import { userStore } from "../../zustand/userStore";
import { translationStore } from "../../zustand/translationStore";
import { GLOBAL_COLORS } from "global";

const InitialLoad = () => {
  // ** Hooks
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // ** States
  const [isQueryEnable, setIsQueryEnable] = useState(false);
  const [isLatestVersion, setIsLatestVersion] = useState(true);
  const [locale, setLocale] = useState("");

  // ** Stores
  const setAdsGlobalStore = adsGlobalStore((state) => state.setAdvertisement);
  const setUserStore = userStore((state) => state.setUserData);
  const { translations, lang } = translationStore((state) => state);
  const [setLang, setTranslations] = translationStore((state) => [
    state.setLang,
    state.setTranslations,
  ]);

  // **  Get QueryClient from the context
  const queryClient = useQueryClient();

  // ** pusher
  const { pusherInitialization } = initializePusher();

  const [count, { startCountdown }] = useCountdown({
    countStart: 3,
  });

  /*
  useEffect(() => {
    if (count === 0) {
      Linking.openURL(apkData.download_link);
    }
  }, [count]);
  */

  useEffect(() => {
    const datas = async () => {
      const data = await getDataString("locale");
      //@ts-ignore
      if (!!data.message) {
        setLocale("en_us");
      } else {
        //@ts-ignore
        setLocale(data);
        //@ts-ignore
        setLang(data);
        setTranslations(localizations[data]);
      }
    };
    datas();
  }, []);

  const generateCustomerData = async () => {
    const customerDevice = {
      device: {
        active: true,
        type: Platform.OS,
        device_id: await getDeviceId(),
      },
    };

    return customerDevice;
  };

  const processRegisterCustomer = () => {
    generateCustomerData().then((res) => {
      console.log("processRegisterCustomer()", res);
      mutateRegisterCustomer(res);
    });
  };

  const { getAds, getLatestVersion } = SiteSettingsService();

  const { data: apkData } = useQuery({
    queryKey: ["apkVersion"],
    queryFn: () => getLatestVersion(),
    onSuccess: (data) => {
      processUserCacheData();
      setIsQueryEnable(true);

      // Disable checking of version initially
      // const { version } = data;
      // if (version === getCurrentVersion()) {
      //   processUserCacheData();
      //   setIsQueryEnable(true);
      // } else {
      //   setIsLatestVersion(false);
      //   startCountdown();
      // }
    },
    onError: (error) => {
      console.log("getLatestVersion Error", error);
      captureError(error, route.name, "queryFn: () => getLatestVersion()");
    },
    enabled: isLatestVersion,
  });

  // if local app cache dont have ads, fetch all ads data from backend
  const {} = useQuery({
    queryKey: ["ads"],
    queryFn: () => getAds({ lang: locale === "en_us" ? "en" : "zh_cn" }),
    onSuccess: (data) => {
      if (data && data.length) {
        console.log("=== Ads Fetched from backend! ===");
        // fetch ads from backend and put into ads global store
        setAdsGlobalStore(
          // all arrays
          { photo_url: data[0].banners.photo_url, url: data[0].banners.url },
          { photo_url: data[1].banners.photo_url, url: data[1].banners.url },
          data[2].banners,
          { photo_url: data[3].banners.photo_url, url: data[3].banners.url }
        );

        // store ads to local app cache
        storeDataObject("AdvertisementCacheData", {
          localCache_fullscreen_banner: {
            photo_url: data[0].banners.photo_url,
            url: data[0].banners.url,
          },
          localCache_popup_banner: {
            photo_url: data[1].banners.photo_url,
            url: data[1].banners.url,
          },
          localCache_carousel_banner: data[2].banners,
          localCache_single_banner: {
            photo_url: data[3].banners.photo_url,
            url: data[3].banners.url,
          },
        });
      } else {
        console.log("=== No ads available. ===");
      }

      captureSuccess(route.name, "storeDataObject(AdvertisementCacheData)");
      navigation.dispatch(StackActions.replace("TermsOfService"));
    },
    onError: (error) => {
      console.log("getAds Error", error);
      captureError(error, route.name, "queryFn: () => getAds()");
    },
    enabled: isQueryEnable,
  });

  // if local app cache dont have user data, register user data from backend
  const { postLoginCustomer, postNewCustomer } = CustomerService();
  const { mutate: mutateRegisterCustomer } = useMutation(postNewCustomer, {
    onSuccess: (data) => {
      console.log("=== Customer Registered!! ===", data);

      const userData = {
        _id: data._id,
        site_id: data.site_id,
        api_token: data.api_token,
        alias: data.alias,
        coins: data.coins,
        is_Vip: data.is_Vip,
        vipPeriod: data.vip,
        photo: data.photo,
        mobile: data.mobile,
        referral_code: data.referral_code,
        recline: data?.recline || null,
      };

      // ** initialize pusher
      const callback = (data) => {
        queryClient.invalidateQueries({
          queryKey: ["getAllChats"],
        });
        queryClient.invalidateQueries({
          queryKey: ["SingleChatScreen"],
        });
      };

      pusherInitialization(data._id, callback);

      // set user global store
      setUserStore(userData);

      // store user to device storage
      storeDataObject("UserCacheData", userData);

      captureSuccess(route.name, "mutateRegisterCustomer");

      // Removed ads cache to get latest ads on every initial load
      // processAdsCacheData();
    },
    onError: (error) => {
      console.log("mutateRegisterCustomer Error", error);
      captureError(error, route.name, "mutateRegisterCustomer");
    },
  });

  const { mutate: mutateLoginCustomer } = useMutation(postLoginCustomer, {
    onSuccess: (data) => {
      console.log("=== Customer Logged in!! ===", data);

      const userData = {
        _id: data._id,
        site_id: data.site_id,
        api_token: data.api_token,
        alias: data.alias,
        coins: data.coins,
        is_Vip: data.is_Vip,
        vipPeriod: data.vip,
        photo: data.photo,
        mobile: data.mobile,
        referral_code: data.referral_code,
        recline: data?.recline || null,
      };

      // ** initialize pusher
      const callback = (data) => {
        queryClient.invalidateQueries({
          queryKey: ["getAllChats"],
        });
        queryClient.invalidateQueries({
          queryKey: ["SingleChatScreen"],
        });
      };

      pusherInitialization(data._id, callback);

      // set user global store
      setUserStore(userData);

      // store user to device storage
      storeDataObject("UserCacheData", userData);

      captureSuccess(route.name, "mutateLoginCustomer");

      // Removed ads cache to get latest ads on every initial load
      // processAdsCacheData();
    },
    onError: (error) => {
      console.log("mutateLoginCustomer Error", error);
      captureError(error, route.name, "mutateLoginCustomer");

      // If unauthorized, re-register deviceId
      processRegisterCustomer();
    },
  });

  const processUserCacheData = () => {
    // User cache logic
    getDataObject("UserCacheData").then((value) => {
      if (value.message === "Key not found or is empty") {
        console.log("=== Registering new customer device ===");

        // Register new customer device
        processRegisterCustomer();
      } else {
        console.log("=== Local UserCacheData is used! ===");

        // Validate if bearer token is still active
        generateCustomerData().then((res) => {
          const verifyUserData = {
            ...res,
            token: value.api_token,
          };

          mutateLoginCustomer(verifyUserData);
        });
      }
    });
  };

  const processAdsCacheData = () => {
    getDataObject("AdvertisementCacheData").then((value) => {
      // Ads cache logic
      if (value.message === "Key not found or is empty") {
        setIsQueryEnable(true);
      } else {
        console.log("=== Local AdsCacheData is used! ===", value);

        // update ads global store according to cached data
        setAdsGlobalStore(
          value.localCache_fullscreen_banner,
          value.localCache_popup_banner,
          value.localCache_carousel_banner,
          value.localCache_single_banner
        );

        captureSuccess(route.name, "getDataObject(AdvertisementCacheData)");
        navigation.dispatch(StackActions.replace("TermsOfService"));
      }
    });
  };

  return (
    <Center flex={1}>
      <Box
        bg="black.400:alpha.50"
        borderRadius={20}
        p={10}
        width={{
          base: 250,
          lg: 400,
        }}
      >
        {isLatestVersion ? (
          <VStack space={10} alignItems="center">
            <Spinner color="danger.400" size="lg" />
            <Text color="white" fontSize="md">
              {translations.loading} ...
            </Text>
          </VStack>
        ) : (
          <VStack space={3} alignItems="center">
            <Text color="white" fontSize="md">
              A new version is available.
            </Text>
            <Text color="white" fontSize="md">
              Current version: {getCurrentVersion()}
            </Text>
            {/* <Text color="white" fontSize="md">
              Latest version: {apkData.version}
            </Text> */}

            {/* <Pressable
              style={styles.downloadBtn}
              onPress={() => Linking.openURL(apkData.download_link)}
            >
              <Text style={styles.downloadTxt}>{translations.download}</Text>
            </Pressable> */}

            {count ? (
              <Text style={styles.downloadTxt}>Redirecting in {count}</Text>
            ) : null}
            <Spinner color="danger.400" size="lg" />

            <Pressable
              style={styles.downloadBtn}
              onPress={() => {
                processUserCacheData();
                setIsQueryEnable(true);
              }}
            >
              <Text style={styles.downloadTxt}>Proceed (TEST)</Text>
            </Pressable>
          </VStack>
        )}
      </Box>
    </Center>
  );
};

export default InitialLoad;

const styles = StyleSheet.create({
  downloadBtn: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 15,
    borderColor: "crimson",
  },
  downloadTxt: {
    color: "#fff",
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
});
