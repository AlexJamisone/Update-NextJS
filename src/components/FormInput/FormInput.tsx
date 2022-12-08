import { Button, Center, FormLabel, Input } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { FormData } from './../Main/Main'

interface FormDataAction {
	form: FormData
	handleSubmit: (data: FormData) => void
	createCoffee: (data: FormData) => void
	setForm: Dispatch<SetStateAction<FormData>>
	loadingEdit: boolean
}

const FormInput = ({
	form,
	handleSubmit,
	setForm,
	loadingEdit,
	createCoffee,
}: FormDataAction) => {
	return (
		<form
			onSubmit={(e: React.SyntheticEvent) => {
				e.preventDefault()
				handleSubmit?.(form)
			}}
		>
			<Center flexDirection="column" gap={1} mb={5}>
				<FormLabel>Coffee Name</FormLabel>
				<Input
					placeholder="Put coffee Here"
					type="text"
					value={form?.name}
					onChange={(e) => {
						setForm?.({ ...form, name: e.target.value })
					}}
				/>
				<FormLabel>Img</FormLabel>
				<Input
					placeholder="Put img string"
					type="text"
					value={form?.img}
					onChange={(e) => {
						setForm?.({ ...form, img: e.target.value })
					}}
				/>
				<FormLabel>Price</FormLabel>
				<Input
					placeholder="Put Price of Coffee"
					type="text"
					value={form?.price}
					onChange={(e) => {
						setForm?.({ ...form, price: e.target.value })
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
				{form.id ? (
					<Button type="submit" isLoading={loadingEdit}>
						Save ✔
					</Button>
				) : (
					<Button
						onClick={() => createCoffee(form)}
						isLoading={loadingEdit}
					>
						Add
					</Button>
				)}
			</Center>
		</form>
	)
}

export default FormInput
