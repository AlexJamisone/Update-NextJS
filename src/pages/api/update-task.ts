import { NextApiRequest, NextApiResponse } from 'next'
import { updatePrice } from '../../lib/updatePrice'
import { verifySignature } from '@upstash/qstash/nextjs'

export const config = {
    api: {
        bodyParser: false
    }
}

async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const response = await updatePrice()
		res.status(200).json({ message: 'price is update ✔', response })
	} catch (error) {
		console.log(error)
		res.json({ message: 'task faild' })
	}
}

export default verifySignature(handler)
