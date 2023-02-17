import { HStack, Skeleton, VStack } from "native-base";

const CommentListSkeleton = () => {
  return (
    <>
      <Skeleton.Text lines={1} w="1/6" mb="18px" />
      <HStack space={2}>
        <Skeleton size={42} rounded="full" />
        <VStack space={4} style={{ flex: 1, paddingHorizontal: 6 }}>
          <Skeleton.Text lines={1} w="1/6" />
          <Skeleton.Text lines={3} w="full" />
          <HStack space={1.5} alignItems="center">
            <Skeleton w="14px" h="14px" rounded="full" />
            <Skeleton.Text lines={1} w="1/6" />
          </HStack>
        </VStack>
      </HStack>
      <Skeleton h="1px" w="full" mt={3} />
    </>
  );
};

export default CommentListSkeleton;
