import { Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import { Box, Center, Spinner, Text, VStack } from "native-base";
import { StackActions, useNavigation } from "@react-navigation/native";

import { useFullScreenBannerStore, usePopUpBannerStore } from "../../zustand/adsGlobalStore"

import { useQuery } from "@tanstack/react-query";
import { useSiteSettings } from "hooks/useSiteSettings";

import { storeDataObject, getDataObject } from "services/asyncStorage";

const InitialLoad = () => {
  const [counter, setCounter] = useState(3);
  const navigation = useNavigation<any>();

  const [isQueryEnable, setIsQueryEnable] = useState(true);

  // subscribe to ads global store
  const [bannerPhotoURL, bannerAdsURL, bannerStartDate, bannerEndDate] = useFullScreenBannerStore(
    (state) => [state.updatePhotoURL, state.updateAdsURL, state.updateStartDate, state.updateEndDate],
  )

  const [popUpPhotoURL, popUpAdsURL, popUpStartDate, popUpEndDate] = usePopUpBannerStore(
    (state) => [state.updatePhotoURL, state.updateAdsURL, state.updateStartDate, state.updateEndDate],
  )
  
  useEffect(() => {
    // see local storage first, if local storage has cache the banner image and ads URL use it
    // getDataObject("PreloadingData").then((res: any) => {
    //   if (res.message === "Key not found or is empty") {
    //     setIsQueryEnable(true);
    //   } else {
    //     console.log("local cache exists");
    //     setIsQueryEnable(false);

    //     // UPDATE GLOBAL STORE ACCORDING TO CACHED DATA
    //     updateBannerURL(res.banner);
    //     updateAdsURL(res.ads);
    //   }
    // });
    // const timer =
    //   counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    // if (counter === 0) {
    //   navigation.dispatch(StackActions.replace("TermsOfService"));
    // }

    // return () => clearInterval(timer);
  }, [counter]);


  // if app cache dont have the ads, fetch all ads from backend
  const { getAds } = useSiteSettings();
  const { isLoading, isError, data, error, status } = useQuery({
    queryKey: ["ads"],
    queryFn: () => getAds(),
    onSuccess: (data) => {
      // put into ads global store

      // single per site
      bannerPhotoURL(data[0].advertisement.fullscreen_banner[0].banners[0].photo_url)
      bannerAdsURL(data[0].advertisement.fullscreen_banner[0].banners[0].url)
      bannerStartDate(data[0].advertisement.fullscreen_banner[0].banners[0].start_date)
      bannerEndDate(data[0].advertisement.fullscreen_banner[0].banners[0].end_date)

      // single per site
      popUpPhotoURL(data[0].advertisement.popup_banner[0].banners[0].photo_url);
      popUpAdsURL(data[0].advertisement.popup_banner[0].banners[0].url);
      popUpStartDate(data[0].advertisement.popup_banner[0].banners[0].start_date);
      popUpEndDate(data[0].advertisement.popup_banner[0].banners[0].end_date);


      console.log('====================================');
      console.log('CAROUSEL BANNER');
      // array
      console.log(data[0].advertisement.carousel_banner[0].banners);
      console.log('====================================');


      console.log('SINGLE BANNER');
      // single per site
      console.log(data[0].advertisement.single_banner.banners[0]);

      console.log('====================================');
      console.log('MULTIPLE RANDOM GIF');
      // array
      console.log(data[0].advertisement.multiple_random_gif.gif);
      console.log('====================================');
      

      // FETCH ADS AND PUT TO GLOBAL STORE
      // updateBannerURL(
      //   data[0].advertisement.fullscreen_banner[0].banners[0].photo_url
      // );
      // updateAdsURL(data[0].advertisement.fullscreen_banner[0].banners[0].url);

      // // STORE TO APP CACHE
      // storeDataObject("PreloadingData", {
      //   banner: data[0].advertisement.fullscreen_banner[0].banners[0].photo_url,
      //   ads: data[0].advertisement.fullscreen_banner[0].banners[0].url,
      // });
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