import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {name, qid, description, price, img} = req.body
        if(req.method === 'POST') {
            const coffee = await prisma.coffee.create({
                data: {
                    img,
                    name,
                    price,
                    description,
                    qid
                }
            })
            res.json(coffee)
        } else {
            console.log('Some Problem with create Coffee')
        }
    } catch (error) {
        console.log('Some Error with Create Coffee', error)
    }
}