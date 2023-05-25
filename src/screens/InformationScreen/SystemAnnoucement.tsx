import { Image, StyleSheet, Text } from "react-native";
import { HStack, VStack } from "native-base";

import Container from "components/Container";
import SystemIcon from "assets/images/SystemIcon.png";
import { GLOBAL_COLORS } from "global";
import { FlashList } from "@shopify/flash-list";

export default function SystemAnnouncement() {
  return (
    <Container>
      <FlashList
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item, index }) => (
          <HStack key={index} style={styles.cardContainer} space={2}>
            <Image source={SystemIcon} style={styles.systemIcon} />
            <VStack space={2} flexShrink={1}>
              <Text style={styles.whiteText}>系统公告</Text>
              <Text style={styles.subtext}>
                您的视频“xxxxxxx”涉嫌违规，被强制下架，请及时查看
              </Text>
            </VStack>
          </HStack>
        )}
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
});
