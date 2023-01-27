import { ScrollView, StyleSheet } from "react-native";
import React from "react";

import Container from "components/Container";
import GridVideos from "features/sectionList/components/GridVideos";
import { followImages } from "data/gridImages";

const Videos = () => {
  return (
    <ScrollView>
      <Container>
        <GridVideos videos={followImages} isFollowingScreen={true} />
      </Container>
    </ScrollView>
  );
};

export default Videos;

const styles = StyleSheet.create({});
