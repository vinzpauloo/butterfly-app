import { StyleSheet } from "react-native";
import React, { useState } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Button, HStack, Modal, Text, VStack } from "native-base";
import { useQuery } from "@tanstack/react-query";

import CustomModal from "components/CustomModal";
import SiteSettingsService from "services/api/SiteSettingsService";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../zustand/userStore";
import { translationStore } from "../../zustand/translationStore";

const Content = ({ setOpen }) => {
  const [isQueryEnable, setIsQueryEnable] = useState(true);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementDescription, setAnnouncementDescription] = useState("");
  const token = userStore((store) => store.api_token);
  const { translations, lang } = translationStore((store) => store);

  const { getAnnouncement } = SiteSettingsService();
  const { isLoading, isError, data, error, status } = useQuery({
    queryKey: ["announcement"],
    queryFn: () => getAnnouncement(token, lang === "en_us" ? "en" : "zh_cn"),
    onSuccess: (data) => {
      console.log("=== Announcement fetched from backend! ===", data);
      setAnnouncementTitle(data.title);
      setAnnouncementDescription(data.description);
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
            {translations.iKnow}
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
