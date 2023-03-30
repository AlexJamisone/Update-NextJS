import type { NextApiRequest, NextApiResponse } from 'next'
import { verifySignature } from '@upstash/qstash/nextjs'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		await fetch('https://update-dobrocoffee.vercel.app/api/create/coffee', {
			method: 'GET',
		})
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
