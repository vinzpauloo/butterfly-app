import { StyleSheet } from "react-native";
import React from "react";

import { ScrollView } from "react-native-gesture-handler";

import Container from "components/Container";
import GridVideos from "features/sectionList/components/GridVideos";
import { followImages } from "data/gridImages";

const Recommended = () => {
  return (
    <ScrollView>
      <Container>
        <GridVideos videos={followImages} />
      </Container>
    </ScrollView>
  );
};

export default Recommended;

const styles = StyleSheet.create({});
