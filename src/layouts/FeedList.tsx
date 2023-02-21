import React from "react";
import {Dimensions, StyleSheet, ScrollView} from "react-native";
import { useDisclose } from "native-base";

import { FlashList } from "@shopify/flash-list";

import FeedItem from "components/FeedItem";
import BottomComment from "components/BottomComment";
import Container from "../components/Container";
const FeedList = ({data}) => {

  const { isOpen, onOpen, onClose } = useDisclose();

  return (
      <Container>
        <ScrollView style={styles.wrapper}>
          <FlashList
              estimatedItemSize={150}
              data={data}
              renderItem={({ item, index }: any) => (
                  <FeedItem
                      key={index}
                      item={item}
                  />
              )}
              keyExtractor={(item, index) => "" + index}
          />
          <BottomComment isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </ScrollView>
      </Container>
  );
};

export default FeedList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: Dimensions.get('window').width
  }
});
