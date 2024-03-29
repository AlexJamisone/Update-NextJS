import type { NextApiRequest, NextApiResponse } from 'next'
import { updatePrice } from '../../lib/updatePrice'
import { verifySignature } from '@upstash/qstash/nextjs'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		await updatePrice()
		res.status(200).end('success')
	} catch (error) {
		console.log(error)
	}
}

export default verifySignature(handler)

export const config = {
	api: {
		bodyParser: false,
	},
}
