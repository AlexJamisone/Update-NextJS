import { Coffee } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prismadb'
import { getTasty } from '../../../lib/wrapApi'
import Cors from 'cors'
import { WrapApiCoffeeData } from '../../../lib/types'

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
		const apiCoffee = await getTasty()
		const dbCoffee = await prisma.coffee.findMany()

		const filterDataByApi = apiCoffee.filter(
			({ img: item1 }) =>
				!dbCoffee.some(({ img: item2 }: Coffee) => item2 === item1)
		)
		await prisma.coffee.createMany({
			data: filterDataByApi,
		})
		const promises = apiCoffee.map(async ({ img, price }) => {
			const records = await prisma.coffee.update({
				where: {
					img: img,
				},
				data: {
					price: price,
				},
			})
			return records
		})
		await Promise.all(promises)
		res.status(200).json({ message: 'create succses!', dbCoffee })
	} catch (error: any) {
		console.log(error)
	}
}
