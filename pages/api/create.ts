import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { name, email } = req.body;
            
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (user) {
                return res.send({ message: "This user is already registered" });
            } else {
                const newUser = await prisma.user.create({
                    data: {
                        name: name,
                        email: email,
                    },
                });
                return res.json({ message: "This user is successfully registered.", user: newUser });
            }
        } else {
            res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error });
    }
}