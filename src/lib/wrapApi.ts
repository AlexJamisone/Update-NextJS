import { WrapApiCoffeeData } from './types'

export const getTasty = async (): Promise<Array<WrapApiCoffeeData>> => {
	const api_url = `https://wrapapi.com/use/alexjamison/tastyco/basket/latest?stateToken=${process.env.STATE_TOKEN}&wrapAPIKey=${process.env.WRAP_API_KEY}`
	const response = await fetch(api_url, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const data = await response.json()
	return data.data.coffee
}
