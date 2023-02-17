import { Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import { Box, Center, Spinner, Text, VStack } from "native-base";
import { StackActions, useNavigation } from "@react-navigation/native";

import { adsGlobalStore } from "../../zustand/adsGlobalStore";

import { useQuery } from "@tanstack/react-query";
import { useSiteSettings } from "hooks/useSiteSettings";

import { storeDataObject, getDataObject } from "services/asyncStorage";

const InitialLoad = () => {
  const navigation = useNavigation<any>();

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
          res.localCache_single_banner,
        );

        navigation.dispatch(StackActions.replace("TermsOfService"));
      }
    });
  }, []);

  // if local app cache dont have ads, fetch all ads data from backend
  const { getAds } = useSiteSettings();
  const { isLoading, isError, data, error, status } = useQuery({
    queryKey: ["ads"],
    queryFn: () => getAds(),
    onSuccess: (data) => {
      console.log("=== Data Fetched from backend! ===");
      // fetch ads from backend and put into ads global store
      setAdsGlobalStore(
        // all arrays
        data[0].advertisement.fullscreen_banner[0].banners,
        data[0].advertisement.popup_banner[0].banners,
        data[0].advertisement.carousel_banner[0].banners,
        data[0].advertisement.single_banner.banners,
      );

      // store ads to local app cache
      storeDataObject("AdvertisementCacheData", {
        localCache_fullscreen_banner: data[0].advertisement.fullscreen_banner[0].banners,
        localCache_popup_banner: data[0].advertisement.popup_banner[0].banners,
        localCache_carousel_banner: data[0].advertisement.carousel_banner[0].banners,
        localCache_single_banner: data[0].advertisement.single_banner.banners,
      });

      navigation.dispatch(StackActions.replace("TermsOfService"));
    },
    onError: (error) => {
      console.log("Error", error);
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
