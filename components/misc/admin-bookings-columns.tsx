"use client";

import dayjs from "dayjs";
import { Booking } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { RxCross2 } from "react-icons/rx";
import { MdCheck } from "react-icons/md";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import DialogWrapper from "../common/DialogWrapper";

// Ensure Booking type includes Instructor
type BookingWithInstructor = Booking & {
  instructor: { name: string; phone: string | null };
} & {
  user: {
    name: string | null;
    email: string;
  };
};

export const adminBookingsColumns: ColumnDef<BookingWithInstructor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
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
    accessorKey: "type",
    header: "Lesson Type",
    cell: ({ row }) => {
      const { type } = row.original;
      return <Badge>{type}</Badge>;
    },
  },
  {
    accessorKey: "name",
    header: "User",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const { date } = row.original;
      const displayDate = dayjs(date).format("DD.MM.YYYY");
      return <div>{displayDate}</div>;
    },
  },
  {
    accessorKey: "bookingNumber",
    header: "Booking Number",
  },
  {
    accessorKey: "completed",
    header: "Completion Status",
    cell: ({ row }) => {
      const { status } = row.original;

      return <Badge>{status}</Badge>;
    },
  },
  {
    accessorKey: "paid",
    header: "Payment Status",
    cell: ({ row }) => {
      const { paid } = row.original;

      return <div>{paid ? <MdCheck /> : <RxCross2 />}</div>;
    },
  },
  {
    accessorKey: "cost",
    header: "Cost",
  },
  {
    header: "Admin Fee",
    cell: ({ row }) => {
      const { cost } = row.original;
      const adminFee = (cost * 0.23).toFixed(2);

      return <div>{adminFee}</div>;
    },
  },
  {
    header: "Instructor Earnings",
    cell: ({ row }) => {
      const { cost } = row.original;
      const adminFee = (cost * 0.23).toFixed(2);
      const earnings = cost - parseFloat(adminFee);

      return <div>{earnings}</div>;
    },
  },
  {
    accessorKey: "paymentToken",
    header: "Payment Token",
  },

  {
    header: "More...",
    cell: ({ row }) => {
      const { times, createdAt, updatedAt, paid, instructor } = row.original;

      return (
        <DialogWrapper
          isBtn
          btnTitle="More..."
          title="View more"
          descr="Time slots selected"
        >
          <div className="mt-2">
            {times.map((time, index) => (
              <Badge key={index} variant="outline">
                {format(time, "HH:mm")}hrs
              </Badge>
            ))}
          </div>
          <div className="grid gap-3">
            <p> Instructor: {instructor.name}</p>
            <p>CreatedAt: {dayjs(createdAt).format("DD-MM-YYYY : HH:mm:ss")}</p>
            <p>CreatedAt: {dayjs(updatedAt).format("DD-MM-YYYY : HH:mm:ss")}</p>
          </div>
        </DialogWrapper>
      );
    },
  },
];
