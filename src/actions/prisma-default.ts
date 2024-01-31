import { prisma } from '@/lib/prisma';
import { Post } from '@prisma/client';

/**
 * Retrieves all blog posts from the database.
 * @returns A promise that resolves to an array of Post objects.
 */
export const getInternalBlogPosts = async (): Promise<Post[]> => {
  return await prisma.post.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
};
