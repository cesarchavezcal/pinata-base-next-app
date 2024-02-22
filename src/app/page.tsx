import { getInternalBlogPosts } from '@/actions';
import { AddPost } from '@/components/forms/add-post';
import { Navbar } from '@/components/globals/navbar/navbar';
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
import React from 'react';

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

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between container">
        <section className="grid grid-cols-6 gap-4 pt-4">
          <section className="col-span-2">
            <AddPost />
          </section>
          <section className="col-span-4">
            {/* <Suspense fallback={}>
            </Suspense> */}
            <InternalBlogPosts />
          </section>
        </section>
      </main>
    </>
  );
}
