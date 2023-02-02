import { StyleSheet } from "react-native";
import React, { useState } from "react";

import { Button, HStack, Modal, Text, VStack } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { globalStyle } from "globalStyles";
import CustomModal from "components/CustomModal";

const Content = ({ setOpen }) => {
  return (
    <Modal.Content>
      <Modal.Body>
        {/* Icon & Title */}
        <VStack alignItems="center" space={5} style={{ marginBottom: 10 }}>
          <FontAwesome
            name="bell"
            size={30}
            color={globalStyle.secondaryColor}
          />
          <Text fontSize="lg">Announcement Title</Text>
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
            onPress={() => setOpen(false)}
          >
            I know
          </Button>
        </HStack>
      </Modal.Body>
    </Modal.Content>
  );
};

const Announcement = () => {
  const [open, setOpen] = useState(true);

  return (
    <CustomModal open={open} setOpen={setOpen}>
      <Content setOpen={setOpen} />
    </CustomModal>
  );
};

export default Announcement;

const styles = StyleSheet.create({
  button: {
    backgroundColor: globalStyle.secondaryColor,
    borderRadius: 20,
    width: 80,
  },
});
