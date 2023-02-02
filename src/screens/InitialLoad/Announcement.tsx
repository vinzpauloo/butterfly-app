import { Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";

// import { ScrollView } from "react-native-gesture-handler";
import { globalStyle } from "globalStyles";
import { Button, HStack, Modal, Text, useDisclose, VStack } from "native-base";
import PopupAds from "features/ads/components/PopupAds";
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
    <PopupAds open={open} setOpen={setOpen}>
      <Content setOpen={setOpen} />
    </PopupAds>
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
