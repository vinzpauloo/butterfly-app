import { Dimensions, StyleSheet } from "react-native";
import React from "react";

import { Actionsheet, Box, Center } from "native-base";

const { width, height } = Dimensions.get("window");

const CenteredActionSheet = ({ isOpen, onClose, children }) => {
  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Box style={styles.container}>{children}</Box>
      </Actionsheet>
    </Center>
  );
};

export default CenteredActionSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height,
  },
});
