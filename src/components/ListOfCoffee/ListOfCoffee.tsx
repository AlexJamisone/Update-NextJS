import { Box, Center, Img, Text } from '@chakra-ui/react'
import { NextPageContext } from 'next'
import { prisma } from '../../lib/prismadb'

export interface Coffee {
	coffee: {
		id: string
		name: string
		img: string
		price: string
	}[]
}

const ListOfCoffee = ({ coffee }: Coffee) => {
	return (
		<Center
			height="50vh"
			overflowY="scroll"

			display="flex"
			flexDirection="column"
		>
			{coffee.map(({ id, name, img, price }) => (
				<Box
					width="100%"
					display="flex"
					justifyContent="space-around"
					scrollBehavior='smooth'
					scrollMargin='0'
					scrollPadding='0'
					key={id}
				>
					<Img width={20} height={20} src={img} alt={name} />
					<Text>{name}</Text>
					<Text>{price}</Text>
				</Box>
			))}
		</Center>
	)
}

export default ListOfCoffee
