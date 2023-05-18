import { StyleSheet, View } from "react-native";
import React from "react";
import Container from "components/Container";
import { VStack, HStack, Skeleton } from "native-base";

type Props = {};

const VideoHistorySkeleton = (props: Props) => {
  return (
    <Container>
      <VStack space={2} p={2}>
        <HStack my={2}>
          <VStack
            space={2}
            p={2}
            justifyContent="flex-end"
            style={{
              width: "40%",
              height: 100,
            }}
          >
            <Skeleton height={100} />
          </VStack>
          <VStack
            space={2}
            p={2}
            justifyContent="flex-end"
            style={{
              width: "60%",
              height: 100,
            }}
          >
            <Skeleton.Text lines={1} w="5/6" />
            <Skeleton.Text lines={1} w="5/6" />
            <Skeleton.Text lines={1} w="1/2" />
            <Skeleton.Text lines={1} w="1/2" />
            <Skeleton.Text lines={1} w="1/2" />
          </VStack>
        </HStack>
        <HStack my={2}>
          <VStack
            space={2}
            p={2}
            justifyContent="flex-end"
            style={{
              width: "40%",
              height: 100,
            }}
          >
            <Skeleton height={100} />
          </VStack>
          <VStack
            space={2}
            p={2}
            justifyContent="flex-end"
            style={{
              width: "60%",
              height: 100,
            }}
          >
            <Skeleton.Text lines={1} w="5/6" />
            <Skeleton.Text lines={1} w="5/6" />
            <Skeleton.Text lines={1} w="1/2" />
            <Skeleton.Text lines={1} w="1/2" />
            <Skeleton.Text lines={1} w="1/2" />
          </VStack>
        </HStack>
        <HStack my={2}>
          <VStack
            space={2}
            p={2}
            justifyContent="flex-end"
            style={{
              width: "40%",
              height: 100,
            }}
          >
            <Skeleton height={100} />
          </VStack>
          <VStack
            space={2}
            p={2}
            justifyContent="flex-end"
            style={{
              width: "60%",
              height: 100,
            }}
          >
            <Skeleton.Text lines={1} w="5/6" />
            <Skeleton.Text lines={1} w="5/6" />
            <Skeleton.Text lines={1} w="1/2" />
            <Skeleton.Text lines={1} w="1/2" />
            <Skeleton.Text lines={1} w="1/2" />
          </VStack>
        </HStack>
        <HStack my={2}>
          <VStack
            space={2}
            p={2}
            justifyContent="flex-end"
            style={{
              width: "40%",
              height: 100,
            }}
          >
            <Skeleton height={100} />
          </VStack>
          <VStack
            space={2}
            p={2}
            justifyContent="flex-end"
            style={{
              width: "60%",
              height: 100,
            }}
          >
            <Skeleton.Text lines={1} w="5/6" />
            <Skeleton.Text lines={1} w="5/6" />
            <Skeleton.Text lines={1} w="1/2" />
            <Skeleton.Text lines={1} w="1/2" />
            <Skeleton.Text lines={1} w="1/2" />
          </VStack>
        </HStack>
        <HStack my={2}>
          <VStack
            space={2}
            p={2}
            justifyContent="flex-end"
            style={{
              width: "40%",
              height: 100,
            }}
          >
            <Skeleton height={100} />
          </VStack>
          <VStack
            space={2}
            p={2}
            justifyContent="flex-end"
            style={{
              width: "60%",
              height: 100,
            }}
          >
            <Skeleton.Text lines={1} w="5/6" />
            <Skeleton.Text lines={1} w="5/6" />
            <Skeleton.Text lines={1} w="1/2" />
            <Skeleton.Text lines={1} w="1/2" />
            <Skeleton.Text lines={1} w="1/2" />
          </VStack>
        </HStack>
      </VStack>
    </Container>
  );
};

export default VideoHistorySkeleton;

const styles = StyleSheet.create({});
