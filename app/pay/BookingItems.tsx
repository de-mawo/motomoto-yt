"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBookingStore } from "@/lib/store";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GoTrash } from "react-icons/go";
import { HiMiniChevronDoubleLeft } from "react-icons/hi2";

const BookingItems = () => {
  const { bookings, deleteBooking } = useBookingStore();
  const router = useRouter();

  useEffect(() => {
    useBookingStore.persist.rehydrate();
  }, []);

  const totalCost = bookings.reduce(
    (total, booking) => total + booking.cost * booking.times.length,
    0,
  );

  return (
    <div className="booking-items">
      <header className="mb-6">
        <Button variant="secondary" onClick={() => router.back()}>
          <HiMiniChevronDoubleLeft size={20} /> Back
        </Button>
      </header>
      <section className="booking-items-table">
        <Table className="w-full border-collapse ">
          <TableHeader>
            <TableRow className=" text-xs ">
              <TableHead className="p-2 text-center font-bold">Date</TableHead>
              <TableHead className="p-2 text-center font-bold">
                Lesson
              </TableHead>
              <TableHead className="p-2 text-center font-bold">
                Cost per Slot
              </TableHead>
              <TableHead className="p-2 text-center font-bold">Slots</TableHead>
              <TableHead className="p-2 text-center font-bold">
                Delete
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking, i) => (
              <TableRow key={i} className="text-center text-xs">
                <TableCell className=" p-2">
                  {format(booking.date, "yyyy-MM-dd")}
                </TableCell>
                <TableCell className=" p-2">{booking.type}</TableCell>
                <TableCell className=" p-2">{booking.cost}</TableCell>
                <TableCell className=" p-2">{booking.times.length}</TableCell>
                <TableCell className=" p-2">
                  <Button
                    variant="ghost"
                    onClick={() => deleteBooking(booking.date)}
                  >
                    <GoTrash size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <Separator className="my-3" />
      <div className="flex items-center justify-around px-6 font-bold">
        <h3>Total</h3>
        <h3>${totalCost}</h3>
      </div>
    </div>
  );
};

export default BookingItems;
