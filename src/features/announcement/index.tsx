import { StyleSheet } from "react-native";
import React, { useState } from "react";

import { Button, HStack, Modal, Text, VStack } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { GLOBAL_COLORS } from "global";
import CustomModal from "components/CustomModal";

import { useQuery } from "@tanstack/react-query";
import { useSiteSettings } from "hooks/useSiteSettings";

const Content = ({ setOpen }) => {

  const [isQueryEnable, setIsQueryEnable] = useState(true);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementDescription, setAnnouncementDescription] = useState("");

  const { getAnnouncement } = useSiteSettings();
  const { isLoading, isError, data, error, status } = useQuery({
    queryKey: ["announcement"],
    queryFn: () => getAnnouncement(),
    onSuccess: (data) => {
      console.log("=== Announcement fetched from backend! ===");
      setAnnouncementTitle(data[0].introductions[1].title)
      setAnnouncementDescription(data[0].introductions[1].description)
    },
    onError: (error) => {
      console.log("Error", error);
    },
    enabled: isQueryEnable,
  });
  return (
    <Modal.Content>
      <Modal.Body>
        {/* Icon & Title */}
        <VStack alignItems="center" space={5} style={{ marginBottom: 10 }}>
          <FontAwesome
            name="bell"
            size={30}
            color={GLOBAL_COLORS.secondaryColor}
          />
          <Text fontSize="lg">{announcementTitle}</Text>
        </VStack>

        {/* Announcement details */}
        <VStack space={2} style={{ marginBottom: 20 }}>
          <Text>{announcementDescription}</Text>
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
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    borderRadius: 20,
    width: 80,
  },
});
