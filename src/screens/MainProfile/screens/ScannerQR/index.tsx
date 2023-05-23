import { StyleSheet } from "react-native";
import React from "react";

import { useToast } from "native-base";
import { Camera } from "expo-camera";
import { storeDataObject } from "lib/asyncStorage";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../../../zustand/userStore";
import { translationStore } from "../../../../zustand/translationStore";

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
      <Camera
        onBarCodeScanned={handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ["qr"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({});
