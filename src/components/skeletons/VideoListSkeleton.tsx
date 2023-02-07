import { StyleSheet, View } from 'react-native'
import React from 'react'
import Container from 'components/Container'
import { VStack, HStack, Skeleton } from 'native-base'

type Props = {}

const VideoListSkeleton = (props: Props) => {
	return (
		<Container>
			<VStack space={2} p={2}>
				<Skeleton.Text lines={1} w="1/3" />
				<HStack alignItems="center" space={2}>
					<Skeleton rounded="full" size={26} />
					<Skeleton.Text lines={1} w="1/6" />
					<Skeleton.Text ml="auto" lines={1} w="1/6" />
				</HStack>
				<HStack>
					<VStack space={2} p={2} justifyContent="flex-end" style={{ borderWidth: 1, borderColor: "#999", width: "50%", height: 150 }}>
						<Skeleton.Text lines={1} w="5/6" />
						<Skeleton.Text lines={1} w="1/2" />
					</VStack>
					<VStack space={2} p={2} justifyContent="flex-end" style={{ borderWidth: 1, borderColor: "#999", width: "50%", height: 150 }}>
						<Skeleton.Text lines={1} w="5/6" />
						<Skeleton.Text lines={1} w="1/2" />
					</VStack>
				</HStack>
				<View style={{ width: "100%", height: 1, backgroundColor: "#999", marginTop: 12 }} />
				<Skeleton.Text lines={1} w="1/3" />
				<HStack alignItems="center" space={2}>
					<Skeleton rounded="full" size={26} />
					<Skeleton.Text lines={1} w="1/6" />
					<Skeleton.Text ml="auto" lines={1} w="1/6" />
				</HStack>
				<HStack>
					<VStack space={2} p={2} justifyContent="flex-end" style={{ borderWidth: 1, borderColor: "#999", width: "50%", height: 150 }}>
						<Skeleton.Text lines={1} w="5/6" />
						<Skeleton.Text lines={1} w="1/2" />
					</VStack>
					<VStack space={2} p={2} justifyContent="flex-end" style={{ borderWidth: 1, borderColor: "#999", width: "50%", height: 150 }}>
						<Skeleton.Text lines={1} w="5/6" />
						<Skeleton.Text lines={1} w="1/2" />
					</VStack>
				</HStack>
				<View style={{ width: "100%", height: 1, backgroundColor: "#999", marginTop: 12 }} />
			</VStack>
		</Container>
	)
}

export default VideoListSkeleton

const styles = StyleSheet.create({})