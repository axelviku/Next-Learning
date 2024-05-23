import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, posts } = req.body;

        const user = await prisma.user.findUnique({
            where:{ email}
        });

        if (user) {
            return res.send({ Message: "This user is already register" })
        } else {
            const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                },

            });
            return res.json({message:"This user is succesfully register.",user});
        }


    }
}
