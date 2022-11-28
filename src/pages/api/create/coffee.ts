import { Coffee } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prismadb'
import { getTasty } from '../../../lib/wrapApi'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const apiCoffee = await getTasty()
		const dbCoffee = await prisma.coffee.findMany()

		const filterDataByApi = apiCoffee.filter(
			({ img: item1 }) =>
				!dbCoffee.some(({ img: item2 }: Coffee) => item2 === item1)
		)

		if (filterDataByApi) {
			await prisma.coffee.createMany({
				data: filterDataByApi,
			})
		} else {
			return
		}
		res.status(200).json({ message: 'create succses!', dbCoffee })
	} catch (error: any) {
		throw new Error('from /api/create/coffee', error)
	}
}
