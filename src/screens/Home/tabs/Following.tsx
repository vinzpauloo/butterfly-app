import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import Container from "components/Container";
import GridVideos from "features/sectionList/components/GridVideos";
import { followImages } from "data/gridImages";

type Props = {};

const Following = (props: Props) => {
  return (
    <Container>
      <GridVideos videos={followImages} isFollowingScreen={true} />
    </Container>
  );
};

export default Following;

const styles = StyleSheet.create({});
