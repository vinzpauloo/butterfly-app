import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { VStack, Skeleton, HStack } from "native-base";

import Container from "components/Container";
import UserProfilePicList from "features/sectionList/components/UserProfilePicList";
import BottomMessage from "components/BottomMessage";

import { useQuery } from "@tanstack/react-query";
import ModelGroupService from "services/api/ModelGroupService";

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
  const { getAllModelGroup } = ModelGroupService();
  const { isLoading, refetch, data } = useQuery({
    queryKey: ["allModelGroup"],
    queryFn: () => getAllModelGroup({
    }),
    onSuccess: () => {
      console.log("=== model group fetched from backend! ===")
    },
    onError: (error) => {
      alert(error);
    },
  });
  
  return (
    <Container>
      {isLoading ? <UserProfilePicListSkeleton/> :
        <View style={styles.userContainer}>
          <FlashList
            estimatedItemSize={399}
            data={data}
            renderItem={({ item } : any) => (
              <>
                <Text style={styles.categoryText}>{item.name}</Text>
                <UserProfilePicList userInfo={item.users} />
              </>
            )}
            keyExtractor={(item, index) => "" + index}
            ListFooterComponent={<BottomMessage />}
          />
        </View>}
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
  }
});
