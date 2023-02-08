import base64 from 'base-64'

export const baseCall = async (
	url: string,
	method: 'GET' | 'POST',
	...body: any | null
) => {
	try {
		const api_url = `https://tp791.quickresto.ru/platform/online${url}`
		const response = await fetch(api_url, {
			headers: new Headers({
				Authorization: `Basic ${base64.encode(
					`${process.env.LOGI_TP_791}:${process.env.PASSWOR_791}`
				)}`,
				'Content-Type': 'application/json',
			}),
			method,
			body: body ? JSON.stringify(body[0]) : null,
		})
		return await response.json()
	} catch (error) {
		console.log(error)
	}
}
