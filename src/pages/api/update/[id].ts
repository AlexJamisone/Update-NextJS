import { prisma } from '../../../lib/prismadb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const id = req.query.id
		const { name, qid, description, price } = req.body
		if (req.method === 'PUT') {
			const coffee = await prisma.coffee.update({
				where: {
					id: String(id),
				},
				data: {
					name,
					qid,
					description,
					price,
				},
			})
			res.json(coffee)
		} else {
			console.log('Some problem with upload')
		}
	} catch (error) {
		console.log(error)
	}
}
