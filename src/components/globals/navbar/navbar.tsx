'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { SessionProvider, useSession } from 'next-auth/react';
import { SignOutItem } from './logout-item';

export interface NavbarProps {}

function UserMenu() {
  const { data: session, status } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex gap-2 border rounded-full items-center pl-2 pr-3 py-1">
          <Avatar className="border">
            <AvatarImage src={session?.user.image as string} />
            <AvatarFallback>{session?.user.name?.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <section className="grid gap-y-1">
            <p className="text-sm w-fit text-right">{session?.user.name}</p>
            <Badge variant="secondary">{status}</Badge>
          </section>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>GitHub</DropdownMenuItem>
        <DropdownMenuItem disabled>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <SignOutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  return (
    <nav className="w-full p-4 flex justify-between bg-background border sticky top-0 z-10 items-center">
      <span className="text-xl font-semibold text tracking-wider">
        <i className="text-2xl mr-2">🪅</i> Piñata
      </span>
      <SessionProvider>
        <UserMenu />
      </SessionProvider>
    </nav>
  );
}
