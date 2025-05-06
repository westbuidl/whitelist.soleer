// pages/api/profile/check-email.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        isEmailVerified: true,
      },
      select: {
        walletAddress: true,
        isEmailVerified: true,
      },
    });

    if (!user) {
      return res.status(200).json({
        isVerified: false,
        wallet: null,
      });
    }

    return res.status(200).json({
      isVerified: user.isEmailVerified,
      wallet: user.walletAddress,
    });
  } catch (error) {
    console.error('Error checking email:', error);
    return res.status(500).json({ message: 'Error checking email verification status' });
  }
}