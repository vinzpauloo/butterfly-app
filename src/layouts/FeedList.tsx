import React from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import { useDisclose } from "native-base";

import { FlashList } from "@shopify/flash-list";

import FeedItem from "components/FeedItem";
import BottomComment from "components/BottomComment";
import Container from "components/Container";
const FeedList = ({data}) => {

  const { isOpen, onOpen, onClose } = useDisclose();

  return (
      <Container>
        <View style={styles.wrapper}>
          <FlashList
              estimatedItemSize={249}
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
        </View>
      </Container>
  );
};

export default FeedList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: Dimensions.get('window').width,
    minHeight: 1000,
  }
});
