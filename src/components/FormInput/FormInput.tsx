import { Button, Center, FormLabel, Input } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { FormData } from './../Main/Main'


interface FormDataAction {
	form: FormData
	handleSubmit: (data: FormData) => void
	setForm: Dispatch<SetStateAction<FormData>>
	loadingEdit: boolean
}

const FormInput = ({form, handleSubmit, setForm, loadingEdit}: FormDataAction) => {
	return (
		<form
			onSubmit={(e: React.SyntheticEvent) => {
				e.preventDefault()
				handleSubmit?.(form)
			}}
		>
			<Center flexDirection="column" gap={3} mb={5}>
				<FormLabel>Coffee Name</FormLabel>
				<Input
					placeholder="Put coffee Here"
					type="text"
					value={form?.name}
					onChange={(e) => {
						setForm?.({...form, name: e.target.value})
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
	)
}

export default FormInput
