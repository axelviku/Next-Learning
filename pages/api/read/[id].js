
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const  {id}  = req.query;
    console.log("VIkrant",id);
    try {
      const user = await prisma.user.findUnique({
        where: { id},
      });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Fetching user failed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}