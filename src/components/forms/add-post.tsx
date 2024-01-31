'use client';

import { z } from 'zod';

import { createPost } from '@/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '../ui/use-toast';

export const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  content: z
    .string()
    .min(10, {
      message: 'Content must be at least 10 characters.',
    })
    .max(160, {
      message: 'Content must not be longer than 30 characters.',
    }),
  published: z.boolean().default(false).optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

export interface AddPostProps {}

export function AddPost() {
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      published: true,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: FormSchema) {
    await createPost(values)
      .then((res) => {
        toast({
          variant: 'default',
          title: `✅ ${res.title} created!`,
          description: `📅 Created @:${res.createdAt?.toLocaleDateString()}`,
        });
      })
      .finally(() => {
        form.reset();
      });
  }

  return (
    <Card className="w-[420px] max-w-full">
      <CardHeader>
        <CardTitle>Add your post</CardTitle>
        <CardDescription>Add an example post</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={() => {}} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Lorem Ipsum" {...field} />
                  </FormControl>
                  <FormDescription>This is your post title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about your post"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Here&apos;s where you can describe your post in more detail.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Publish</FormLabel>
                    <FormDescription>
                      Do you want to publish this post to the public?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
