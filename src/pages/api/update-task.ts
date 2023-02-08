import { NextApiRequest, NextApiResponse } from "next"
import { updatePrice } from "../../lib/updatePrice"
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await updatePrice()
        res.status(200).json({message: 'price is update ✔', response})
    } catch (error) {
        console.log(error)
        res.json({message: "task faild"})
    }
}