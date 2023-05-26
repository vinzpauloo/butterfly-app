import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";

import { VStack, useToast } from "native-base";
import { Camera } from "expo-camera";
import { storeDataObject } from "lib/asyncStorage";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../../../zustand/userStore";
import { translationStore } from "../../../../zustand/translationStore";

export default function index() {
  const { width } = useWindowDimensions();
  // ** styles
  const styles = StyleSheet.create({
    button: {
      position: "absolute",
      bottom: 56,
      left: width / 2,
      transform: [{ translateX: -40 }],
      backgroundColor: GLOBAL_COLORS.secondaryColor,
      height: 80,
      width: 80,
      borderRadius: 40,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: GLOBAL_COLORS.primaryTextColor,
    },
    text: {
      textTransform: "uppercase",
      fontWeight: "bold",
    },
  });

  const toast = useToast();
  // ** state
  const [scan, setScan] = useState(false);
  // ** GLOBAL STATE
  const token = userStore((store) => store.api_token);
  const setUserStore = userStore((state) => state.setUserData);
  const translations = translationStore((state) => state.translations);
  // ** API
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
    if (scan) {
      if (!!data) {
        mutate({ data: { id: data }, token });
        setScan(false);
      }
    }
    setScan(false);
  };

  return (
    <Container>
      <VStack flex={1} position="relative">
        <Camera
          onBarCodeScanned={scan ? handleBarCodeScanned : undefined}
          barCodeScannerSettings={{
            barCodeTypes: ["qr"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
        <TouchableOpacity style={styles.button} onPress={() => setScan(true)}>
          <Text style={styles.text}>{translations.scanCode}</Text>
        </TouchableOpacity>
      </VStack>
    </Container>
  );
}
