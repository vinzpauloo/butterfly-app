import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { NativeBaseProvider, useDisclose } from "native-base";

import Container from "components/Container";
import FeedItem from "components/FeedItem";
import BottomComment from "components/BottomComment";

const FeedList = ({ feedListData }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Container>
      <FlatList
        data={feedListData}
        renderItem={({ item }) => (
          <FeedItem
            userPictureURL={item.userPictureURL}
            userName={item.userName}
            tags={item.tags}
            description={item.description}
            location={item.location}
            addedContentType={item.addedContentType}
            addedContent={item.addedContent}
            totalComments={item.totalComments}
            totalLikes={item.totalLikes}
            openComments={onOpen}
          />
        )}
        keyExtractor={(item, index) => "" + index}
      />
      <BottomComment isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Container>
  );
};

export default FeedList;

const styles = StyleSheet.create({});
