import {
	Box,
	Button,
	Center,
	FormLabel,
	Img,
	Input,
	Text,
	useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { motion } from 'framer-motion'

export interface Coffee {
	coffee: {
		id: string
		name: string
		img: string
		price: string
		description: string
		qid: string
	}[]
}

export interface FormData {
	id: string
	name: string
	qid: string
	description: string
}

const ListOfCoffee = ({ coffee }: Coffee) => {
	//State
	const [form, setForm] = useState<FormData>({
		name: '',
		qid: '',
		description: '',
		id: '',
	})
	const [loadingEdit, setLoadingEdit] = useState(false)
	const [loadingDelete, setloadingDelete] = useState(false)
	const router = useRouter()
	const toast = useToast()

	//helper function

	const clearForm = () => {
		setForm({ name: '', qid: '', description: '', id: '' })
	}
	const refreshData = () => {
		router.replace(router.asPath)
	}

	//CRUD

	const deletCoffee = async (id: string) => {
		try {
			setloadingDelete(true)
			fetch(`/api/delete/${id}`, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
			}).then(() => {
				refreshData()
				setloadingDelete(false)
			})
			toast({
				title: 'Succsess deleted Coffee',
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
		} catch (error) {
			console.log('deletCoffee funn Error :', error)
			toast({
				title: `Delete Coffee is not happen: ${error}`,
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		}
	}

	const editCoffee = async (id: string, data: FormData) => {
		try {
			setLoadingEdit(true)
			fetch(`/api/update/${id}`, {
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then(() => {
				refreshData()
				clearForm()
				setLoadingEdit(false)
			})
			toast({
				title: 'Refrash Data are success!',
				status: 'info',
				duration: 5000,
				isClosable: true,
			})
		} catch (error) {
			console.log('Some problem with editCoffee : ', error)
			toast({
				title: `Refrash Data are faild! With: ${error}`,
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		}
	}
	// SUBMIT
	const handleSubmit = (data: FormData) => {
		try {
			if (data.id) {
				editCoffee(data.id, data)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Box mb={5}>
			<form
				onSubmit={(e: React.SyntheticEvent) => {
					e.preventDefault()
					handleSubmit(form)
				}}
			>
				<Center flexDirection="column" gap={3} mb={5}>
					<FormLabel>Coffee Name</FormLabel>
					<Input
						placeholder="Put coffee Here"
						type="text"
						value={form.name}
						onChange={(e) => {
							setForm({ ...form, name: e.target.value })
						}}
					/>
					<FormLabel>Description</FormLabel>
					<Input
						placeholder="Put Description Here"
						type="text"
						value={form.description}
						onChange={(e) => {
							setForm({ ...form, description: e.target.value })
						}}
					/>
					<FormLabel>Quickresto id</FormLabel>
					<Input
						placeholder="Put Quick Resto id Here"
						type="text"
						value={form.qid}
						onChange={(e) => {
							setForm({ ...form, qid: e.target.value })
						}}
					/>
					<Button type="submit" isLoading={loadingEdit}>
						{form.id ? 'Save ✔' : 'Add'}
					</Button>
				</Center>
			</form>
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
				{coffee.map((coffee) => (
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
									setForm({
										name: coffee.name,
										description: coffee.description,
										id: coffee.id,
										qid: coffee.qid,
									})
								}
							>
								<AiFillEdit />
							</Button>
							<Button
								onClick={() => deletCoffee(coffee.id)}
								isLoading={loadingDelete}
								color="red.400"
							>
								<BiTrash />
							</Button>
						</Box>
					</Box>
				))}
			</Box>
		</Box>
	)
}

export default ListOfCoffee
