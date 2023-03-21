import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";

import { VStack, Modal, Text, Button } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

import { GLOBAL_COLORS } from "global";
import { translationStore } from "../zustand/translationStore";

type Props = {};

const DonateModalContent = ({ setOpen }) => {
  const translations = translationStore((state) => state.translations);
  const [donationAmount, setDonationAmount] = useState("");
  const [message, setMessage] = useState("");

  function donateToContentCreator() {
    setOpen(false);
    alert(
      `WIP + TBD \nDonation Amount: ${donationAmount}\nMessage: ${message}`
    );
  }

  return (
    <Modal.Content bgColor={GLOBAL_COLORS.headerBasicBg}>
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
              value={donationAmount}
              onChangeText={setDonationAmount}
            />
            <View style={styles.coinIconContainer}>
              <FontAwesome5 name="coins" size={12} color="goldenrod" />
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
          <Button
            disabled={donationAmount === "" ? true : false}
            size="sm"
            style={[
              styles.button,
              donationAmount === ""
                ? styles.disabledButton
                : styles.enabledButton,
            ]}
            onPress={donateToContentCreator}
          >
            {translations.rewarded}
          </Button>
        </VStack>
      </Modal.Body>
    </Modal.Content>
  );
};

export default DonateModalContent;

const styles = StyleSheet.create({
  enabledButton: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
  },
  disabledButton: {
    backgroundColor: GLOBAL_COLORS.inactiveTextColor,
  },
  button: {
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
    backgroundColor: "gold",
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 8,
    top: 12,
  },
});
