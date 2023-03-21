import { Platform, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import { Box, Center, Spinner, Text, VStack } from "native-base";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";

import { storeDataObject, getDataObject } from "lib/asyncStorage";
import { getDeviceId } from "lib/deviceInfo";
import SiteSettingsService from "services/api/SiteSettingsService";
import CustomerService from "services/api/CustomerService";
import { captureSuccess, captureError } from "services/sentry";
import { adsGlobalStore } from "../../zustand/adsGlobalStore";
import { userStore } from "../../zustand/userStore";

const InitialLoad = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [isQueryEnable, setIsQueryEnable] = useState(false);

  // subscribe to ads global store
  const setAdsGlobalStore = adsGlobalStore((state) => state.setAdvertisement);
  const setUserStore = userStore((state) => state.setUserData);

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

  // if local app cache dont have ads, fetch all ads data from backend
  const { getAds } = SiteSettingsService();
  const { isLoading: isAdsLoading } = useQuery({
    queryKey: ["ads"],
    queryFn: () => getAds(),
    onSuccess: (data) => {
      if (data.advertisement) {
        console.log("=== Ads Fetched from backend! ===");
        // fetch ads from backend and put into ads global store
        setAdsGlobalStore(
          // all arrays
          data[0].banners,
          data[1].banners,
          data[2].banners,
          data[3].banners
        );

        // store ads to local app cache
        storeDataObject("AdvertisementCacheData", {
          localCache_fullscreen_banner: data[0].banners,
          localCache_popup_banner: data[1].banners,
          localCache_carousel_banner: data[2].banners,
          localCache_single_banner: data[3].banners,
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
        is_Vip: data.is_Vip,
      };

      // set user global store
      setUserStore(userData);

      // store user to device storage
      storeDataObject("UserCacheData", userData);

      captureSuccess(route.name, "mutateRegisterCustomer");

      processAdsCacheData();
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
        is_Vip: data.is_Vip,
      };

      // set user global store
      setUserStore(userData);

      // store user to device storage
      storeDataObject("UserCacheData", userData);

      captureSuccess(route.name, "mutateLoginCustomer");

      processAdsCacheData();
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

  useEffect(() => {
    processUserCacheData();
  }, []);

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
        <VStack space={10} alignItems="center">
          <Spinner color="danger.400" size="lg" />
          <Text color="white" fontSize="md">
            Loading ...
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};

export default InitialLoad;

const styles = StyleSheet.create({});
