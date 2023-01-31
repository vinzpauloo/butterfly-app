import { StyleSheet } from "react-native";
import React from "react";

import Container from "components/Container";
import GridVideos from "features/sectionList/components/GridVideos";
import { followImages } from "data/gridImages";

type Props = {};

const Collection = (props: Props) => {
  return (
    <Container>
      <GridVideos videos={followImages} isFollowingScreen={true} />
    </Container>
  );
};

export default Collection;

const styles = StyleSheet.create({});
