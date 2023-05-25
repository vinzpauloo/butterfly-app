import { Image, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";

import { VStack, Modal, Text, Button, Spinner, HStack } from "native-base";
import { useMutation } from "@tanstack/react-query";

import DonateService from "services/api/DonateService";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../zustand/translationStore";
import { userStore } from "../zustand/userStore";

import CoinIcon from "assets/images/coinIcon.png";

export default function BuyVideoModal({ userID = 1, coin }) {
  // ** GLOBAL STORE
  const translations = translationStore((state) => state.translations);
  const { api_token, coins } = userStore((state) => state);

  // ** STATES
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ** API
  const { postDonate } = DonateService();
  const { mutate, isLoading, isSuccess, isError, reset } = useMutation(
    postDonate,
    {
      onSuccess: (data) => {
        console.log("mutateDonate onSuccess", data);
        handleResetDonate();
      },
      onError: (error) => {
        console.log("mutateDonate onError", error);
        // @ts-ignore
        setErrorMsg(error.data.message);
      },
    }
  );

  // ** EVENTS
  const onPressBuyVideo = () => {
    // const donateData = {
    //   data: {
    //     user_id: userID,
    //     amount: parseInt(amount),
    //     message,
    //   },
    //   token: api_token,
    // };

    // console.log("donating ...", donateData);
    // mutate(donateData);
    console.log("buy");
  };

  const handleResetDonate = () => {
    setAmount("");
    setMessage("");
    setTimeout(() => {
      reset();
    }, 3000);
  };

  console.log("@@", 14 >= coin);

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

          {isSuccess && (
            <Text color={GLOBAL_COLORS.secondaryColor}>
              {translations.donateSuccess}
            </Text>
          )}

          {isError && (
            <Text color={GLOBAL_COLORS.errorColor} style={styles.errorMsg}>
              {errorMsg}
            </Text>
          )}

          {!isLoading ? (
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
          ) : (
            <Spinner color={GLOBAL_COLORS.secondaryColor} size="lg" />
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
  errorMsg: {
    textTransform: "capitalize",
  },
});
