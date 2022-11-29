import { prisma } from "../../../lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const coffeeId = req.query.id

    if(req.method === 'DELETE') {
        const coffee = await prisma.coffee.delete({
            where: {
                id: String(coffeeId)
            }
        })
        res.json(coffee)
    } else {
        console.log('Problem with Delete');
    }
}