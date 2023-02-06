import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDisclose, VStack, Avatar, HStack, Skeleton } from "native-base";
import { FlashList } from "@shopify/flash-list";

import Container from "components/Container";
import FeedItem from "components/FeedItem";
import BottomComment from "components/BottomComment";



const FeedItemSkeleton = () => {
  return (
    <VStack p={4} space={4}>
      <HStack alignItems="center" justifyContent="space-between">
        <HStack space={2} alignItems="center">
          <Skeleton size={28} rounded="full"/>
          <Skeleton.Text size={28} lines={1} w="1/3"/>
        </HStack>
        <Skeleton.Text size={28} lines={1} w="1/6"/>
      </HStack>
      <HStack space={2}>
        <Skeleton.Text size={28} lines={1} w="1/6"/>
        <Skeleton.Text size={28} lines={1} w="1/6"/>
        <Skeleton.Text size={28} lines={1} w="1/6"/>
      </HStack>
      <Skeleton.Text size={28} lines={3} w="full"/>
      <Skeleton h={200} w="full"/>
      <Skeleton.Text size={28} lines={1} w="1/6"/>
      <HStack justifyContent="space-between">
        <Skeleton h="20px" w="20px" rounded="full"/>
        <Skeleton h="20px" w="20px" rounded="full"/>
        <Skeleton h="20px" w="20px" rounded="full"/>
      </HStack>
        <Skeleton h="1px" w="full"/>
    </VStack>
  )
}

const FeedList = ({ feedListData }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [feedIsLoaded, setFeedIsLoaded] = useState(false)
  
  useEffect(() => {
    setTimeout(() => setFeedIsLoaded(true), 1500);
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
