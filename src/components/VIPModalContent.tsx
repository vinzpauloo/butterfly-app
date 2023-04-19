import { StyleSheet } from "react-native";
import React from "react";
import { GLOBAL_COLORS } from "global";
import { VStack, Modal, Text, Button } from "native-base";
import { translationStore } from "../zustand/translationStore";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const VIPModalContent = ({ setOpen }) => {
  const translations = translationStore((state) => state.translations);
  const navigation = useNavigation<any>();

  const handlePressVIP = () => {
    navigation.navigate("VIPScreen", { postTitle: "会员中心" });
    setOpen(false);
  };

  return (
    <Modal.Content bgColor={GLOBAL_COLORS.headerBasicBg}>
      <Modal.CloseButton />
      <Modal.Body>
        <VStack space={8} alignItems="center" margin={0} py={5}>
          <Text color="white">{translations.upgradeMembership}</Text>
          <Button size="sm" style={styles.button} onPress={handlePressVIP}>
            {translations.purchaseVIP}
          </Button>
        </VStack>
      </Modal.Body>
    </Modal.Content>
  );
};

export default VIPModalContent;

const styles = StyleSheet.create({
  button: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    borderRadius: 20,
    width: 120,
  },
});
