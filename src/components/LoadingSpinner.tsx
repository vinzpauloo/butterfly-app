import React from "react";

import LottieView from "lottie-react-native";
import { VStack } from "native-base";

import Container from "./Container";
import JSONLoadingSpinner from "assets/loadingSpinnerDots.json";

const LoadingSpinner = () => {
  return (
    <Container>
      <VStack height="full" alignItems="center" justifyContent="center">
        <LottieView
          autoPlay
          // Find more Lottie files at https://lottiefiles.com/featured
          source={JSONLoadingSpinner}
        />
      </VStack>
    </Container>
  );
};

export default LoadingSpinner;
