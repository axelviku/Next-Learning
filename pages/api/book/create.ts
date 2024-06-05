import { PrismaClient } from "@prisma/client"; 
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req :NextApiRequest , res:NextApiResponse ) {
    try {
        if (req.method === 'POST') {
            const { bookName, autherOfBook, userId } = req.body;
                const newUser = await prisma.book.create({
                    data: {
                        bookName: bookName,
                        autherOfBook: autherOfBook,
                        userId : userId
                    },
                });
                return res.json({ message: "This book is successfully registered.", user: newUser });
        
        } else {
            res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error });
    }
}