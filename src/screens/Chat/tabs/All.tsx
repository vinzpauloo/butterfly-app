import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { VStack, Skeleton, HStack } from "native-base";

import Container from "components/Container";
import UserProfilePicList from "features/sectionList/components/UserProfilePicList";
import BottomMessage from "components/BottomMessage";

import { allChatCategories } from "data/allChatCategories";

type Props = {};

const UserProfilePicListSkeleton = () => {
  return (
    <Container>
      <Skeleton.Text lines={1} w="1/6" mt={4} mb={3} />
      <HStack m={6} mt={2} justifyContent="space-between">
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"}/>
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"}/>
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"}/>
          <Skeleton.Text lines={1} w="50" />
        </VStack>
      </HStack>
      <HStack m={6} mt={2} justifyContent="space-between">
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"}/>
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"}/>
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"}/>
          <Skeleton.Text lines={1} w="50" />
        </VStack>
      </HStack>
      <HStack m={6} mt={2} justifyContent="space-between">
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"}/>
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"}/>
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"}/>
          <Skeleton.Text lines={1} w="50" />
        </VStack>
      </HStack>
    </Container>
  )
}

const All = (props: Props) => {
  const [profilePicListIsLoaded, setprofilePicListIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setprofilePicListIsLoaded(true), 1500);
  });
  
  return (
    <Container>
      {profilePicListIsLoaded ? 
        <View style={styles.userContainer}>
          <FlashList
            estimatedItemSize={399}
            data={allChatCategories}
            scrollEnabled={true}
            renderItem={({ item, index }) => (
              <>
                <Text style={styles.categoryText}>{item.categoryName}</Text>
                <UserProfilePicList userNames={item.usersData} />
              </>
            )}
            keyExtractor={(item, index) => "" + index}
            ListFooterComponent={<BottomMessage />}
          />
        </View>
      :
        <UserProfilePicListSkeleton/>
      }
    </Container>
  );
};

export default All;

const styles = StyleSheet.create({
  categoryText: {
    color: "white",
    borderLeftColor: "#e15655",
    borderLeftWidth: 4,
    paddingLeft: 12,
    marginTop: 12,
  },
  userContainer: {
    flex: 1,
    minHeight: 100
  }
});
