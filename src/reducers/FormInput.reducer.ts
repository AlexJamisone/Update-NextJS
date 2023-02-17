import { Coffee, Acidity, Density } from '@prisma/client'
export interface FormState extends Coffee {}

interface SetNameAction {
	type: 'SET_NAME'
	payload: string
}
interface SetImgAction {
	type: 'SET_IMG'
	payload: string
}
interface SetQidAction {
	type: 'SET_QID'
	payload: number | null
}
interface SetPriceAction {
	type: 'SET_PRICE'
	payload: string
}
interface SetDescriptionAction {
	type: 'SET_DESCRIPTION'
	payload: string | null
}
interface SetGradeAction {
	type: 'SET_GRADE'
	payload: number | null
}
interface SetHandlerAction {
	type: 'SET_HANDLER'
	payload: string | null
}
interface SetHeightAction {
	type: 'SET_HEIGHT'
	payload: string
}
interface SetRegionAction {
	type: 'SET_REG'
	payload: string
}
interface SetIngridientAction {
	type: 'SET_IID'
	payload: number | null
}
interface SetAcidityAction {
	type: 'SET_ACI'
	payload: Acidity
}
interface SetDensityAction {
	type: 'SET_DENSITY'
	payload: Density
}

interface ClearForm {
	type: 'CLEAR'
}

interface SetFormState {
	type: 'SET_FORM'
	payload: FormState
}

export type Action =
	| SetNameAction
	| SetDescriptionAction
	| SetGradeAction
	| SetHandlerAction
	| SetHeightAction
	| SetPriceAction
	| SetQidAction
	| SetImgAction
	| SetRegionAction
	| ClearForm
	| SetFormState
	| SetAcidityAction
	| SetDensityAction
	| SetIngridientAction

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
	Iid: null,
	acidity: 'Bitter' || 'Neutral' || 'Acid',
	density: 'Tea' || 'Neutral' || 'Dense',
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
		case 'SET_REG':
			return { ...state, reg: action.payload }
		case 'SET_ACI':
			return { ...state, acidity: action.payload }
		case 'SET_DENSITY':
			return { ...state, density: action.payload }
		case 'SET_IID':
			return { ...state, Iid: action.payload }
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
				acidity: action.payload.acidity,
				density: action.payload.density,
				Iid: action.payload.Iid,
			}
		default:
			return state
	}
}
