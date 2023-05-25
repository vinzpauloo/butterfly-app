import { VStack, Skeleton, HStack } from "native-base";

import Container from "components/Container";

export default function UserProfilePicListSkeleton() {
  return (
    <Container>
      <Skeleton.Text lines={1} w="1/6" mt={4} mb={3} />
      <HStack m={6} mt={2} justifyContent="space-between">
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
      </HStack>
      <HStack m={6} mt={2} justifyContent="space-between">
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
      </HStack>
      <HStack m={6} mt={2} justifyContent="space-between">
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
        <VStack space={2} alignItems="center" maxW="60">
          <Skeleton rounded="full" boxSize={"50"} />
          <Skeleton.Text lines={1} w="50" />
        </VStack>
      </HStack>
    </Container>
  );
}
