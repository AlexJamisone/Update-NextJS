import { NextApiRequest, NextApiResponse } from 'next'
import { updatePrice } from '../../lib/updatePrice'
import { verifySignature } from '@upstash/qstash/nextjs'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			await fetch(
				'https://update-dobrocoffee.vercel.app/api/create/coffee',
				{
					method: 'GET',
				}
			)
			await updatePrice()
			res.status(200).end()
		} catch (error) {
			console.log(error)
			res.json({ message: 'task faild' })
		}
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Methood Not Allowed')
	}
}

export default verifySignature(handler)

export const config = {
	api: {
		bodyParser: false,
	},
}
