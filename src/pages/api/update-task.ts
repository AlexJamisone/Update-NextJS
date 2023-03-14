import { NextApiRequest, NextApiResponse } from 'next'
import { updatePrice } from '../../lib/updatePrice'
import { verifySignature } from '@upstash/qstash/nextjs'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	// if (req.method === 'POST') {
	// 	try {
	// 		const apiKey = process.env.API_SECURE_KEY
	// 		if(req.headers.authorization !== `Bearer ${apiKey}`) {
	// 			res.status(401).json({ message: 'Unauthorized' })
	// 			return
	// 		}
	// 		// await fetch(
	// 		// 	'https://update-dobrocoffee.vercel.app/api/create/coffee',
	// 		// 	{
	// 		// 		method: 'GET',
	// 		// 	}
	// 		// )
	// 		// await updatePrice()
	// 		// res.status(200).end()
	// 	} catch (error) {
	// 		// console.log(error)
	// 		// res.json({ message: 'task faild' })
	// 	}
	// } else {
	// 	res.setHeader('Allow', 'POST')
	// 	res.status(405).end('Methood Not Allowed')
	// }
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
