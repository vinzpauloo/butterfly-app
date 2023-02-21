import { StyleSheet } from "react-native";
import React from "react";
import { HStack, Spinner } from "native-base";

const Loading = () => {
  return (
    <HStack space={8} marginY={5} justifyContent="center" alignItems="center">
      <Spinner color="#e15655" size="lg" />
    </HStack>
  );
};

export default Loading;
