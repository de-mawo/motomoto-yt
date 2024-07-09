'use client'

import { useBookingStore } from "@/lib/store";
import Link from "next/link";
import { TbBasket } from "react-icons/tb";

export default function BasketItem() {
  const { bookings } = useBookingStore();
  return (
    <Link
      href="/pay"
      className="relative rounded-full bg-orange-100 p-2 text-orange-500"
    >
      <TbBasket size={24} />{" "}
      <span className="absolute right-[1px] top-1 h-4 w-4 rounded-full bg-orange-500 text-center text-xs font-bold text-white">
        {bookings.length}
      </span>
    </Link>
  );
}
