"use client";

import dayjs from "dayjs";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import EditRole from "./EditRole";

export const userColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const { image } = row.original;
      return (
        <Avatar>
          <AvatarImage src={image as string} alt="avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      );
    },
  },
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  { accessorKey: "role", header: "Role" },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div>{dayjs(row.original.createdAt).format("DD-MM-YYYY : HH:mm:ss")}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => (
      <div>{dayjs(row.original.updatedAt).format("DD-MM-YYYY : HH:mm:ss")}</div>
    ),
  },
  {
    accessorKey: "id",
    header: "Edit Role",
    cell: ({ row }) => <EditRole id={row.original.id} role={row.original.role} />,
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const { role, id, name } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {role === "INSTRUCTOR" && (
              <DropdownMenuItem>
                <Link href={`/dashboard/users/${id}?name=${name}`}>
                  Add Instructor&apos;s Profile
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Suspend User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
