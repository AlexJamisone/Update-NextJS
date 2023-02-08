import { prisma } from './prismadb'
import { baseCall } from '../utils/baseCall'
export const updatePrice = async () => {
	try {
		const getCoffee = await prisma.coffee.findMany()
		const update = getCoffee.map(async ({ qid, price }) => {
			try {
				const minimalPrice = parseInt(price)
				if (qid !== 0) {
					const response = await baseCall(
						'/api/update?moduleName=warehouse.nomenclature.dish',
						'POST',
						{
							id: qid,
							minimalPrice,
						}
					)
					return response
				}
			} catch (error) {
				console.log(error)
			}
		})
		return await Promise.all(update)
	} catch (error) {
		console.log(error)
	}
}
