import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDisclose } from "native-base";
import { FlashList } from "@shopify/flash-list";

import Container from "components/Container";
import FeedItem from "components/FeedItem";
import BottomComment from "components/BottomComment";
import FeedItemSkeleton from "components/skeletons/FeedItemSkeleton";


const FeedList = ({ feedListData }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [feedIsLoaded, setFeedIsLoaded] = useState(false)
  
  useEffect(() => {
    setTimeout(() => setFeedIsLoaded(true), 1000);
  });

  return (
    <Container>
      {feedIsLoaded ?
        <View style={styles.wrapper}>
          <FlashList
            estimatedItemSize={479}
            data={feedListData}
            renderItem={({ item, index }: any) => (
              <FeedItem
                key={index}
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
        </View>
        :
        <FeedItemSkeleton />
      }
    </Container>
  );
};

export default FeedList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minHeight: 100
  }
});
