import { StyleSheet } from "react-native";
import { useState } from "react";

import {
  Button,
  HStack,
  Modal,
  NativeBaseProvider,
  Text,
  VStack,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { globalStyle } from "globalStyles";

const PopupAds = () => {
  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <NativeBaseProvider>
      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350">
          <Modal.Body>
            {/* Icon & Title */}
            <VStack alignItems="center" space={5} style={{ marginBottom: 10 }}>
              <FontAwesome
                name="bell"
                size={30}
                color={globalStyle.secondaryColor}
              />
              <Text fontSize="lg">Announcement Title hehe</Text>
            </VStack>

            {/* Announcement details */}
            <VStack space={2} style={{ marginBottom: 20 }}>
              <Text>Lorem Ipsum is</Text>
              <Text>simply dummy text</Text>
              <Text>of the printing and</Text>
              <Text>typesetting industry.</Text>
              <Text>Lorem Ipsum has been</Text>
              <Text>the industry's standard dummy text.</Text>
            </VStack>

            {/* Button */}
            <HStack space={3} justifyContent="center">
              <Button
                size="sm"
                style={styles.button}
                onPress={() => closeModal()}
              >
                I know
              </Button>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
  );
};

export default PopupAds;

const styles = StyleSheet.create({
  button: {
    backgroundColor: globalStyle.secondaryColor,
    borderRadius: 20,
    width: 80,
  },
});
