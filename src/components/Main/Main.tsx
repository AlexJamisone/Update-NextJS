import { Box, Button, useToast, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useReducer, useState } from 'react'
import FormInput from '../FormInput/FormInput'
import SearchInput from '../SearchInput/SearchInput'
import { Coffee } from '@prisma/client'
import CoffeeComponent from '../CoffeeComponent/CoffeeComponent'
import {
	FormInputReducer,
	initialState,
	FormState,
} from '../../reducers/FormInput.reducer'

interface MainProps {
	coffee: Coffee[]
}

const Main = ({ coffee }: MainProps) => {
	const [state, dispatch] = useReducer(FormInputReducer, initialState)

	const [search, setSearch] = useState('')
	const [loadingEdit, setLoadingEdit] = useState(false)
	const [loadingUpdateDb, setLoadingUpdateDb] = useState(false)
	const [loadingPrice, setLoadingPrice] = useState(false)
	const [loadingDelete, setloadingDelete] = useState(false)
	const router = useRouter()
	const toast = useToast()

	//helper function
	const refreshData = () => {
		router.replace(router.asPath)
	}

	//Filtering Chenge

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	//CRUD
	const createCoffee = async (data: FormState) => {
		try {
			setLoadingEdit(true)
			await fetch(`/api/create/object`, {
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then(() => {
				refreshData()
				dispatch({ type: 'CLEAR' })
				setLoadingEdit(false)
			})
			toast({
				title: 'Succsess Create Coffee',
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
		} catch (error) {
			console.log('some poblem with create Coffee', error)
			toast({
				title: `Some problem with create coffee ${error}`,
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		}
	}

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

	const editCoffee = async (id: string, data: FormState) => {
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
				dispatch({ type: 'CLEAR' })
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
	const handleSubmit = (data: FormState) => {
		try {
			if (data.id) {
				editCoffee(data.id, data)
			}
		} catch (error) {
			console.log(error)
		}
	}
	const handlDbUpdate = async () => {
		try {
			setLoadingUpdateDb(true)
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_QSTASH_URL}https://update-dobrocoffee.vercel.app/api/update-db-task`,
				{
					method: 'POST',
					headers: new Headers({
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_QSTASH_TOKEN}`,
						'Content-Type': 'application/json',
					}),
				}
			)
			await response.json()
			toast({
				description: 'Data is update on db!🎉',
				isClosable: true,
				status: 'info',
			})
			setLoadingUpdateDb(false)
		} catch (error) {
			setLoadingUpdateDb(false)
			toast({
				description: `Error: ${error}`,
				isClosable: true,
				status: 'error',
			})
			console.log(error)
		}
	}
	const handlPriceUpdate = async () => {
		try {
			setLoadingPrice(true)
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_QSTASH_URL}https://update-dobrocoffee.vercel.app/api/update-price-task`,
				{
					method: 'POST',
					headers: new Headers({
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_QSTASH_TOKEN}`,
						'Content-Type': 'application/json',
					}),
				}
			)
			await response.json()
			toast({
				description: 'Price is sync!🎉',
				isClosable: true,
				status: 'info',
			})
			setLoadingPrice(false)
		} catch (error) {
			setLoadingPrice(false)
			toast({
				description: `Error: ${error}`,
				isClosable: true,
				status: 'error',
			})
			console.log(error)
		}
	}
	return (
		<Box m={5} minWidth="25%">
			<FormInput
				form={state}
				handleSubmit={handleSubmit}
				dispatch={dispatch}
				loadingEdit={loadingEdit}
				createCoffee={createCoffee}
			/>
			<Stack mb={5}>
				<Button
					onClick={() => handlDbUpdate()}
					isLoading={loadingUpdateDb}
				>
					Update DB Coffee
				</Button>
				<Button
					onClick={() => handlPriceUpdate()}
					isLoading={loadingPrice}
				>
					Update Price Coffee
				</Button>
			</Stack>
			<SearchInput setSearch={handleInputChange} />
			<CoffeeComponent
				coffee={coffee}
				loadingDelete={loadingDelete}
				deletCoffee={deletCoffee}
				search={search}
				dispatch={dispatch}
			/>
		</Box>
	)
}

export default Main
