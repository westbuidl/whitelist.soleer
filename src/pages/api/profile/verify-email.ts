import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

// Define a type for the expected request body
interface VerificationRequest {
  walletAddress: string;
  email: string;
  username: string;
}

// Define custom error types
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { walletAddress, email, username } = req.body as VerificationRequest;

    if (!walletAddress || !email || !username) {
      throw new ValidationError('Missing required fields: walletAddress, email, and username are required');
    }

    // First, check for existing user with this email
    const existingUserWithEmail = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUserWithEmail && existingUserWithEmail.walletAddress !== walletAddress) {
      throw new ValidationError('This email is already associated with another wallet address');
    }

    // Check for existing user with this wallet address
    const existingUserWithWallet = await prisma.user.findUnique({
      where: { walletAddress }
    });

    let user;
    if (existingUserWithWallet) {
      // If the user exists with this wallet, update their details
      user = await prisma.user.update({
        where: { walletAddress },
        data: {
          email: existingUserWithEmail?.walletAddress === walletAddress ? email : undefined,
          emailVerified: true,
          username: `${username}_${Date.now()}`, // Ensure unique username
          updatedAt: new Date()
        }
      });
    } else {
      // Create new user if the wallet doesn't exist
      try {
        user = await prisma.user.create({
          data: {
            walletAddress,
            email,
            emailVerified: true,
            username: `${username}_${Date.now()}`, // Ensure unique username
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
      } catch (unknownError: unknown) {
        const error = unknownError as PrismaClientKnownRequestError;
        if (error.code === 'P2002') {
          throw new ValidationError('This email or username is already taken');
        }
        throw error;
      }
    }

    return res.status(200).json(user);
  } catch (unknownError: unknown) {
    console.error('Verification error:', unknownError);
    
    if (unknownError instanceof ValidationError) {
      return res.status(400).json({ message: unknownError.message });
    }
    
    if (unknownError instanceof PrismaClientKnownRequestError) {
      return res.status(400).json({ 
        message: 'Database error occurred',
        code: unknownError.code
      });
    }
    
    const error = unknownError instanceof Error ? unknownError : new Error('An unexpected error occurred');
    
    return res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}