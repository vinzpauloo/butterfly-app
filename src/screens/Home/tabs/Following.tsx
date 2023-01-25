import { StyleSheet, Text } from "react-native";
import React from "react";
import Container from "components/Container";
import GridVideos from "features/sectionList/components/GridVideos";
import { bannerImage } from "data/bannerImages";
import { followImages } from "data/gridImages";

type Props = {};

const Following = (props: Props) => {
  return (
    <Container>
      <GridVideos videos={followImages} padding={0} />
    </Container>
  );
};

export default Following;

const styles = StyleSheet.create({});
