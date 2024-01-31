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
import { signOut } from 'next-auth/react';

export default function SignIn() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Logout Service</CardTitle>
        <CardDescription>Logout from your personal account</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant={'destructive'} onClick={() => signOut({ callbackUrl: '/' })}>
          Logout
        </Button>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
