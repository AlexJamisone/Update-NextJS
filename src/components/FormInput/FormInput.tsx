import { useState } from 'react'
import { useRouter } from 'next/router'
import {
	Box,
	Button,
	Center,
	FormLabel,
	Input,
	useToast,
} from '@chakra-ui/react'
import { Coffee } from '../ListOfCoffee/ListOfCoffee'
import ListOfCoffee from '../ListOfCoffee/ListOfCoffee'

interface FormData {
	id: string
	name: string
	qid: string
	description: string
}

const FormInput = ({coffee, deletCoffee}: Coffee) => {
	const [form, setForm] = useState<FormData>({
		name: '',
		qid: '',
		description: '',
		id: '',
	})
	const router = useRouter()
	const toast = useToast()

	const clearForm = () => {
		setForm({ name: '', qid: '', description: '', id: '' })
	}
	const refreshData = () => {
		router.replace(router.asPath)
	}

    const handleSubmit = (data: FormData) => {
        try {
            if(data.id) {
                
            }
        } catch (error) {
            
        }
    }
	return (
		<Box mb={5}>
			<form
				onSubmit={(e: React.SyntheticEvent) => {
					e.preventDefault()
					console.log('submit form')
				}}
			>
				<Center flexDirection="column" gap={1} mb={5}>
					<FormLabel>Coffee Name</FormLabel>
					<Input placeholder="Put coffee Here" type="text" />
					<FormLabel>Description</FormLabel>
					<Input placeholder="Put coffee Here" type="text" />
					<FormLabel>Quickresto id</FormLabel>
					<Input placeholder="Put coffee Here" type="text" />
				</Center>
				<Button type="submit">Add</Button>
                <ListOfCoffee coffee={coffee} deletCoffee={deletCoffee}/>
			</form>
		</Box>
	)
}

export default FormInput
