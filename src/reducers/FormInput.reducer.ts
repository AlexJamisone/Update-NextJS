import { Coffee } from '@prisma/client'
export interface FormState extends Coffee {}

interface SetNameActtion {
	type: 'SET_NAME'
	payload: string
}
interface SetImgActtion {
	type: 'SET_IMG'
	payload: string
}
interface SetQidActtion {
	type: 'SET_QID'
	payload: number | null
}
interface SetPriceActtion {
	type: 'SET_PRICE'
	payload: string
}
interface SetDescriptionActtion {
	type: 'SET_DESCRIPTION'
	payload: string | null
}
interface SetGradeActtion {
	type: 'SET_GRADE'
	payload: number | null
}
interface SetHandlerActtion {
	type: 'SET_HANDLER'
	payload: string | null
}
interface SetHeightActtion {
	type: 'SET_HEIGHT'
	payload: string
}

interface ClearForm {
	type: 'CLEAR'
}

interface SetFormState {
	type: 'SET_FORM'
	payload: FormState
}

export type Action =
	| SetNameActtion
	| SetDescriptionActtion
	| SetGradeActtion
	| SetHandlerActtion
	| SetHeightActtion
	| SetPriceActtion
	| SetQidActtion
	| SetImgActtion
	| ClearForm
	| SetFormState

export const initialState: FormState = {
	name: '',
	description: '',
	grade: null,
	handler: '',
	height: '',
	img: '',
	price: '',
	qid: 0,
	reg: null,
	id: '',
}

export const FormInputReducer = (
	state: FormState,
	action: Action
): FormState => {
	switch (action.type) {
		case 'SET_NAME':
			return { ...state, name: action.payload }
		case 'SET_DESCRIPTION':
			return { ...state, description: action.payload }
		case 'SET_GRADE':
			return { ...state, grade: action.payload }
		case 'SET_HANDLER':
			return { ...state, handler: action.payload }
		case 'SET_HEIGHT':
			return { ...state, height: action.payload }
		case 'SET_PRICE':
			return { ...state, price: action.payload }
		case 'SET_QID':
			return { ...state, qid: action.payload }
		case 'SET_IMG':
			return { ...state, img: action.payload }
		case 'CLEAR':
			return initialState
		case 'SET_FORM':
			return {
				...state,
				description: action.payload.description,
				grade: action.payload.grade,
				handler: action.payload.handler,
				height: action.payload.height,
				id: action.payload.id,
				img: action.payload.img,
				name: action.payload.name,
				price: action.payload.price,
				qid: action.payload.qid,
				reg: action.payload.reg,
			}
		default:
			return state
	}
}
