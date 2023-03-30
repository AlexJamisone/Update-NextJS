import type { Coffee } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prismadb'
import { getTasty } from '../../../lib/wrapApi'
import { updatePrice } from '../../../lib/updatePrice'
import Cors from 'cors'

const cors = Cors({
	methods: ['GET'],
})

function runMiddlewere(
	req: NextApiRequest,
	res: NextApiResponse,
	fn: Function
) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result)
			}

			return resolve(result)
		})
	})
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		await runMiddlewere(req, res, cors)
		const [apiCoffee, dbCoffee] = await Promise.all([
			getTasty(),
			prisma.coffee.findMany(),
		])

		const filterDataByApi = apiCoffee.filter(
			({ img: item1 }) =>
				!dbCoffee.some(({ img: item2 }: Coffee) => item2 === item1)
		)
		await prisma.coffee.createMany({
			data: filterDataByApi,
		})
		await prisma.$transaction(
			apiCoffee.map(({ img, price }) =>
				prisma.coffee.update({
					where: {
						img,
					},
					data: {
						price,
					},
				})
			)
		)
		res.status(200).json({ message: 'create succses!', dbCoffee })
	} catch (error: any) {
		console.log(error)
	}
}
