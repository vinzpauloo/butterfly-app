import { useState } from "react";
import { Image, StyleSheet, Text } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Button, HStack, Modal, Pressable, VStack } from "native-base";
import { FlashList } from "@shopify/flash-list";

import Container from "components/Container";
import CustomModal from "components/CustomModal";
import SystemIcon from "assets/images/SystemIcon.png";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../zustand/translationStore";

const Announcement = ({ open, setOpen, index }) => {
  const { translations } = translationStore((store) => store);
  return (
    <CustomModal open={open} setOpen={setOpen}>
      <Modal.Content>
        <Modal.Body>
          {/* Icon & Title */}
          <VStack alignItems="center" space={5} style={{ marginBottom: 10 }}>
            <FontAwesome
              name="bell"
              size={30}
              color={GLOBAL_COLORS.secondaryColor}
            />
            <Text>
              {index} asdf asdf asf sadf sadf sadf sadf asdf fg sdfg sdfg ds
              dsfg dsfg dg dsfg lore
            </Text>
          </VStack>

          {/* Announcement details */}
          <VStack space={2} style={{ marginBottom: 20 }}>
            <Text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, autem maiores dolores nisi iure aspernatur tenetur,
              amet vel repudiandae repellat corporis, expedita minima
              perspiciatis veritatis repellendus necessitatibus quasi harum
              veniam? sdfg asf sadg dfh sdfgredfvgdsfgvsdfgregsdvfdsfv sdrv
              sdfgv sdre ergdsfg dr
            </Text>
          </VStack>

          {/* Button */}
          <HStack space={3} justifyContent="center">
            <Button
              size="sm"
              style={styles.button}
              onPress={() => setOpen(false)}
            >
              {translations.close}
            </Button>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </CustomModal>
  );
};

const Content = ({ data }) => {
  // ** state
  const [open, setOpen] = useState(false);

  const handlePress = () => {
    setOpen(true);
  };

  return (
    <>
      <Pressable onPress={handlePress}>
        <HStack style={styles.cardContainer} space={2}>
          <Image source={SystemIcon} style={styles.systemIcon} />
          <VStack space={2} flexShrink={1}>
            <Text style={styles.whiteText}>系统公告</Text>
            <Text style={styles.subtext}>
              您的视频“xxxxxxx”涉嫌违规，被强制下架，请及时查看
            </Text>
          </VStack>
        </HStack>
      </Pressable>
      <Announcement open={open} setOpen={setOpen} index={data} />
    </>
  );
};

export default function SystemAnnouncement() {
  return (
    <Container>
      <FlashList
        data={[1, 2, 3, 4, 5]}
        contentContainerStyle={{ paddingVertical: 15 }}
        renderItem={({ item, index }) => <Content key={index} data={index} />}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    alignItems: "center",
    padding: 16,
    borderRadius: 4,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  whiteText: {
    color: "white",
    fontWeight: "600",
  },
  subtext: {
    color: "#8F9399",
  },
  systemIcon: {
    height: 38,
    width: 38,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    borderRadius: 20,
    width: 80,
  },
});
