import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { ScrollView } from "react-native-gesture-handler";

import Container from "components/Container";
import SingleSectionTabContent from "./tabs";

const SingleSectionScreen = ({}) => {
  return (
    <Container>
      <SingleSectionTabContent />
      <Text>Test</Text>
    </Container>
  );
};

export default SingleSectionScreen;

const styles = StyleSheet.create({});
