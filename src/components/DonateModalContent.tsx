import { Image, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";

import { VStack, Modal, Text, Button, Spinner } from "native-base";
import { useMutation } from "@tanstack/react-query";

import { GLOBAL_COLORS } from "global";
import DonateService from "services/api/DonateService";
import { translationStore } from "../zustand/translationStore";
import { userStore } from "../zustand/userStore";

import CoinIcon from "assets/images/coinIcon.png";

const DonateModalContent = ({ setOpen, userID = 1 }) => {
  // ** GLOBAL STORE
  const translations = translationStore((state) => state.translations);
  const { api_token } = userStore((state) => state);

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
  const onPressDonate = () => {
    const donateData = {
      data: {
        user_id: userID,
        amount: parseInt(amount),
        message,
      },
      token: api_token,
    };

    console.log("donating ...", donateData);
    mutate(donateData);
  };

  const handleResetDonate = () => {
    setAmount("");
    setMessage("");
    setTimeout(() => {
      reset();
    }, 3000);
  };

  return (
    <Modal.Content bgColor={GLOBAL_COLORS.videoContentBG}>
      <Modal.CloseButton />
      <Modal.Body>
        <VStack space={4} alignItems="center" pt={6}>
          <Text color="white">
            {translations.giveReward}, {translations.muchLove}
          </Text>
          <Text color="white">{translations.mwah}~</Text>
          <View style={{ width: "100%" }}>
            <TextInput
              style={styles.input}
              placeholder={translations.tipAmount}
              placeholderTextColor={GLOBAL_COLORS.inactiveTextColor}
              keyboardType="number-pad"
              value={amount}
              onChangeText={setAmount}
            />
            <View style={styles.coinIconContainer}>
              <Image source={CoinIcon} style={styles.icon} />
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder={translations.wantSay}
            placeholderTextColor={GLOBAL_COLORS.inactiveTextColor}
            numberOfLines={3}
            multiline
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />

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
              disabled={amount === "" ? true : false}
              size="sm"
              style={[styles.donateButton, {opacity: amount === "" ? 0.5 : 1 }]}
              onPress={onPressDonate}
            >
              {translations.rewarded}
            </Button>
          ) : (
            <Spinner color={GLOBAL_COLORS.secondaryColor} size="lg" />
          )}
        </VStack>
      </Modal.Body>
    </Modal.Content>
  );
};

export default DonateModalContent;

const styles = StyleSheet.create({
  donateButton: {
    backgroundColor: '#FF644A',
    borderRadius: 20,
    width: 120,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    justifyContent: "flex-start",
  },
  coinIconContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 8,
    top: 12,
  },
  icon: {
    marginHorizontal: 3,
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  errorMsg: {
    textTransform: "capitalize",
  },
});
