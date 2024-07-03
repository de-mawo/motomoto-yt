import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { LuLogOut } from "react-icons/lu";




export function AvatarNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className=" h-8 w-8 rounded-full">
          <Avatar className="">
            <AvatarImage src='/logo.png' alt="demawo" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">De mawo</p>
            <p className="text-xs leading-none text-muted-foreground">
              demawo@motomoto.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2">
          <HiOutlineUser size={18} />
          <Link href="/user">Profile </Link>
        </DropdownMenuItem>
       
          <DropdownMenuItem className="flex gap-2">
            <HiOutlineLockClosed size={18} />
            <Link href="/dashboard">Admin </Link>
          </DropdownMenuItem>
      

        <DropdownMenuItem className="flex gap-2">
          <LuLogOut size={18} />
          {/* <LogOutButton /> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
