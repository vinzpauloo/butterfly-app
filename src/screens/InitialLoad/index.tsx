import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import { Box, Center, Spinner, Text, VStack } from "native-base";
import { StackActions, useNavigation } from "@react-navigation/native";

const InitialLoad = () => {
  const [counter, setCounter] = useState(3);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    if (counter === 0) {
      navigation.dispatch(StackActions.replace("TermsOfService"));
    }

    return () => clearInterval(timer);
  }, [counter]);

  return (
    <Center flex={1}>
      <Box
        bg="black.400:alpha.50"
        borderRadius={20}
        p={10}
        width={{
          base: 250,
          lg: 400,
        }}
      >
        <VStack space={10} alignItems="center">
          <Spinner color="danger.400" size="lg" />
          <Text color="white" fontSize="md">
            Loading ...
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};

export default InitialLoad;

const styles = StyleSheet.create({});
