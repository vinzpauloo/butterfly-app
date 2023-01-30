import React from "react";
import { StyleSheet, Text, FlatList, View, ScrollView } from "react-native";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";

import Container from "components/Container";

import { momentSubNav } from "data/momentSubNav";
import { officialCertificateList } from "data/officialCertificateList";


type Props = {};

type certificateListProps = {
  certificateName: string
}

const CertificateList = (props: certificateListProps) => {
  return (
    <View>
      <Text style={styles.whiteText}>{props.certificateName}</Text>
    </View>
  )
}

const Moment = (props: Props) => {
  return (
    <Container>      
      <MaterialTopTabs data={momentSubNav} />
    </Container>
  );
};

export default Moment;

const styles = StyleSheet.create({
  whiteText: {
    color:"white"
  }
});
