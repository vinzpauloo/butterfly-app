import { Dimensions, Image, Pressable, StyleSheet, Text } from "react-native";
import React, { useState } from "react";

import { Box, VStack, useToast } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useMutation } from "@tanstack/react-query";

import ButterflyLogo from "assets/images/butterflyLogo.png";
import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../../../zustand/userStore";
import { storeDataObject } from "lib/asyncStorage";
import { useNavigation } from "@react-navigation/native";
import { translationStore } from "../../../../zustand/translationStore";

const { height, width } = Dimensions.get("window");

const index = () => {
  const toast = useToast();
  // **** GLOBAL STATE
  const token = userStore((store) => store.api_token);
  const setUserStore = userStore((state) => state.setUserData);
  const translations = translationStore((state) => state.translations);
  // **** API
  const { bindDevice } = CustomerService();
  const navigation = useNavigation();

  const { mutate, isLoading } = useMutation(bindDevice, {
    onSuccess: (data) => {
      const userData = {
        _id: data.desired_account._id,
        site_id: data.desired_account.site_id,
        api_token: data.desired_account.api_token,
        alias: data.desired_account.alias,
        is_Vip: data.desired_account.is_Vip,
        photo: data.desired_account.photo,
      };

      // set user global store
      setUserStore(userData);

      // store user to device storage
      storeDataObject("UserCacheData", userData);

      toast.show({
        description: translations.successfullyBinded,
        duration: 3000,
        backgroundColor: GLOBAL_COLORS.secondaryColor,
      });
      navigation.goBack();
    },
    onError: (error) => {
      console.log("Bind Device", error);
      toast.show({
        description: translations.alreadyBinded,
        duration: 3000,
        backgroundColor: GLOBAL_COLORS.secondaryColor,
      });
      navigation.goBack();
    },
  });

  const handleBarCodeScanned = ({ data }) => {
    if (!isLoading) {
      mutate({ data: { id: data }, token });
    }
  };

  return (
    <Container>
      {/* <VStack
        alignItems="center"
        height={height}
        width={width}
        backgroundColor={GLOBAL_COLORS.primaryColor}
      >
        <Text style={styles.title}>{translations.theButterflyProject}</Text>
        <Box alignItems="center" mt={20} style={styles.scannerContent}>
          <Image source={ButterflyLogo} style={styles.butterflyLogo} /> */}
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={{ height, width }}
      />
      {/* </Box> */}
      {/* // </VStack> */}
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  // SCANNER
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: GLOBAL_COLORS.primaryTextColor,
    marginTop: 20,
    marginBottom: 30,
  },
  scannerContent: {
    borderWidth: 1,
    borderColor: GLOBAL_COLORS.primaryTextColor,
    paddingVertical: 25,
    borderRadius: 20,
  },
  butterflyLogo: {
    position: "absolute",
    height: 94,
    width: 94,
    top: -80,
  },
});
