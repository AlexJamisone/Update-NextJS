import base64 from 'base-64'
import { NextApiRequest, NextApiResponse } from 'next'

//Think about types for API Data

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const api_url =
			'https://tp791.quickresto.ru/platform/online/api/tree?moduleName=warehouse.nomenclature.dish'
		const response = await fetch(api_url, {
			headers: new Headers({
				Authorization: `Basic ${base64.encode(
					`${process.env.LOGI_TP_791}:${process.env.PASSWOR_791}`
				)}`,
				'Content-Type': 'application/json',
			}),
		})
		const data = await response.json()
		const filterObj = data.filter(
			(item: any) => item?.parentId === 836
		)
		const filterData = filterObj.filter((item: any) => {
			const name = item.name
			const id = item.id
            console.log(name, id);
			return {
				name,
				id,
			}
		})
		// console.log(filterData)
		res.status(200).json(filterData)
	} catch (error) {
		console.log(error)
	}
}

export default handler
