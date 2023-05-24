import { Skeleton, Stack, VStack } from "native-base";

const FollowerSkeleton = () => {
  return (
    <Stack flexDirection="row" flexWrap="wrap">
      <VStack space={2} alignItems="center" my={2} mx={4}>
        <Skeleton size={42} rounded="full" />
        <Skeleton.Text lines={1} w="full" />
      </VStack>
      <VStack space={2} alignItems="center" my={2} mx={4}>
        <Skeleton size={42} rounded="full" />
        <Skeleton.Text lines={1} w="full" />
      </VStack>
      <VStack space={2} alignItems="center" my={2} mx={4}>
        <Skeleton size={42} rounded="full" />
        <Skeleton.Text lines={1} w="full" />
      </VStack>
      <VStack space={2} alignItems="center" my={2} mx={4}>
        <Skeleton size={42} rounded="full" />
        <Skeleton.Text lines={1} w="full" />
      </VStack>
      <VStack space={2} alignItems="center" my={2} mx={4}>
        <Skeleton size={42} rounded="full" />
        <Skeleton.Text lines={1} w="full" />
      </VStack>
      <VStack space={2} alignItems="center" my={2} mx={4}>
        <Skeleton size={42} rounded="full" />
        <Skeleton.Text lines={1} w="full" />
      </VStack>
      <VStack space={2} alignItems="center" my={2} mx={4}>
        <Skeleton size={42} rounded="full" />
        <Skeleton.Text lines={1} w="full" />
      </VStack>
      <VStack space={2} alignItems="center" my={2} mx={4}>
        <Skeleton size={42} rounded="full" />
        <Skeleton.Text lines={1} w="full" />
      </VStack>
      <VStack space={2} alignItems="center" my={2} mx={4}>
        <Skeleton size={42} rounded="full" />
        <Skeleton.Text lines={1} w="full" />
      </VStack>
      <VStack space={2} alignItems="center" my={2} mx={4}>
        <Skeleton size={42} rounded="full" />
        <Skeleton.Text lines={1} w="full" />
      </VStack>
    </Stack>
  );
};

export default FollowerSkeleton;
