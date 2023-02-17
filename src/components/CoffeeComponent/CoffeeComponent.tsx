import { Box, IconButton, Img, Text } from '@chakra-ui/react'
import { Dispatch } from 'react'
import { motion } from 'framer-motion'
import { AiFillEdit } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { Coffee } from '@prisma/client'
import { Action } from '../../reducers/FormInput.reducer'

export interface CoffeeCopmonentProps {
	coffee: Coffee[]
	loadingDelete?: boolean
	search?: string
	dispatch?: Dispatch<Action>
	deletCoffee?: (id: string) => void
}

const CoffeeComponent = ({
	coffee,
	deletCoffee,
	loadingDelete,
	search,
	dispatch,
}: CoffeeCopmonentProps) => {
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
				.map((item: Coffee) => {
					const {
						id,
						description,
						grade,
						handler,
						height,
						img,
						name,
						price,
						qid,
						reg,
						acidity,
						density,
						Iid
					} = item
					return (
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
							key={id}
						>
							<Img width={20} height={20} src={img} alt={name} />
							<Text textAlign="center" fontSize={[12, 16]}>
								{name}
							</Text>
							<Box
								ml={5}
								display="flex"
								justifyContent="space-between"
								alignItems="center"
							>
								<Text fontSize={[12, 16]} w={['100%']}>
									{price}
								</Text>
								<IconButton
									aria-label="edit"
									mx={[2, 3]}
									color="teal.400"
									onClick={() =>
										dispatch?.({
											type: 'SET_FORM',
											payload: {
												description,
												grade,
												handler,
												height,
												id,
												img,
												name,
												price,
												qid,
												reg,
												acidity,
												density,
												Iid
											},
										})
									}
								>
									<AiFillEdit />
								</IconButton>
								<IconButton
									aria-label="delet"
									onClick={() => deletCoffee?.(id)}
									isLoading={loadingDelete}
									color="red.400"
								>
									<BiTrash />
								</IconButton>
							</Box>
						</Box>
					)
				})}
		</Box>
	)
}

export default CoffeeComponent
