import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HStack, Skeleton, VStack } from 'native-base'

type Props = {}

const FeedItemSkeleton = (props: Props) => {
	return (
		<VStack p={4} space={4} mt={260}>
			<HStack alignItems="center" justifyContent="space-between">
				<HStack space={2} alignItems="center">
					<Skeleton size={28} rounded="full" />
					<Skeleton.Text size={28} lines={1} w="1/3" />
				</HStack>
				<Skeleton.Text size={28} lines={1} w="1/6" />
			</HStack>
			<HStack space={2}>
				<Skeleton.Text size={28} lines={1} w="1/6" />
				<Skeleton.Text size={28} lines={1} w="1/6" />
				<Skeleton.Text size={28} lines={1} w="1/6" />
			</HStack>
			<Skeleton.Text size={28} lines={3} w="full" />
			<Skeleton h={200} w="full" />
			<Skeleton.Text size={28} lines={1} w="1/6" />
			<HStack justifyContent="space-between">
				<Skeleton h="20px" w="20px" rounded="full" />
				<Skeleton h="20px" w="20px" rounded="full" />
				<Skeleton h="20px" w="20px" rounded="full" />
			</HStack>
			<Skeleton h="1px" w="full" />
		</VStack>
	)
}

export default FeedItemSkeleton

const styles = StyleSheet.create({})
