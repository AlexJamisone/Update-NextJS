import { NextApiRequest, NextApiResponse } from 'next'
import { updatePrice } from '../../lib/updatePrice'
import { verifySignature } from '@upstash/qstash/nextjs'

export const config = {
	api: {
		bodyParser: false,
	},
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const response = await updatePrice()
			res.status(200).json({ message: 'price is update ✔', response })
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
