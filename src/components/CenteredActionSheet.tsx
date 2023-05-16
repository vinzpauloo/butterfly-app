import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";

import { Actionsheet, Box, Center } from "native-base";

const CenteredActionSheet = ({ isOpen, onClose, children }) => {
  const { width, height } = useWindowDimensions();
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
  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Box style={styles.container}>{children}</Box>
      </Actionsheet>
    </Center>
  );
};

export default CenteredActionSheet;
