import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { walletAddress } = req.query;
      
      const user = await prisma.user.findUnique({
        where: { walletAddress: walletAddress as string },
        include: { jobProfile: true },
      });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching profile' });
    }
  } else if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const { walletAddress, ...data } = req.body;
      
      const user = await prisma.user.upsert({
        where: { walletAddress },
        update: data,
        create: {
          walletAddress,
          ...data,
        },
      });
      
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating profile' });
    }
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}