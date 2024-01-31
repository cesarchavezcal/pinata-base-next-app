import { getInternalBlogPosts } from '@/actions';
import { AddPost } from '@/components/forms/add-post';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { auth } from '@/lib/auth/auth';
import React, { Suspense } from 'react';

async function InternalBlogPosts(): Promise<React.ReactElement> {
  const posts = await getInternalBlogPosts();

  return (
    <Table>
      <TableCaption>A list of your recent posts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Content</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Published</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium">{post.title}</TableCell>
            <TableCell className="font-medium">{post.content}</TableCell>
            <TableCell>{post.createdAt?.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">{post.published ? '✅' : '🚫'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{posts.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

async function User(): Promise<React.ReactElement> {
  const session = await auth();

  return (
    <div>
      <h1>{session?.user.name}</h1>
    </div>
  );
}

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between container">
      <Suspense fallback={<p>Loading...</p>}>
        <User />
      </Suspense>
      <section className="grid grid-cols-6 gap-4">
        <section className="col-span-2">
          <AddPost />
        </section>
        <section className="col-span-4">
          <Suspense
            fallback={
              <p className="fixed top-0 left-0 z-10 bg-red-500 w-full h-full">Loading...</p>
            }
          >
            <InternalBlogPosts />
          </Suspense>
        </section>
      </section>
    </main>
  );
}
