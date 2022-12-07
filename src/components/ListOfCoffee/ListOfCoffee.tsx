import { Box, Button, Img, Text } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import { AiFillEdit } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { FormData } from '../Main/Main'

export interface CoffeeProps extends ActionCofeePorps {
	coffee: {
		id: string
		name: string
		img: string
		price: string
		description: string
		qid: number
	}[]
}

export interface ActionCofeePorps {
	loadingDelete?: boolean
	search?: string
	setForm?: Dispatch<SetStateAction<FormData>>
	deletCoffee?: (id: string) => void
}

const Coffee = ({
	coffee,
	deletCoffee,
	loadingDelete,
	search,
	setForm,
}: CoffeeProps) => {
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
			{coffee
				.filter((fiCoffee) => {
					if (search === '') {
						return fiCoffee
					} else if (
						fiCoffee.name
							.toLowerCase()
							.includes(search?.toLowerCase() as string)
					) {
						return fiCoffee
					}
				})
				.map((coffee) => (
					<Box
						as={motion.div}
						initial={{ y: '10%' }}
						animate={{ y: '0%' }}
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
						key={coffee.id}
					>
						<Img
							width={20}
							height={20}
							src={coffee.img}
							alt={coffee.name}
						/>
						<Text textAlign="center">{coffee.name}</Text>
						<Box
							ml={5}
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Text>{coffee.price}</Text>
							<Button
								mx={3}
								color="teal.400"
								onClick={() =>
									setForm?.({
										description: coffee.description,
										id: coffee.id,
										name: coffee.name,
										qid: coffee.qid,
									})
								}
							>
								<AiFillEdit />
							</Button>
							<Button
								onClick={() => deletCoffee?.(coffee.id)}
								isLoading={loadingDelete}
								color="red.400"
							>
								<BiTrash />
							</Button>
						</Box>
					</Box>
				))}
		</Box>
	)
}

export default Coffee
