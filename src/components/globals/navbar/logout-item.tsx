'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';

export function SignOutItem() {
  return <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>;
}
