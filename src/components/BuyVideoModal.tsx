import { Image, StyleSheet } from "react-native";
import React from "react";

import { VStack, Modal, Text, Button, Spinner, HStack } from "native-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CoinIcon from "assets/images/coinIcon.png";
import CustomerService from "services/api/CustomerService";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../zustand/translationStore";
import { userStore } from "../zustand/userStore";

export default function BuyVideoModal({ id, coin, setOpen }) {
  // ** Get QueryClient from the context
  const queryClient = useQueryClient();
  // ** global store
  const userStoreData = userStore((store) => store);
  const translations = translationStore((state) => state.translations);
  const { api_token, coins, setUserData } = userStore((state) => state);
  // ** api
  const { postBuyVideos } = CustomerService();
  const { mutate, isLoading } = useMutation(postBuyVideos, {
    onSuccess: (data) => {
      // ** close the modal
      setOpen(false);
      // ** Update userStore data here
      setUserData({
        ...userStoreData,
        coins: data.customer_balance,
      });
      // ** refetch the single vidoe
      queryClient.invalidateQueries({
        queryKey: ["workSingleVideoScreen", id],
      });
    },
    onError: (error) => {
      console.log("Buy Videos: ", error);
    },
  });

  // ** events
  const onPressBuyVideo = () => {
    mutate({
      data: {
        id,
      },
      token: api_token,
    });
  };

  return (
    <Modal.Content bgColor={GLOBAL_COLORS.videoContentBG}>
      <Modal.CloseButton />
      <Modal.Body>
        <VStack alignItems="center" pt={7}>
          <VStack alignItems="center" mb={4}>
            <Text color={GLOBAL_COLORS.primaryTextColor} textAlign="center">
              {translations.supportTheOriginal}
            </Text>
          </VStack>
          <HStack alignItems="center" mb={4}>
            <Image source={CoinIcon} style={styles.icon} />
            <Text
              color={GLOBAL_COLORS.primaryTextColor}
              style={styles.coinText}
            >
              {coin}
            </Text>
          </HStack>
          <HStack alignItems="center" mb={2}>
            <Text color={GLOBAL_COLORS.inactiveTextColor}>
              {translations.currentBalance}:{" "}
            </Text>
            <Text color={GLOBAL_COLORS.inactiveTextColor}>{coins}</Text>
          </HStack>
          {isLoading ? (
            <Spinner size={20} color={GLOBAL_COLORS.secondaryColor} />
          ) : (
            <Button
              disabled={coins >= coin ? false : true}
              size="sm"
              style={[
                styles.donateButton,
                { opacity: coins >= coin ? 1 : 0.5 },
              ]}
              onPress={onPressBuyVideo}
            >
              {translations.buyNow}
            </Button>
          )}
        </VStack>
      </Modal.Body>
    </Modal.Content>
  );
}

const styles = StyleSheet.create({
  donateButton: {
    backgroundColor: "#FF644A",
    borderRadius: 20,
    width: 120,
  },
  coinText: {
    fontSize: 34,
    fontWeight: "bold",
    lineHeight: 36,
    paddingTop: 5,
  },
  icon: {
    marginHorizontal: 3,
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
});
