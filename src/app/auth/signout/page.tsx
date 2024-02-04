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

export default function SignOut() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign Out Service</CardTitle>
        <CardDescription>Sign Out from your personal account</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant={'destructive'} onClick={() => signOut({ callbackUrl: '/' })}>
          Sign Out
        </Button>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
