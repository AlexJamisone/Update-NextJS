import { NextApiRequest, NextApiResponse } from 'next'
import { updatePrice } from '../../lib/updatePrice'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		await fetch('https://update-dobrocoffee.vercel.app/api/create/coffee', {
			method: 'GET',
		})
		await updatePrice()
		res.status(200).end('success')
	} catch (error) {
		console.log(error)
	}
}

export default handler

export const config = {
	api: {
		bodyParser: false,
	},
}
