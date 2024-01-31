'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login Service</CardTitle>
        <CardDescription>Use your Google account</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => signIn('google', { callbackUrl: '/' })}>Sign In With Google</Button>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
