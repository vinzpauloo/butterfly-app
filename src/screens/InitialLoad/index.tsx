import { Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import { Box, Center, Spinner, Text, VStack } from "native-base";
import { StackActions, useNavigation } from "@react-navigation/native";

import { adsGlobalStore } from "../../zustand/adsGlobalStore"

import { useQuery } from "@tanstack/react-query";
import { useSiteSettings } from "hooks/useSiteSettings";

import { storeDataObject, getDataObject } from "services/asyncStorage";

const InitialLoad = () => {
  const [counter, setCounter] = useState(3);
  const navigation = useNavigation<any>();

  const [isQueryEnable, setIsQueryEnable] = useState(false);

  // subscribe to ads global store
  const setAdsGlobalStore = adsGlobalStore((state) => state.setAdvertisement)
  
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
          res.fullscreen_banner,
          res.popup_banner,
          res.carousel_banner,
          res.single_banner,
          res.multiple_random_gif
        )
      }
    });
    
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    if (counter === 0) {
      navigation.dispatch(StackActions.replace("TermsOfService"));
    }

    return () => clearInterval(timer);
  }, [counter]);


  // if local app cache dont have ads, fetch all ads data from backend
  const { getAds } = useSiteSettings();
  const { isLoading, isError, data, error, status } = useQuery({
    queryKey: ["ads"],
    queryFn: () => getAds(),
    onSuccess: (data) => {
       console.log("=== Data Fetched from backend! ===")
      // fetch ads from backend and put into ads global store
      setAdsGlobalStore(
        // all arrays
        data[0].advertisement.fullscreen_banner[0].banners,
        data[0].advertisement.popup_banner[0].banners,
        data[0].advertisement.carousel_banner[0].banners,
        data[0].advertisement.single_banner.banners,
        data[0].advertisement.multiple_random_gif.gif
      )

      // store ads to local app cache
      storeDataObject("AdvertisementCacheData", {
        fullscreen_banner: data[0].advertisement.fullscreen_banner[0].banners,
        popup_banner: data[0].advertisement.popup_banner[0].banners,
        carousel_banner: data[0].advertisement.carousel_banner[0].banners,
        single_banner: data[0].advertisement.single_banner.banners,
        multiple_random_gif: data[0].advertisement.multiple_random_gif.gif
      });
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