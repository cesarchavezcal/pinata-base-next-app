'use server';

import { FormSchema } from '@/components/forms/add-post';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getProfile } from '..';

export async function createPost(formData: FormSchema): Promise<any> {
  const user = await getProfile();
  if (user) {
    return await prisma.post
      .create({
        data: {
          title: formData.title,
          content: formData.content,
          published: formData.published,
          userId: user.id,
        },
      })
      .catch((error) => {
        console.error(error);
      })
      .then((createdPost) => {
        revalidatePath('/');
        return createdPost;
      });
  }
}
