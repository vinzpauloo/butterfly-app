import React from 'react'
import { StyleSheet } from 'react-native'
import { HStack, Skeleton, VStack } from 'native-base'

import Container from 'components/Container'

type Props = {}

const MasonrySkeleton = (props: Props) => {
	return (
		<Container>
			<HStack flexWrap={"wrap"} style={styles.masonryContainer} p={1}>
				<VStack borderWidth={1} borderColor="#999" h={250} w="1/2" padding={2}>
					<VStack space={2} marginTop="auto">
						<Skeleton.Text lines={1} w="3/4"/>
						<HStack space={1} alignItems="center">
							<Skeleton rounded="full" size={5} />
							<Skeleton.Text lines={1} w="2/3"/>
						</HStack>
					</VStack>
				</VStack>
				<VStack borderWidth={1} borderColor="#999" h={250} w="1/2" padding={2}>
					<VStack space={2} marginTop="auto">
						<Skeleton.Text lines={1} w="3/4"/>
						<HStack space={1} alignItems="center">
							<Skeleton rounded="full" size={5} />
							<Skeleton.Text lines={1} w="2/3"/>
						</HStack>
					</VStack>
				</VStack>
				<VStack borderWidth={1} borderColor="#999" h={250} w="1/2" padding={2}>
					<VStack space={2} marginTop="auto">
						<Skeleton.Text lines={1} w="3/4"/>
						<HStack space={1} alignItems="center">
							<Skeleton rounded="full" size={5} />
							<Skeleton.Text lines={1} w="2/3"/>
						</HStack>
					</VStack>
				</VStack>
				<VStack borderWidth={1} borderColor="#999" h={250} w="1/2" padding={2}>
					<VStack space={2} marginTop="auto">
						<Skeleton.Text lines={1} w="3/4"/>
						<HStack space={1} alignItems="center">
							<Skeleton rounded="full" size={5} />
							<Skeleton.Text lines={1} w="2/3"/>
						</HStack>
					</VStack>
				</VStack>
			</HStack>
		</Container>
	)
}

export default MasonrySkeleton

const styles = StyleSheet.create({
	masonryContainer: {
		flex: 1,
		minHeight: 100
	},
})