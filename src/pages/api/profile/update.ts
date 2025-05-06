import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      walletAddress,
      email,
      username,
      name,
      bio,
      profileImage,
      bannerImage,
      website,
      twitter,
      linkedin,
      discord,
      jobTitle,
      skills,
      jobDescription,
      jobBannerImage,
      portfolio
    } = req.body;

    const user = await prisma.user.upsert({
      where: {
        walletAddress: walletAddress,
      },
      update: {
        email,
        username,
        name,
        bio,
        profileImage,
        bannerImage,
        website,
        twitter,
        linkedin,
        discord,
      },
      create: {
        walletAddress,
        email,
        username,
        name,
        bio,
        profileImage,
        bannerImage,
        website,
        twitter,
        linkedin,
        discord,
      },
    });

    if (jobTitle || skills || jobDescription) {
      await prisma.jobProfile.upsert({
        where: {
          userId: user.id,
        },
        update: {
          title: jobTitle,
          skills: Array.isArray(skills) ? skills : [skills],
          description: jobDescription,
          bannerImage: jobBannerImage,
          portfolio,
        },
        create: {
          userId: user.id,
          title: jobTitle,
          skills: Array.isArray(skills) ? skills : [skills],
          description: jobDescription,
          bannerImage: jobBannerImage,
          portfolio,
        },
      });
    }

    return res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Error updating profile', error });
  }
}