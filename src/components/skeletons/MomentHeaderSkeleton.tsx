import { StyleSheet } from 'react-native'
import React from 'react'
import { VStack, HStack, Skeleton, Divider } from 'native-base'

type Props = {}

const MomentHeaderSkeleton = (props: Props) => {
	return (
		<VStack space={1}>
			<HStack space={3} alignItems="center">
				<Skeleton rounded="full" size={2} />
				<Skeleton.Text lines={1} w="3/4" />
			</HStack>
			<Divider style={styles.divider} color="#999" />
			<HStack space={3} alignItems="center">
				<Skeleton rounded="full" size={2} />
				<Skeleton.Text lines={1} w="3/4" />
			</HStack>
			<Divider style={styles.divider} color="#999" />
			<HStack space={3} alignItems="center">
				<Skeleton rounded="full" size={2} />
				<Skeleton.Text lines={1} w="3/4" />
			</HStack>
			<Divider style={styles.divider} color="#999" />
			<HStack space={3} alignItems="center">
				<Skeleton rounded="full" size={2} />
				<Skeleton.Text lines={1} w="3/4" />
			</HStack>
			<Divider style={styles.divider} color="#999" />
			<HStack space={3} alignItems="center">
				<Skeleton rounded="full" size={2} />
				<Skeleton.Text lines={1} w="3/4" />
			</HStack>
		</VStack>
	)
}

export default MomentHeaderSkeleton

const styles = StyleSheet.create({
	divider: {
		marginVertical: 12,
	},
})