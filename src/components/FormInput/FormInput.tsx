import { Button, Center, FormLabel, Input } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { FormState, Action } from '../../reducers/FormInput.reducer'
interface FormDataAction {
	form: FormState
	handleSubmit: (data: FormState) => void
	createCoffee: (data: FormState) => void
	dispatch: Dispatch<Action>
	loadingEdit: boolean
}

const FormInput = ({
	form,
	handleSubmit,
	dispatch,
	loadingEdit,
	createCoffee,
}: FormDataAction) => {
	const {
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
	} = form
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
					value={name}
					onChange={(e) =>
						dispatch({ type: 'SET_NAME', payload: e.target.value })
					}
				/>
				<FormLabel>Img</FormLabel>
				<Input
					placeholder="Put img string"
					type="text"
					value={img}
					onChange={(e) =>
						dispatch({ type: 'SET_IMG', payload: e.target.value })
					}
				/>
				<FormLabel>Price</FormLabel>
				<Input
					placeholder="Put Price of Coffee"
					type="text"
					value={price}
					onChange={(e) =>
						dispatch({ type: 'SET_PRICE', payload: e.target.value })
					}
				/>
				<FormLabel>Description</FormLabel>
				<Input
					placeholder="Put Description Here"
					type="text"
					value={description as string}
					onChange={(e) =>
						dispatch({
							type: 'SET_DESCRIPTION',
							payload: e.target.value,
						})
					}
				/>
				<FormLabel>Quickresto id</FormLabel>
				<Input
					placeholder="Put Quick Resto id Here"
					type="number"
					value={qid as number}
					onChange={(e) =>
						dispatch({
							type: 'SET_QID',
							payload: e.target.valueAsNumber,
						})
					}
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
