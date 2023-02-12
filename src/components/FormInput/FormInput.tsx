import {
	Button,
	FormLabel,
	Grid,
	GridItem,
	Input,
	RadioGroup,
	Radio,
	Stack,
} from '@chakra-ui/react'
import React, { Dispatch } from 'react'
import { Action, FormState } from '../../reducers/FormInput.reducer'
import { Acidity, Density } from '@prisma/client'
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
		acidity,
		density,
	} = form
	return (
		<Grid
			as="form"
			templateColumns={["repeat(2, 1fr)","repeat(3, 1fr)"]}
			gap={5}
			mb={5}
			alignItems="center"
			onSubmit={(e: React.SyntheticEvent) => {
				e.preventDefault()
				handleSubmit(form)
			}}
		>
			<GridItem>
				<FormLabel>Coffee Name</FormLabel>
				<Input
					placeholder="Put coffee Here"
					type="text"
					value={name}
					onChange={(e) =>
						dispatch({ type: 'SET_NAME', payload: e.target.value })
					}
				/>
			</GridItem>
			<GridItem>
				<FormLabel>Img</FormLabel>
				<Input
					placeholder="Put img string"
					type="text"
					value={img}
					onChange={(e) =>
						dispatch({ type: 'SET_IMG', payload: e.target.value })
					}
				/>
			</GridItem>
			<GridItem>
				<FormLabel>Price</FormLabel>
				<Input
					placeholder="Put Price of Coffee"
					type="text"
					value={price}
					onChange={(e) =>
						dispatch({ type: 'SET_PRICE', payload: e.target.value })
					}
				/>
			</GridItem>
			<GridItem>
				<FormLabel>Description</FormLabel>
				<Input
					placeholder="Put Description Here"
					type="text"
					value={description || ''}
					onChange={(e) =>
						dispatch({
							type: 'SET_DESCRIPTION',
							payload: e.target.value,
						})
					}
				/>
			</GridItem>
			<GridItem>
				<FormLabel>Quickresto id</FormLabel>
				<Input
					placeholder="Put Quick Resto id Here"
					type="number"
					value={qid || 0}
					onChange={(e) =>
						dispatch({
							type: 'SET_QID',
							payload: e.target.valueAsNumber,
						})
					}
				/>
			</GridItem>
			<GridItem>
				<FormLabel>Q-Grade</FormLabel>
				<Input
					placeholder="Оценка Q"
					type="number"
					value={grade || 0}
					onChange={(e) =>
						dispatch({
							type: 'SET_GRADE',
							payload: e.target.valueAsNumber,
						})
					}
				/>
			</GridItem>
			<GridItem>
				<FormLabel>Высота</FormLabel>
				<Input
					placeholder="Высота"
					value={height || ''}
					onChange={(e) =>
						dispatch({
							type: 'SET_HEIGHT',
							payload: e.target.value,
						})
					}
				/>
			</GridItem>
			<GridItem>
				<FormLabel>Обработка</FormLabel>
				<Input
					placeholder="Метод обработки"
					value={handler || ''}
					onChange={(e) =>
						dispatch({
							type: 'SET_HANDLER',
							payload: e.target.value,
						})
					}
				/>
			</GridItem>
			<GridItem>
				<FormLabel>Регион</FormLabel>
				<Input
					placeholder="Регион произрастания"
					value={reg || ''}
					onChange={(e) =>
						dispatch({
							type: 'SET_REG',
							payload: e.target.value,
						})
					}
				/>
			</GridItem>
			<GridItem>
				<FormLabel>Кислотность</FormLabel>
				<RadioGroup
					onChange={(value) =>
						dispatch({ type: 'SET_ACI', payload: value as Acidity })
					}
					value={acidity as Acidity}
				>
					<Stack>
						<Radio value="Bitter">Горький</Radio>
						<Radio value="Neutral">Нейтральный</Radio>
						<Radio value="Acid">Кислотный</Radio>
					</Stack>
				</RadioGroup>
			</GridItem>
			<GridItem>
				<FormLabel>Плотность</FormLabel>
				<RadioGroup
					onChange={(value) =>
						dispatch({
							type: 'SET_DENSITY',
							payload: value as Density,
						})
					}
					value={density as Density}
				>
					<Stack>
						<Radio value="Tea">Чайный</Radio>
						<Radio value="Neutral">Нейтральный</Radio>
						<Radio value="Dense">Плотный</Radio>
					</Stack>
				</RadioGroup>
			</GridItem>
			<GridItem colStart={2}>
				{id ? (
					<Button type="submit" isLoading={loadingEdit} w={['100%']}>
						Save ✔
					</Button>
				) : (
					<Button
						onClick={() => createCoffee(form)}
						isLoading={loadingEdit}
						w={['100%']}
					>
						Add
					</Button>
				)}
			</GridItem>
		</Grid>
	)
}

export default FormInput
