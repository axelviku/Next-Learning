import { PrismaClient } from "@prisma/client";
import { NextApiResponse, NextApiRequest } from "next";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
        const { id } = req.query;
        const { name } = req.body;
        const userData = await prisma.user.findUnique({ where: { id: new ObjectId(id) } });
        if (userData) {
            const updateUser = await prisma.user.update({
                where: { id: new ObjectId(id) },
                data: {
                    name: name
                },
            });
            return res.send({ status: true, message: "User updated Succesfully", data: updateUser })
        } else {
            return res.send({ status: false, message: "User Not Found!!" });
        }
    }else {
        return res.send({ status: false, message: "This method not allowed!!" });
    }
    } catch (error) {
        console.log(error);
        
        return res.send({ status: true, message: error })
    }
}