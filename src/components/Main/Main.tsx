import {
	Box,
	Button,
	Center,
	FormLabel, Input, useToast
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Coffee, { ActionCofeePorps, CoffeeProps } from '../Coffee/Coffee'
import SearchInput from '../SearchInput/SearchInput'

export interface FormData {
	id: string
	name: string
	qid: number
	description: string
}

const Main = ({ coffee }: CoffeeProps) => {
	//State
	const [form, setForm] = useState<FormData>({
		name: '',
		qid: 0,
		description: '',
		id: '',
	})
	const [search, setSearch] = useState('')
	const [loadingEdit, setLoadingEdit] = useState(false)
	const [loadingDelete, setloadingDelete] = useState(false)
	const router = useRouter()
	const toast = useToast()

	//helper function

	const clearForm = () => {
		setForm({ name: '', qid: 0, description: '', id: '' })
	}
	const refreshData = () => {
		router.replace(router.asPath)
	}

	//Filtering Chenge

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
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
						type="number"
						value={form.qid}
						onChange={(e) => {
							setForm({ ...form, qid: +e.target.value })
						}}
					/>
					<Button type="submit" isLoading={loadingEdit}>
						{form.id ? 'Save ✔' : 'Add'}
					</Button>
				</Center>
			</form>
			<SearchInput setSearch={handleInputChange} />
			<Coffee
				coffee={coffee}
				loadingDelete={loadingDelete}
				deletCoffee={deletCoffee}
				search={search}
				setForm={setForm}
			/>
		</Box>
	)
}

export default Main
