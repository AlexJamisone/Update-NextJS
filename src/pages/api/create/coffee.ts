import { Coffee } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prismadb'
import { getTasty } from '../../../lib/wrapApi'
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
		const apiCoffee = await getTasty()
		const dbCoffee = await prisma.coffee.findMany()

		const filterDataByApi = apiCoffee.filter(
			({ img: item1 }) =>
				!dbCoffee.some(({ img: item2 }: Coffee) => item2 === item1)
		)
		const filterDataByDbPrice = dbCoffee.filter(
			({ price: item1 }) =>
				!apiCoffee.some(({ price: item2 }) => item2 === item1)
		)
		const filterDataByApiPrice = apiCoffee.filter(
			(coffee1) =>
				!dbCoffee.some(
					(coffee2) =>
						coffee2.price === coffee1.price &&
						coffee2.name === coffee1.name
				)
		)
		//Problem with updateMany by id
		// const arrayCoffeePrice = filterDataByApiPrice.map(coffee => coffee.price)
		// const arrayCoffeeDbId = filterDataByDbPrice.map(coffee => coffee.id)

		await prisma.coffee.createMany({
			data: filterDataByApi,
		})
		if ((filterDataByApiPrice || filterDataByDbPrice) !== undefined) {
			await prisma.coffee.updateMany({
				where: {
					id: filterDataByDbPrice[0]?.id,
				},
				data: {
					price: filterDataByApiPrice[0]?.price,
				},
			})
		}
		res.status(200).json({ message: 'create succses!', dbCoffee })
	} catch (error: any) {
		console.log(error)
	}
}
