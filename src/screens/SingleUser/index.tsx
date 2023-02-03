import React from "react";
import { StyleSheet } from "react-native";

import Container from "components/Container";
import StickyTabs from "layouts/StickyTabs";
import { singleUserSubNav } from "data/singleUserSubNav";

const SingleUser = () => {
  return (
    <Container>
      <StickyTabs data={singleUserSubNav} />
    </Container>
  );
};

export default SingleUser;

const styles = StyleSheet.create({});
