import React from "react";
import { StyleSheet, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

import Container from "components/Container";
import { GLOBAL_COLORS } from "global";
import NoCacheMessage from "features/sectionList/components/NoCacheMessage";

type Props = {};

const InformationScreen = (props: Props) => {
  const route = useRoute<any>();
  return (
    <Container>
      <Text style={styles.whiteText}>
        InformationScreen for {route?.params.postTitle}
      </Text>
      <NoCacheMessage />
    </Container>
  );
};

export default InformationScreen;

const styles = StyleSheet.create({
  whiteText: {
    color: GLOBAL_COLORS.primaryTextColor,
    textAlign: "center",
    marginVertical: 24,
  },
});
