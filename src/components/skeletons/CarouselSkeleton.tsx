import React from 'react'
import { Skeleton } from 'native-base'

type Props = {}

const CarouselSkeleton = (props: Props) => {
	return (
		<Skeleton h={150} w="full" />
	)
}

export default CarouselSkeleton