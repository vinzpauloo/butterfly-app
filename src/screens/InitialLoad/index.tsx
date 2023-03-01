import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import { Box, Center, Spinner, Text, VStack } from "native-base";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { adsGlobalStore } from "../../zustand/adsGlobalStore";
import { captureSuccess, captureError } from "services/sentry";

import { useQuery } from "@tanstack/react-query";

import { storeDataObject, getDataObject } from "lib/asyncStorage";
import SiteSettingsService from "services/api/SiteSettingsService";

const InitialLoad = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [isQueryEnable, setIsQueryEnable] = useState(false);

  // subscribe to ads global store
  const setAdsGlobalStore = adsGlobalStore((state) => state.setAdvertisement);

  useEffect(() => {
    // check local app cache if it has ads data
    getDataObject("AdvertisementCacheData").then((res: any) => {
      if (res.message === "Key not found or is empty") {
        setIsQueryEnable(true);
      } else {
        console.log("=== Local Cache is used! ===");
        setIsQueryEnable(false);

        // update global ads global store according to cached data
        setAdsGlobalStore(
          res.localCache_fullscreen_banner,
          res.localCache_popup_banner,
          res.localCache_carousel_banner,
          res.localCache_single_banner
        );

        captureSuccess(route.name, "getDataObject(AdvertisementCacheData)");
        navigation.dispatch(StackActions.replace("TermsOfService"));
      }
    });
  }, []);

  // if local app cache dont have ads, fetch all ads data from backend
  const { getAds } = SiteSettingsService();
  const { isLoading, isError, data, error, status } = useQuery({
    queryKey: ["ads"],
    queryFn: () => getAds(),
    onSuccess: (data) => {
      console.log("=== Data Fetched from backend! ===");
      // fetch ads from backend and put into ads global store
      setAdsGlobalStore(
        // all arrays
        data.advertisement.fullscreen_banner[0].banners,
        data.advertisement.popup_banner[0].banners,
        data.advertisement.carousel_banner[0].banners,
        data.advertisement.single_banner.banners
      );

      // store ads to local app cache
      storeDataObject("AdvertisementCacheData", {
        localCache_fullscreen_banner:
          data.advertisement.fullscreen_banner[0].banners,
        localCache_popup_banner: data.advertisement.popup_banner[0].banners,
        localCache_carousel_banner:
          data.advertisement.carousel_banner[0].banners,
        localCache_single_banner: data.advertisement.single_banner.banners,
      });

      captureSuccess(route.name, "storeDataObject(AdvertisementCacheData)");
      navigation.dispatch(StackActions.replace("TermsOfService"));
    },
    onError: (error) => {
      console.log("Error", error);
      captureError(error, route.name, "queryFn: () => getAds()");
    },
    enabled: isQueryEnable,
  });

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
