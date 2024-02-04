import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth } from '@/lib/auth/auth';
import { Suspense } from 'react';
import { SignOutItem } from './logout-item';

export interface NavbarProps {}

async function UserMenu() {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex gap-4 border rounded-full items-center pl-4 pr-1 py-1">
          <section className="grid justify-items-end">
            <p className="text-sm w-fit text-right">{session?.user.name}</p>
            <p className="text-xs w-fit text-right">{session?.user.email}</p>
          </section>
          <Avatar className="border">
            <AvatarImage src={session?.user.image as string} />
            <AvatarFallback>{session?.user.name?.substring(0, 2)}</AvatarFallback>
          </Avatar>
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

export async function Navbar() {
  return (
    <nav className="w-full p-4 flex justify-between bg-background border sticky top-0 z-10 items-center">
      <span className="text-xl font-semibold text tracking-wider">
        <i className="text-2xl mr-2">🪅</i> Piñata
      </span>
      <Suspense fallback={<p>Loading...</p>}>
        <UserMenu />
      </Suspense>
    </nav>
  );
}
