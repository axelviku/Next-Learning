import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email,posts } = req.body;
        const user = await prisma.user.create({
            data: {
                name,
                email,
               
              },
          
        });
       return res.status(201).json(user);
    }
}