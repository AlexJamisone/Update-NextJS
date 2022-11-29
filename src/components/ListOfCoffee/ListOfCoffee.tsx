import { Box, Button, Img, Text } from '@chakra-ui/react'
import { AiFillEdit } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'

export interface Coffee {
	coffee: {
		id: string
		name: string
		img: string
		price: string
	}[]
	deletCoffee: {
		deleting: (id: string) => void
		loading: boolean
	}
}

const ListOfCoffee = ({ coffee, deletCoffee }: Coffee) => {
	return (
		<Box
			height="50vh"
			overflowY="scroll"
			sx={{
				'::-webkit-scrollbar': {
					display: 'none',
				},
			}}
			style={{ scrollbarWidth: 'none' }}
		>
			{coffee.map(({ id, name, img, price }) => (
				<Box
					p={5}
					my={5}
					borderRadius={50}
					width="100%"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					bgColor="whiteAlpha.200"
					transition="all 0.3s linear"
					_hover={{
						boxShadow:
							'0px 19px 10px -9px rgba(255, 255, 255, 0.16)',
						transform: 'scale(0.98)',
					}}
					key={id}
				>
					<Img width={20} height={20} src={img} alt={name} />
					<Text textAlign="center">{name}</Text>
					<Box
						ml={5}
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Text>{price}</Text>
						<Button mx={3} color="teal.400">
							<AiFillEdit />
						</Button>
						<Button onClick={() => deletCoffee.deleting(id)} isLoading={deletCoffee.loading} color="red.400">
							<BiTrash />
						</Button>
					</Box>
				</Box>
			))}
		</Box>
	)
}

export default ListOfCoffee
